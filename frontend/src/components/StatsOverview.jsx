import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const StatsOverview = ({ resumeScore = 0, atsScore = 0 }) => {
  const data = [
    { label: "Structure", score: Math.round(resumeScore * 0.9) },
    { label: "Clarity", score: Math.round(resumeScore * 0.95) },
    { label: "Impact", score: resumeScore },
    { label: "Keywords", score: atsScore },
    { label: "ATS", score: atsScore }
  ];

  return (
    <div className="glass-card border-slate-700/80 bg-slate-950/70 p-4 card-fade">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-50">
            Resume analytics
          </h3>
          <p className="text-[11px] text-slate-500">
            How different dimensions contribute to your overall score.
          </p>
        </div>
        <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-300">
          {resumeScore >= 80 ? "Ready to apply" : "Room to optimize"}
        </div>
      </div>
      <div className="mt-4 h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -30 }}>
            <defs>
              <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#4c1d95" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1f2937"
              horizontal
              vertical={false}
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#9ca3af", fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#6b7280", fontSize: 10 }}
              domain={[0, 100]}
            />
            <Tooltip
              cursor={{ stroke: "#1f2937", strokeWidth: 1 }}
              contentStyle={{
                backgroundColor: "#020617",
                borderRadius: 12,
                border: "1px solid rgba(148,163,184,0.4)",
                fontSize: 11
              }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#38bdf8"
              fill="url(#scoreGradient)"
              strokeWidth={2}
              dot={{ r: 3, strokeWidth: 1, stroke: "#38bdf8" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatsOverview;

