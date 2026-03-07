import pdfParse from "pdf-parse";
import ResumeAnalysis from "../models/ResumeAnalysis.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Only create Gemini client if API key exists
let genAI = null;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

const KNOWN_SKILLS = [
  "react","react.js","node","node.js","javascript","typescript","python",
  "java","c++","c#","sql","mongodb","postgresql","mysql","docker",
  "kubernetes","aws","gcp","azure","rest","graphql","html","css",
  "tailwind","express"
];

const SECTION_KEYWORDS = ["summary","experience","education","skills","projects"];

const buildLocalAnalysis = (rawText) => {
  const text = rawText.toLowerCase();
  const wordCount = rawText.split(/\s+/).filter(Boolean).length;
  const hasMetrics = /\b\d+(\.\d+)?\s?(%|x|k|m)\b/.test(text);
  const hasBullets = /[\n\r]\s*[-•*]\s+/.test(rawText);
  const presentSections = SECTION_KEYWORDS.filter((key) => text.includes(key));
  const detectedSkills = KNOWN_SKILLS.filter((skill) => text.includes(skill));
  const uniqueSkills = [...new Set(detectedSkills)];

  let resumeScore = 40;
  if (wordCount > 200) resumeScore += 10;
  if (hasMetrics) resumeScore += 15;
  if (hasBullets) resumeScore += 10;
  if (presentSections.length >= 3) resumeScore += 10;
  if (uniqueSkills.length >= 8) resumeScore += 5;
  resumeScore = Math.min(95, resumeScore);

  let atsScore = 40 + presentSections.length * 8;
  atsScore += uniqueSkills.length > 5 ? 10 : 0;

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

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = (pdfData.text || "").slice(0, 15000);
    if (!resumeText.trim()) return res.status(400).json({ error: "Could not extract text" });

    // ---------- TRY GEMINI IF AVAILABLE ----------
    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-3.1-pro-preview" });
        const prompt = `
Analyze the resume and return JSON:

{
  resumeScore:number,
  atsScore:number,
  strengths:[],
  weaknesses:[],
  skills:[],
  missingSkills:[],
  suggestions:[]
}

Resume:
${resumeText}
`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        const analysis = JSON.parse(text);

        return res.json({ ...analysis, source: "gemini" });
      } catch (aiError) {
        console.log("Gemini failed → Using local AI fallback:", aiError.message);
      }
    } else {
      console.log("No GEMINI_API_KEY, using local AI fallback");
    }

    // ---------- FALLBACK LOCAL AI ----------
    const localAnalysis = buildLocalAnalysis(resumeText);
    return res.json({ ...localAnalysis, source: "local-ai" });

  } catch (error) {
    console.error("Resume error:", error);
    res.status(500).json({ error: "Resume analysis failed" });
  }
};
