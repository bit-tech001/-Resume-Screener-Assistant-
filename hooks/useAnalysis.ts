
"use client";

import { useState } from "react";

import type { MatchReportData } from "@/components/analyzer/MatchReport";
import type { AnalysisInput } from "@/types/analysis.types";

interface ApiResponse {
  success: boolean;
  message: string;
  data?: MatchReportData;
  errors?: unknown;
}

const MIN_TEXT_LENGTH = 50;

export function useAnalysis() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState<MatchReportData | null>(null);

  const analyze = async (input: AnalysisInput) => {
    setError("");
    setReport(null);

    if (
      input.candidateName.trim().length < 2 ||
      input.jobDescription.trim().length < MIN_TEXT_LENGTH ||
      input.resumeText.trim().length < MIN_TEXT_LENGTH
    ) {
      setError(
        "Please enter a candidate name and at least 50 characters in both text fields."
      );
      return null;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          candidateName: input.candidateName.trim(),
          candidateEmail: input.candidateEmail?.trim() || undefined,
          jobDescription: input.jobDescription.trim(),
          resumeText: input.resumeText.trim(),
        }),
      });

      const result: ApiResponse = await response.json();

      if (!response.ok || !result.success || !result.data) {
        throw new Error(result.message || "Unable to analyze resume.");
      }

      setReport(result.data);

      return result.data;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );

      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError("");

  const reset = () => {
    setReport(null);
    setError("");
  };

  return {
    loading,
    error,
    report,
    analyze,
    clearError,
    reset,
  };
}
