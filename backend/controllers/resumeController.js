import pdfParse from "pdf-parse";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const KNOWN_SKILLS = [
  "react",
  "react.js",
  "node",
  "node.js",
  "javascript",
  "typescript",
  "python",
  "java",
  "c++",
  "c#",
  "sql",
  "mongodb",
  "postgresql",
  "mysql",
  "docker",
  "kubernetes",
  "aws",
  "gcp",
  "azure",
  "rest",
  "graphql",
  "html",
  "css",
  "tailwind",
  "express"
];

const SECTION_KEYWORDS = ["summary", "experience", "education", "skills", "projects"];

const buildLocalAnalysis = (rawText) => {
  const text = rawText.toLowerCase();
  const wordCount = rawText.split(/\s+/).filter(Boolean).length;
  const hasMetrics = /\b\d+(\.\d+)?\s?(%|x|k|m)\b/.test(text);
  const hasBullets = /[\n\r]\s*[-•*]\s+/.test(rawText);
  const presentSections = SECTION_KEYWORDS.filter((key) => text.includes(key));
  const detectedSkills = KNOWN_SKILLS.filter((skill) => text.includes(skill));
  const uniqueSkills = [...new Set(detectedSkills)];

  let matchScore = 40;
  if (wordCount > 200) matchScore += 10;
  if (hasMetrics) matchScore += 15;
  if (hasBullets) matchScore += 10;
  if (presentSections.length >= 3) matchScore += 10;
  if (uniqueSkills.length >= 8) matchScore += 5;
  matchScore = Math.min(95, matchScore);

  const strengths = [];
  const suggestions = [];

  if (hasMetrics) {
    strengths.push("Uses numbers and metrics to show impact.");
  } else {
    suggestions.push("Add quantified achievements (e.g. % improvement, revenue, users, performance).");
  }

  if (hasBullets) {
    strengths.push("Uses bullet points for readability.");
  } else {
    suggestions.push("Refactor long paragraphs into concise bullet points per role.");
  }

  if (uniqueSkills.length < 5) {
    suggestions.push("Add more explicit technical skills relevant to your target roles.");
  }

  return {
    matchScore,
    matchedSkills: uniqueSkills,
    missingSkills: KNOWN_SKILLS.filter((s) => !uniqueSkills.includes(s)).slice(0, 8),
    suggestions,
    summary:
      strengths.length > 0
        ? strengths.join(" ")
        : "Solid starting point; add more detail, metrics, and clearer structure to strengthen this resume."
  };
};

const groqApiKey = process.env.GROQ_API_KEY?.trim() || "";
const groq =
  groqApiKey &&
  new OpenAI({
    apiKey: groqApiKey,
    baseURL: "https://api.groq.com/openai/v1"
  });

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const jobDescription = (req.body?.jobDescription || "").toString();

    if (!jobDescription.trim()) {
      return res.status(400).json({ error: "Job description is required" });
    }

    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = (pdfData.text || "").slice(0, 15000);

    if (!resumeText.trim()) {
      return res.status(400).json({ error: "Could not extract text from resume" });
    }

    let analysis;

    if (groq) {
      try {
        const completion = await groq.chat.completions.create({
          model: "llama-3.3-70b-versatile",
          temperature: 0.3,
          messages: [
            {
              role: "system",
              content:
                "You are a resume screening assistant. You ONLY respond with valid minified JSON and nothing else."
            },
            {
              role: "user",
              content: `Analyze the following resume according to the given job description.
Provide a JSON object with the following shape (no markdown, no explanation, no extra fields):
{
  "matchScore": number,
  "matchedSkills": string[],
  "missingSkills": string[],
  "suggestions": string[],
  "summary": string
}

Job Description:
${jobDescription}

Resume Content:
${resumeText}`
            }
          ]
        });

        const content = completion.choices?.[0]?.message?.content?.trim() || "{}";
        const raw = JSON.parse(content);
        let rawScore = Number(raw.matchScore);
if (!Number.isFinite(rawScore)) rawScore = 0;
// If model returns 0–1, convert to 0–100
if (rawScore > 0 && rawScore <= 1) rawScore = rawScore * 100;

analysis = {
  matchScore: Math.max(0, Math.min(100, rawScore)),
  matchedSkills: Array.isArray(raw.matchedSkills) ? raw.matchedSkills : [],
  missingSkills: Array.isArray(raw.missingSkills) ? raw.missingSkills : [],
  suggestions: Array.isArray(raw.suggestions) ? raw.suggestions : [],
  summary: typeof raw.summary === "string" ? raw.summary : ""
};
      } catch (aiError) {
        console.warn("Groq analysis failed, falling back to local analysis:", aiError.message);
        analysis = buildLocalAnalysis(resumeText);
      }
    } else {
      analysis = buildLocalAnalysis(resumeText);
    }

    return res.json({
      // New, JD-based fields
      matchScore: analysis.matchScore,
      matchedSkills: analysis.matchedSkills,
      missingSkills: analysis.missingSkills,
      suggestions: analysis.suggestions,
      summary: analysis.summary,
      // Legacy fields to keep existing dashboard working
      resumeScore: analysis.matchScore,
      atsScore: analysis.matchScore,
      skills: analysis.matchedSkills,
      strengths: [],
      weaknesses: []
    });
  } catch (error) {
    console.error("Resume error:", error);
    return res.status(500).json({ error: "Resume analysis failed" });
  }
};
