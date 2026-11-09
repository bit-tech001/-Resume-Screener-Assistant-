
import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import {
  Users,
  FileCheck,
  TrendingUp,
  Target,
  Sparkles,
} from "lucide-react";

import StatsCard from "@/components/dashboard/StatsCard";
import RecentAnalyses from "@/components/dashboard/RecentAnalyses";
import { getDashboardStats } from "@/services/analysis.service";

function DashboardFallback() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((card) => (
          <div
            key={card}
            className="h-36 animate-pulse rounded-xl bg-white shadow-sm ring-1 ring-slate-200"
          />
        ))}
      </div>

      <div className="h-72 animate-pulse rounded-xl bg-white shadow-sm ring-1 ring-slate-200" />
    </div>
  );
}

async function DashboardContent() {
  await connection();

  const stats = await getDashboardStats();

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total analyses"
          value={stats.total}
          description="Total resumes analyzed"
          icon={FileCheck}
        />

        <StatsCard
          title="Average match score"
          value={`${stats.averageScore}%`}
          description="Average candidate score"
          icon={TrendingUp}
        />

        <StatsCard
          title="Strong matches"
          value={stats.shortlisted}
          description="Candidates scoring 75% or higher"
          icon={Target}
        />

        <StatsCard
          title="Candidates screened"
          value={stats.total}
          description="Candidate screening records"
          icon={Users}
        />
      </div>

      <RecentAnalyses analyses={stats.recent} />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-7">
      <div>
        <p className="text-sm font-medium text-blue-600">
          Resume Screener Assistant
        </p>

        <h1 className="mt-2 text-2xl font-bold text-slate-900">
          Dashboard overview
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Monitor candidate screening and AI-powered recruitment insights.
        </p>
      </div>

      <div className="rounded-xl bg-blue-600 p-6 text-white md:p-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-blue-100">
            <Sparkles size={18} />
            <span className="text-sm font-medium">
              AI recruitment assistant
            </span>
          </div>

          <h2 className="mt-3 text-xl font-bold md:text-2xl">
            Find the right candidate faster.
          </h2>

          <p className="mt-2 text-sm leading-6 text-blue-100">
            Analyze resumes, compare skills, identify candidate gaps,
            and generate interview questions using AI.
          </p>

          <Link
            href="/analyzer"
            className="mt-5 inline-flex rounded-lg bg-white px-5 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50"
          >
            Start new analysis
          </Link>
        </div>
      </div>

      <Suspense fallback={<DashboardFallback />}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}
