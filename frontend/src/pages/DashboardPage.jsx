import { useLocation, Link } from "react-router-dom";
import { FiInfo } from "react-icons/fi";
import ScoreCard from "../components/ScoreCard.jsx";
import SkillsSection from "../components/SkillsSection.jsx";
import SuggestionCard from "../components/SuggestionCard.jsx";
import StatsOverview from "../components/StatsOverview.jsx";

const DashboardPage = () => {
  const location = useLocation();
  const analysis = location.state?.analysis || null;

  const resumeScore = analysis?.resumeScore ?? 0;
  const atsScore = analysis?.atsScore ?? 0;
  const strengths = analysis?.strengths ?? [];
  const weaknesses = analysis?.weaknesses ?? [];
  const suggestions = analysis?.suggestions ?? [];
  const skills = analysis?.skills ?? [];
  const missingSkills = analysis?.missingSkills ?? [];

  const hasData = Boolean(analysis);

  return (
    <div className="page-section space-y-7 section-fade">
      <div className="glass-card relative overflow-hidden border-slate-700/80 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/90 px-5 py-5 sm:px-7 sm:py-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.32),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.32),transparent_55%)]" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-300/80">
              Overview
            </p>
            <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
              Resume analysis dashboard
            </h1>
            <p className="mt-1.5 max-w-xl text-xs text-slate-300 sm:text-sm">
              Visualize how your resume performs across impact, structure and
              ATS readiness, then act on targeted, AI-generated suggestions.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1 text-[11px] font-medium text-slate-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {hasData ? "Latest analysis loaded" : "Awaiting first analysis"}
            </span>
            <Link
              to="/upload"
              className="btn-primary text-xs sm:text-sm shadow-sky-500/40"
            >
              Analyze another resume
            </Link>
          </div>
        </div>
      </div>

      {!hasData && (
        <div className="glass-card flex items-center gap-3 border-dashed border-amber-500/50 bg-amber-500/5 p-4 text-sm text-amber-50 card-fade">
          <FiInfo className="h-5 w-5 shrink-0 text-amber-300" />
          <div>
            <p className="font-medium">
              No analysis loaded yet. Upload a resume to get started.
            </p>
            <p className="text-xs text-amber-100/80">
              Head over to the upload page, drop in a PDF, and we&apos;ll bring
              your personalized analytics back here.
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-3">
        <ScoreCard label="Resume score" value={resumeScore} tone="success" />
        <ScoreCard label="ATS compatibility" value={atsScore} tone="success" />
        <div className="glass-card border-slate-700/80 bg-slate-950/70 p-4 text-sm text-slate-200 card-fade-delayed">
          <p className="font-medium text-slate-100">Quick snapshot</p>
          <ul className="mt-2 space-y-1.5 text-[13px] text-slate-300">
            <li>
              <span className="text-slate-400">Strength signals: </span>
              <span className="font-medium text-emerald-300">
                {strengths.length || 0}
              </span>
            </li>
            <li>
              <span className="text-slate-400">Risk areas: </span>
              <span className="font-medium text-amber-300">
                {weaknesses.length || 0}
              </span>
            </li>
            <li>
              <span className="text-slate-400">Skills detected: </span>
              <span className="font-medium text-sky-300">
                {skills.length || 0}
              </span>
            </li>
          </ul>
          <p className="mt-2 text-[11px] text-slate-500">
            Use this dashboard before each application to make targeted updates
            instead of guessing.
          </p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <SkillsSection skills={skills} missingSkills={missingSkills} />
          <div className="grid gap-4 md:grid-cols-2">
            <SuggestionCard title="Strengths to lean into" items={strengths} />
            <SuggestionCard
              title="Weaknesses and blind spots"
              items={weaknesses}
            />
          </div>
        </div>
        <div className="space-y-5">
          <StatsOverview resumeScore={resumeScore} atsScore={atsScore} />
          <SuggestionCard
            title="Suggestions to improve"
            items={suggestions}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

