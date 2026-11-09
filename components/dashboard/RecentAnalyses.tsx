
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

interface RecentAnalysis {
  id: string;
  candidateName: string;
  matchScore: number;
  createdAt: Date;
}

export default function RecentAnalyses({
  analyses,
}: {
  analyses: RecentAnalysis[];
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5">
        <div>
          <h2 className="font-semibold text-slate-900">
            Recent analyses
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Latest candidate screening reports
          </p>
        </div>

        <Link
          href="/history"
          className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          View all <ArrowRight size={15} />
        </Link>
      </div>

      {analyses.length === 0 ? (
        <div className="p-10 text-center">
          <FileText size={30} className="mx-auto text-slate-300" />
          <p className="mt-3 text-sm font-medium text-slate-700">
            No analyses yet
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Start by analyzing your first candidate resume.
          </p>
          <Link
            href="/analyzer"
            className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Analyze resume
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {analyses.map((item) => (
            <Link
              key={item.id}
              href={`/analysis/${item.id}`}
              className="flex items-center justify-between gap-4 p-5 hover:bg-slate-50"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {item.candidateName}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.createdAt.toLocaleDateString("en-IN")}
                </p>
              </div>

              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                  item.matchScore >= 75
                    ? "bg-green-50 text-green-700"
                    : item.matchScore >= 50
                    ? "bg-amber-50 text-amber-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {item.matchScore}% match
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
