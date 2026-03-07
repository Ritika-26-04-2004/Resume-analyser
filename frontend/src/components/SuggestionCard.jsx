import { FiArrowRightCircle } from "react-icons/fi";

const SuggestionCard = ({ title, items = [] }) => {
  if (!items.length) return null;

  return (
    <div className="glass-card border-slate-700/80 bg-slate-950/70 p-4 card-fade">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
        <FiArrowRightCircle className="h-4 w-4 text-sky-400" />
        {title}
      </div>
      <ul className="mt-3 space-y-2 text-[13px] text-slate-200">
        {items.map((item, idx) => (
          <li key={`${item}-${idx}`} className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400/80" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionCard;

