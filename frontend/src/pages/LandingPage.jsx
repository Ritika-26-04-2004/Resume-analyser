import { Link } from "react-router-dom";
import { FaBolt, FaChartLine, FaShieldAlt } from "react-icons/fa";

const LandingPage = () => {
  return (
    <div className="page-section grid gap-10 lg:grid-cols-[3fr,2fr] lg:items-center section-fade">
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-[11px] font-medium text-sky-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Powered by AI & ATS insights
        </div>
        <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
          Analyze your resume and{" "}
          <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            improve your chances
          </span>{" "}
          of getting hired.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
          Upload your resume as a PDF and get instant, AI-powered feedback on
          your strengths, blind spots, missing skills, and ATS compatibility –
          in a dashboard that feels like a modern SaaS product.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link to="/upload" className="btn-primary">
            Upload resume
          </Link>
          <Link to="/dashboard" className="btn-outline">
            Preview dashboard
          </Link>
          <span className="text-[11px] text-slate-400">
            No sign-up required · PDF only
          </span>
        </div>
        <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 text-xs text-slate-300 sm:text-sm">
          <div>
            <dt className="font-semibold text-slate-100">0-100 score</dt>
            <dd className="mt-1 text-slate-400">
              Overall resume quality and ATS readiness at a glance.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-100">Skills mapping</dt>
            <dd className="mt-1 text-slate-400">
              Detect missing hard & soft skills for your target role.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-100">Actionable tips</dt>
            <dd className="mt-1 text-slate-400">
              Concrete suggestions to make your profile recruiter-friendly.
            </dd>
          </div>
        </dl>
      </section>

      <section className="glass-card relative overflow-hidden p-5 sm:p-6 lg:p-7 card-fade-delayed">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-500/15 via-transparent to-purple-500/15" />
        <div className="relative space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Snapshot
            </h2>
            <span className="pill">
              <FaShieldAlt className="h-3 w-3 text-emerald-400" />
              ATS-friendly
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="glass-card flex flex-col gap-3 border-slate-700/70 bg-slate-950/60 p-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Resume score</span>
                <span className="text-slate-300">87 / 100</span>
              </div>
              <div className="relative h-2 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[87%] rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400" />
              </div>
              <p className="text-[11px] text-slate-400">
                Strong impact and skills coverage. Add more measurable
                achievements for senior roles.
              </p>
            </div>

            <div className="glass-card flex flex-col gap-3 border-slate-700/70 bg-slate-950/60 p-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>ATS compatibility</span>
                <span className="text-slate-300">92%</span>
              </div>
              <div className="relative h-2 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400" />
              </div>
              <p className="text-[11px] text-slate-400">
                Clean structure, clear headings and strong keyword density for
                software roles.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-2 rounded-2xl border border-slate-800/80 bg-slate-950/60 p-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <FaBolt className="h-4 w-4 text-amber-400" />
                Strengths
              </div>
              <ul className="space-y-1 text-[11px] text-slate-400">
                <li>Impactful project bullets</li>
                <li>Clear tech stack summary</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2 rounded-2xl border border-slate-800/80 bg-slate-950/60 p-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <FaChartLine className="h-4 w-4 text-sky-400" />
                Missing skills
              </div>
              <ul className="space-y-1 text-[11px] text-slate-400">
                <li>System design keywords</li>
                <li>People leadership examples</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2 rounded-2xl border border-slate-800/80 bg-slate-950/60 p-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <FaShieldAlt className="h-4 w-4 text-emerald-400" />
                Suggestions
              </div>
              <ul className="space-y-1 text-[11px] text-slate-400">
                <li>Add metrics to 3–4 bullets</li>
                <li>Highlight cross-functional impact</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

