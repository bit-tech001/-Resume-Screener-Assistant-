
"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Sparkles,
  Loader2,
  RotateCcw,
} from "lucide-react";

import MatchReport from "@/components/analyzer/MatchReport";
import JobDescriptionInput from "@/components/analyzer/JobDescriptionInput";
import ResumeInput from "@/components/analyzer/ResumeInput";
import { useAnalysis } from "@/hooks/useAnalysis";

export default function ResumeForm() {
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [resumeInputKey, setResumeInputKey] = useState(0);

  const {
    loading,
    error,
    report,
    analyze,
    clearError,
    reset,
  } = useAnalysis();

  const handleAnalyze = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    await analyze({
      candidateName,
      candidateEmail,
      jobDescription,
      resumeText,
    });
  };

  const resetForm = () => {
    setCandidateName("");
    setCandidateEmail("");
    setJobDescription("");
    setResumeText("");
    setResumeInputKey((key) => key + 1);
    reset();
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleAnalyze}
        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-7"
      >
        <div className="mb-7">
          <h2 className="text-lg font-bold text-slate-900">
            Candidate information
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Enter candidate details and provide the documents for analysis.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Candidate name *
            </label>

            <div className="relative">
              <User
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                required
                value={candidateName}
                onChange={(e) => {
                  setCandidateName(e.target.value);
                  clearError();
                }}
                placeholder="e.g. Rahul Sharma"
                className="h-11 w-full rounded-lg border border-slate-200 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Candidate email
            </label>

            <div className="relative">
              <Mail
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="email"
                value={candidateEmail}
                onChange={(e) => {
                  setCandidateEmail(e.target.value);
                  clearError();
                }}
                placeholder="candidate@example.com"
                className="h-11 w-full rounded-lg border border-slate-200 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
        </div>

        <div className="mt-7 space-y-6">
          <JobDescriptionInput
            value={jobDescription}
            onChange={(value) => {
              setJobDescription(value);
              clearError();
            }}
          />

          <ResumeInput
            key={resumeInputKey}
            value={resumeText}
            onChange={(value) => {
              setResumeText(value);
              clearError();
            }}
          />
        </div>

        {error && (
          <div
            role="alert"
            className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-6">
          <button
            type="button"
            onClick={resetForm}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            <RotateCcw size={16} />
            Reset
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Analyzing resume...
              </>
            ) : (
              <>
                <Sparkles size={17} />
                Analyze resume
              </>
            )}
          </button>
        </div>
      </form>

      {report && <MatchReport data={report} />}
    </div>
  );
}
