
import Link from "next/link";
import { ArrowLeft, FileSearch, ShieldCheck } from "lucide-react";
import ResumeForm from "@/components/analyzer/ResumeForm";

export default function AnalyzerPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">

      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600"
      >
        <ArrowLeft size={16} />
        Back to dashboard
      </Link>

      <div>
        <div className="mb-3 flex items-center gap-2 text-blue-600">
          <FileSearch size={20} />
          <span className="text-sm font-semibold">
            AI Resume Screening
          </span>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
          Resume Analyzer
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Compare a candidate&apos;s resume with your job requirements.
          Get an AI-generated match score, skill insights and interview questions.
        </p>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
        <ShieldCheck className="mt-0.5 shrink-0 text-blue-600" size={20} />

        <p className="text-sm leading-6 text-blue-800">
          Candidate information is processed by the AI service
          and stored in your database for screening history.
          Only submit information you are authorized to process.
        </p>
      </div>

      <ResumeForm />

    </div>
  );
}
