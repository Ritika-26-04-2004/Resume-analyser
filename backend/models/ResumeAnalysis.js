import mongoose from "mongoose";

const ResumeAnalysisSchema = new mongoose.Schema(
  {
    resumeText: {
      type: String,
      required: true
    },
    resumeScore: {
      type: Number,
      required: true
    },
    atsScore: {
      type: Number,
      required: true
    },
    strengths: [
      {
        type: String
      }
    ],
    weaknesses: [
      {
        type: String
      }
    ],
    skills: [
      {
        type: String
      }
    ],
    missingSkills: [
      {
        type: String
      }
    ],
    suggestions: [
      {
        type: String
      }
    ]
  },
  {
    timestamps: true
  }
);

const ResumeAnalysis = mongoose.model("ResumeAnalysis", ResumeAnalysisSchema);

export default ResumeAnalysis;

