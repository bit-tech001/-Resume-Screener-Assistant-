
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  CalendarDays,
  Mail,
} from "lucide-react";

import prisma from "@/lib/prisma";
import MatchReport from "@/components/analyzer/MatchReport";

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value.filter(
    (item): item is string => typeof item === "string"
  );
}

function ReportFallback() {
  return (
    <div className="space-y-5">
      <div className="h-32 animate-pulse rounded-xl bg-white shadow-sm ring-1 ring-slate-200" />
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="h-64 animate-pulse rounded-xl bg-white ring-1 ring-slate-200" />
        <div className="h-64 animate-pulse rounded-xl bg-white ring-1 ring-slate-200" />
      </div>
      <div className="h-56 animate-pulse rounded-xl bg-white ring-1 ring-slate-200" />
    </div>
  );
}

async function AnalysisContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const analysis = await prisma.analysis.findUnique({
    where: { id },
  });

  if (!analysis) {
    notFound();
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Candidate report
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Detailed AI screening results.
            </p>
          </div>

          <span className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700">
            Saved analysis
          </span>
        </div>

        <div className="mt-6 grid gap-4 border-t border-slate-100 pt-6 md:grid-cols-3">
          <div className="flex items-center gap-3">
            <User className="text-slate-400" size={19} />
            <div>
              <p className="text-xs text-slate-400">Candidate</p>
              <p className="text-sm font-semibold text-slate-800">
                {analysis.candidateName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="text-slate-400" size={19} />
            <div>
              <p className="text-xs text-slate-400">Email</p>
              <p className="text-sm font-semibold text-slate-800">
                {analysis.candidateEmail || "Not provided"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CalendarDays className="text-slate-400" size={19} />
            <div>
              <p className="text-xs text-slate-400">Analyzed on</p>
              <p className="text-sm font-semibold text-slate-800">
                {new Date(
                  analysis.createdAt
                ).toLocaleDateString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <MatchReport
        data={{
          id: analysis.id,
          candidateName: analysis.candidateName,
          matchScore: analysis.matchScore,
          matchingSkills: toStringArray(
            analysis.matchingSkills
          ),
          skillGaps: toStringArray(analysis.skillGaps),
          interviewQuestions: toStringArray(
            analysis.interviewQuestions
          ),
        }}
      />

      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-slate-900">
            Job description
          </h2>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-600">
            {analysis.jobDescription}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-slate-900">
            Candidate resume
          </h2>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-600">
            {analysis.resumeText}
          </p>
        </div>
      </div>
    </>
  );
}

export default function AnalysisDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="mx-auto max-w-5xl space-y-6">

      <Link
        href="/history"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
      >
        <ArrowLeft size={17} />
        Back to history
      </Link>

      <Suspense fallback={<ReportFallback />}>
        <AnalysisContent params={params} />
      </Suspense>

    </div>
  );
}
