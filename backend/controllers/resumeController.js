import pdfParse from "pdf-parse";

// List of known skills to detect
const KNOWN_SKILLS = [
  "react","react.js","node","node.js","javascript","typescript","python",
  "java","c++","c#","sql","mongodb","postgresql","mysql","docker",
  "kubernetes","aws","gcp","azure","rest","graphql","html","css",
  "tailwind","express"
];

// Sections to look for in resume
const SECTION_KEYWORDS = ["summary","experience","education","skills","projects"];

// Local heuristic-based analysis
const buildLocalAnalysis = (rawText) => {
  const text = rawText.toLowerCase();
  const wordCount = rawText.split(/\s+/).filter(Boolean).length;
  const hasMetrics = /\b\d+(\.\d+)?\s?(%|x|k|m)\b/.test(text);
  const hasBullets = /[\n\r]\s*[-•*]\s+/.test(rawText);
  const presentSections = SECTION_KEYWORDS.filter(key => text.includes(key));
  const detectedSkills = KNOWN_SKILLS.filter(skill => text.includes(skill));
  const uniqueSkills = [...new Set(detectedSkills)];

  let resumeScore = 40;
  if (wordCount > 200) resumeScore += 10;
  if (hasMetrics) resumeScore += 15;
  if (hasBullets) resumeScore += 10;
  if (presentSections.length >= 3) resumeScore += 10;
  if (uniqueSkills.length >= 8) resumeScore += 5;
  resumeScore = Math.min(95, resumeScore);

  let atsScore = 40 + presentSections.length * 8;
  if (uniqueSkills.length > 5) atsScore += 10;

  const strengths = [];
  const weaknesses = [];
  const suggestions = [];

  if (hasMetrics) strengths.push("Uses numbers and metrics to show impact");
  else {
    weaknesses.push("No quantified achievements detected");
    suggestions.push("Add numbers like % improvement, revenue growth, etc.");
  }

  if (hasBullets) strengths.push("Uses bullet points for readability");
  else {
    weaknesses.push("Resume lacks bullet points");
    suggestions.push("Use bullet points instead of paragraphs");
  }

  if (uniqueSkills.length < 5) {
    weaknesses.push("Few technical skills detected");
    suggestions.push("Add more technical skills relevant to the role");
  }

  return {
    resumeScore,
    atsScore,
    strengths,
    weaknesses,
    skills: uniqueSkills,
    missingSkills: KNOWN_SKILLS.filter(s => !uniqueSkills.includes(s)).slice(0,6),
    suggestions
  };
};

// Upload endpoint using only local AI
export const uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = (pdfData.text || "").slice(0, 15000);

    if (!resumeText.trim()) return res.status(400).json({ error: "Could not extract text" });

    const analysis = buildLocalAnalysis(resumeText);
    return res.json({
      ...analysis,
      createdAt: new Date().toISOString(),
    });

  } catch (error) {
    console.error("Resume error:", error);
    return res.status(500).json({ error: "Resume analysis failed" });
  }
};
