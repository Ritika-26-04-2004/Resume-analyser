import { FiTag } from "react-icons/fi";

const Pill = ({ children, tone = "default" }) => {
  const toneClasses =
    tone === "missing"
      ? "border-amber-500/60 bg-amber-500/10 text-amber-100"
      : tone === "present"
      ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-100"
      : "border-slate-700/70 bg-slate-900/70 text-slate-100";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium ${toneClasses}`}
    >
      <FiTag className="h-3 w-3" />
      {children}
    </span>
  );
};

const SkillsSection = ({ skills = [], missingSkills = [] }) => {
  return (
    <div className="glass-card grid gap-6 border-slate-700/80 bg-slate-950/70 p-4 md:grid-cols-2 card-fade">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-50">
            Skills detected
          </h3>
          <span className="text-[11px] text-slate-500">
            {skills.length} found
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {skills.length === 0 && (
            <p className="text-[11px] text-slate-500">
              We couldn&apos;t confidently detect explicit skills in this
              resume yet.
            </p>
          )}
          {skills.map((skill) => (
            <Pill key={skill} tone="present">
              {skill}
            </Pill>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-50">
            Missing skills
          </h3>
          <span className="text-[11px] text-slate-500">
            {missingSkills.length} suggested
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {missingSkills.length === 0 && (
            <p className="text-[11px] text-slate-500">
              No obvious gaps detected for a typical profile. Tailor to a
              specific role for deeper insights.
            </p>
          )}
          {missingSkills.map((skill) => (
            <Pill key={skill} tone="missing">
              {skill}
            </Pill>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;

