import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FiUploadCloud, FiFileText, FiCheckCircle } from "react-icons/fi";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const navigate = useNavigate();

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      handleFile(droppedFile);
    }
  }, []);

  const handleFile = (selected) => {
    setError("");
    if (!selected) return;
    if (selected.type !== "application/pdf") {
      setError("Please upload a PDF resume.");
      setFile(null);
      return;
    }
    if (selected.size > 5 * 1024 * 1024) {
      setError("Maximum file size is 5MB.");
      setFile(null);
      return;
    }
    setFile(selected);
  };

  const onBrowse = (e) => {
    const selected = e.target.files?.[0];
    handleFile(selected);
  };

  const startFakeProgress = () => {
    setProgress(10);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) {
          clearInterval(interval);
          return p;
        }
        return p + 10;
      });
    }, 300);
    return interval;
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF resume first.");
      return;
    }
    if (!jobDescription.trim()) {
      setError("Please paste the job description.");
      return;
    }
    setUploading(true);
    setError("");
    setProgress(0);
    const interval = startFakeProgress();

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("jobDescription", jobDescription);

      const response = await fetch(`${API_URL}/upload-resume`, {
        method: "POST",
        body: formData
      });

      clearInterval(interval);
      setProgress(100);

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Upload failed, please try again.");
      }

      const analysis = await response.json();
      navigate("/dashboard", { state: { analysis } });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="page-section grid gap-10 lg:grid-cols-[3fr,2fr] lg:items-start section-fade">
      <section className="glass-card p-6 sm:p-8 card-fade">
        <h1 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
          Upload your resume
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Drag and drop your PDF resume or browse from your device. We&apos;ll
          analyze it with AI and give you a score, ATS insights, and
          improvement tips.
        </p>

        <div
          className={`mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-slate-950/70 px-4 py-10 text-center transition ${
            isDragging
              ? "border-sky-400 bg-gradient-to-br from-sky-500/15 via-slate-900/80 to-indigo-500/15"
              : "border-slate-700/80 bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-slate-950/90 hover:border-slate-500"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragging(false);
          }}
          onDrop={onDrop}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-400">
            <FiUploadCloud className="h-6 w-6" />
          </div>
          <p className="mt-3 text-sm font-medium text-slate-100">
            Drag &amp; drop your resume
          </p>
          <p className="mt-1 text-xs text-slate-400">
            or{" "}
            <label className="cursor-pointer text-sky-400 underline-offset-2 hover:underline">
              browse files
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={onBrowse}
              />
            </label>
          </p>
          <p className="mt-2 text-[11px] text-slate-500">
            PDF format only · Max size 5MB
          </p>

          {file && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-800/80 px-3 py-1 text-xs text-slate-200">
              <FiFileText className="h-3.5 w-3.5 text-sky-400" />
              <span className="truncate max-w-[10rem] sm:max-w-xs">
                {file.name}
              </span>
              <span className="text-slate-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>
          )}
        </div>

        {progress > 0 && (
          <div className="mt-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>
                {uploading ? "Analyzing your resume..." : "Upload progress"}
              </span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 transition-[width]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {error && (
          <p className="mt-4 text-xs text-red-400">
            {error}
          </p>
        )}

        <div className="mt-8 text-left">
          <label className="block text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            Job Description
          </label>
          <p className="mt-1 text-[11px] text-slate-500">
            Paste the job description so we can score how well your resume matches this specific role.
          </p>
          <textarea
            className="mt-3 h-32 w-full resize-y rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 outline-none ring-0 transition focus:border-sky-500 focus:bg-slate-900/80"
            placeholder="Paste the job title, responsibilities, and required skills here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="btn-primary mt-6"
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? "Analyzing..." : "Analyze resume"}
        </button>
      </section>

      <aside className="glass-card space-y-4 p-6 sm:p-7 card-fade-delayed">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          <FiCheckCircle className="h-4 w-4 text-emerald-400" />
          What you&apos;ll get
        </div>
        <ul className="space-y-3 text-sm text-slate-200">
          <li className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
            <span>
              <strong className="font-semibold text-slate-100">
                Resume score (0-100)
              </strong>{" "}
              that captures clarity, impact, and overall quality.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
            <span>
              <strong className="font-semibold text-slate-100">
                ATS compatibility score
              </strong>{" "}
              based on structure, keyword usage, and formatting.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
            <span>
              <strong className="font-semibold text-slate-100">
                Skills detected &amp; missing skills
              </strong>{" "}
              mapped to typical job descriptions.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
            <span>
              <strong className="font-semibold text-slate-100">
                Actionable suggestions
              </strong>{" "}
              to strengthen positioning and storytelling.
            </span>
          </li>
        </ul>
        <p className="pt-2 text-[11px] text-slate-500">
          Your resume content is processed securely for analysis and stored only
          to help you track improvements over time.
        </p>
      </aside>
    </div>
  );
};

export default UploadPage;

