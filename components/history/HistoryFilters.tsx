
"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";

const RANGE_OPTIONS = [
  { label: "Any score", value: "" },
  { label: "Strong match (75 - 100%)", value: "75-100" },
  { label: "Moderate match (50 - 74%)", value: "50-74" },
  { label: "Weak match (0 - 49%)", value: "0-49" },
];

function toRangeValue(minScore?: string, maxScore?: string): string {
  if (minScore && maxScore) return `${minScore}-${maxScore}`;
  if (minScore === "75" && !maxScore) return "75-100";
  return "";
}

export default function HistoryFilters({
  q,
  minScore,
  maxScore,
}: {
  q: string;
  minScore: string;
  maxScore: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useState(q);
  const [range, setRange] = useState(toRangeValue(minScore, maxScore));

  const applyFilters = (nextQuery: string, nextRange: string) => {
    const params = new URLSearchParams();

    if (nextQuery.trim()) {
      params.set("q", nextQuery.trim());
    }

    if (nextRange) {
      const [min, max] = nextRange.split("-");
      params.set("min", min);
      params.set("max", max);
    }

    const queryString = params.toString();

    startTransition(() => {
      router.push(
        queryString ? `${pathname}?${queryString}` : pathname
      );
    });
  };

  const hasFilters = Boolean(q || minScore || maxScore);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        applyFilters(query, range);
      }}
      className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
    >
      <div className="relative w-full sm:w-auto">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search name or email..."
          aria-label="Search candidates"
          className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 sm:w-56"
        />
      </div>

      <div className="relative w-full sm:w-auto">
        <SlidersHorizontal
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <select
          value={range}
          onChange={(event) => {
            setRange(event.target.value);
            applyFilters(query, event.target.value);
          }}
          aria-label="Filter by match score"
          className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-8 text-sm text-slate-600 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 sm:w-auto"
        >
          {RANGE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="h-10 w-full rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60 sm:w-auto"
      >
        Apply
      </button>

      {hasFilters && (
        <button
          type="button"
          disabled={isPending}
          onClick={() => {
            setQuery("");
            setRange("");
            applyFilters("", "");
          }}
          className="flex h-10 w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-60 sm:w-auto"
        >
          <X size={15} />
          Clear
        </button>
      )}
    </form>
  );
}
