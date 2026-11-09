
import { Sparkles } from "lucide-react";

export default function MatchScore({
  candidateName,
  matchScore,
}: {
  candidateName: string;
  matchScore: number;
}) {
  const scoreColor =
    matchScore >= 75
      ? "text-green-600"
      : matchScore >= 50
      ? "text-amber-600"
      : "text-red-600";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
            <Sparkles size={17} />
            AI analysis completed
          </div>

          <h2 className="mt-2 text-xl font-bold text-slate-900">
            {candidateName}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Candidate match report
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 px-6 py-4 text-center">
          <p className="text-xs font-medium text-slate-500">
            Match score
          </p>

          <p className={`mt-1 text-4xl font-bold ${scoreColor}`}>
            {matchScore}%
          </p>
        </div>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-blue-600 transition-all"
          style={{ width: `${matchScore}%` }}
        />
      </div>
    </div>
  );
}
