
import Link from "next/link";
import { Suspense } from "react";
import {
  FileSearch,
  Search,
} from "lucide-react";

import HistoryFilters from "@/components/history/HistoryFilters";
import HistoryTable from "@/components/history/HistoryTable";
import { getHistory } from "@/services/history.services";

interface HistorySearchParams {
  q?: string | string[];
  min?: string | string[];
  max?: string | string[];
}

function first(value?: string | string[]): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function toScore(value: string): number | undefined {
  if (!value) return undefined;

  const parsed = Number.parseInt(value, 10);

  return Number.isNaN(parsed) ? undefined : parsed;
}

function FiltersFallback() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="h-10 w-56 animate-pulse rounded-lg bg-slate-100" />
      <div className="h-10 w-52 animate-pulse rounded-lg bg-slate-100" />
      <div className="h-10 w-24 animate-pulse rounded-lg bg-slate-100" />
    </div>
  );
}

function TableFallback() {
  return (
    <div className="space-y-3 p-5">
      {[0, 1, 2, 3].map((row) => (
        <div
          key={row}
          className="h-14 animate-pulse rounded-lg bg-slate-100"
        />
      ))}
    </div>
  );
}

async function HistoryFiltersSection({
  searchParams,
}: {
  searchParams: Promise<HistorySearchParams>;
}) {
  const params = await searchParams;

  const q = first(params.q);
  const minScore = first(params.min);
  const maxScore = first(params.max);

  return (
    <HistoryFilters
      key={`${q}-${minScore}-${maxScore}`}
      q={q}
      minScore={minScore}
      maxScore={maxScore}
    />
  );
}

async function HistoryResults({
  searchParams,
}: {
  searchParams: Promise<HistorySearchParams>;
}) {
  const params = await searchParams;

  const q = first(params.q);
  const minScore = first(params.min);
  const maxScore = first(params.max);

  const analyses = await getHistory({
    search: q || undefined,
    minScore: toScore(minScore),
    maxScore: toScore(maxScore),
  });

  const hasFilters = Boolean(q || minScore || maxScore);

  if (analyses.length === 0 && !hasFilters) {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <div className="rounded-full bg-blue-50 p-4 text-blue-600">
          <FileSearch size={28} />
        </div>

        <h3 className="mt-4 font-semibold text-slate-800">
          No analysis found
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Start screening candidates to populate your history.
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
    <>
      <div className="border-b border-slate-100 px-5 py-3 text-xs text-slate-500">
        {analyses.length}{" "}
        {hasFilters ? "matching records" : "recent records"}
      </div>

      <HistoryTable analyses={analyses} />
    </>
  );
}

export default function HistoryPage({
  searchParams,
}: {
  searchParams: Promise<HistorySearchParams>;
}) {
  return (
    <div className="space-y-7">

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-slate-500">
            Workspace / History
          </p>

          <h1 className="mt-2 text-2xl font-bold text-slate-900">
            Analysis History
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Review previously screened candidates.
          </p>
        </div>

        <Link
          href="/analyzer"
          className="rounded-lg bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-blue-700"
        >
          New Analysis
        </Link>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h2 className="font-semibold text-slate-900">
              All candidates
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Search, filter and open saved screening reports.
            </p>
          </div>

          <Suspense fallback={<FiltersFallback />}>
            <HistoryFiltersSection searchParams={searchParams} />
          </Suspense>
        </div>

        <Suspense fallback={<TableFallback />}>
          <HistoryResults searchParams={searchParams} />
        </Suspense>

      </div>

      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Search size={14} />
        Filters are applied from the URL, so you can share or bookmark
        a filtered candidate list.
      </div>

    </div>
  );
}
