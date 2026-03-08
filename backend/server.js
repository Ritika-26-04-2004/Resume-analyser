import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import resumeRoutes from "./routes/resumeRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ai-resume-analyzer";

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://127.0.0.1:5173",
      "https://resume-analyser-1-jfv3.onrender.com"
    ]
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "AI Resume Analyzer API is running",
    mongoConnected: mongoose.connection.readyState === 1
  });
});

app.use("/api", resumeRoutes);

// Try to connect to MongoDB, but don't crash the server if it fails.
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(
      "MongoDB connection error (continuing without database persistence):",
      err.message
    );
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

