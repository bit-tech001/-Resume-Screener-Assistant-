
"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Loader2,
  Trash2,
} from "lucide-react";

export interface HistoryRow {
  id: string;
  candidateName: string;
  candidateEmail: string | null;
  matchScore: number;
  createdAt: Date;
}

function scoreBadgeClass(score: number): string {
  if (score >= 75) return "bg-green-50 text-green-700";
  if (score >= 50) return "bg-amber-50 text-amber-700";
  return "bg-red-50 text-red-700";
}

export default function HistoryTable({
  analyses,
}: {
  analyses: HistoryRow[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    const confirmed = window.confirm(
      `Delete the saved analysis for ${name}? This cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const response = await fetch(`/api/analysis/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to delete analysis.");
      }

      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (analyses.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <div className="rounded-full bg-blue-50 p-4 text-blue-600">
          <ArrowRight size={28} />
        </div>

        <h3 className="mt-4 font-semibold text-slate-800">
          No matching candidates
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Adjust your filters or start screening a new candidate.
        </p>

        <Link
          href="/analyzer"
          className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Analyze resume
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">

        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-5 py-4 font-semibold">
              Candidate
            </th>

            <th className="px-5 py-4 font-semibold">
              Match score
            </th>

            <th className="px-5 py-4 font-semibold">
              Date
            </th>

            <th className="px-5 py-4 text-right font-semibold">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {analyses.map((analysis) => (
            <tr
              key={analysis.id}
              className="hover:bg-slate-50"
            >
              <td className="px-5 py-4">
                <p className="font-semibold text-slate-800">
                  {analysis.candidateName}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {analysis.candidateEmail || "No email provided"}
                </p>
              </td>

              <td className="px-5 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${scoreBadgeClass(
                    analysis.matchScore
                  )}`}
                >
                  {analysis.matchScore}%
                </span>
              </td>

              <td className="px-5 py-4 text-slate-500">
                {new Date(
                  analysis.createdAt
                ).toLocaleDateString("en-IN")}
              </td>

              <td className="px-5 py-4">
                <div className="flex items-center justify-end gap-4">
                  <Link
                    href={`/analysis/${analysis.id}`}
                    className="inline-flex items-center gap-1 font-medium text-blue-600 hover:text-blue-800"
                  >
                    View <ArrowRight size={15} />
                  </Link>

                  <button
                    type="button"
                    aria-label={`Delete analysis for ${analysis.candidateName}`}
                    disabled={deletingId === analysis.id || isPending}
                    onClick={() =>
                      handleDelete(
                        analysis.id,
                        analysis.candidateName
                      )
                    }
                    className="text-slate-400 transition hover:text-red-600 disabled:opacity-50"
                  >
                    {deletingId === analysis.id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
