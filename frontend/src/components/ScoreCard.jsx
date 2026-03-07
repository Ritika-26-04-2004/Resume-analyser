import { FiTrendingUp } from "react-icons/fi";

const ScoreCard = ({ label, value, tone }) => {
  const gradient =
    tone === "success"
      ? "from-emerald-400 via-sky-400 to-indigo-400"
      : "from-amber-400 via-orange-400 to-rose-400";

  return (
    <div className="glass-card flex flex-col gap-3 border-slate-700/80 bg-slate-950/70 p-4 card-fade">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>{label}</span>
        <FiTrendingUp className="h-4 w-4 text-slate-500" />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-slate-50">{value}</span>
        <span className="text-xs text-slate-500">/ 100</span>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
          style={{ width: `${Math.min(Number(value) || 0, 100)}%` }}
        />
      </div>
      <p className="text-[11px] text-slate-400">
        Higher scores correlate with stronger recruiter response rates and ATS
        visibility.
      </p>
    </div>
  );
};

export default ScoreCard;

