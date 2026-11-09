
"use client";

import { useRef, useState } from "react";
import {
  FileText,
  Loader2,
  Upload,
  X,
  CircleAlert,
} from "lucide-react";

import {
  MAX_RESUME_FILE_SIZE,
  MAX_RESUME_LENGTH,
  RESUME_FILE_ACCEPT,
} from "@/lib/constants";

interface ParseFileResponse {
  success: boolean;
  message: string;
  data?: {
    text: string;
    fileName: string;
  };
}

const MAX_FILE_SIZE_LABEL = `${Math.round(
  MAX_RESUME_FILE_SIZE / (1024 * 1024)
)} MB`;

export default function ResumeInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState("");
  const [parsing, setParsing] = useState(false);
  const [fileError, setFileError] = useState("");

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFile = async (file: File | undefined) => {
    if (!file || parsing) {
      return;
    }

    setFileError("");
    setFileName("");

    if (file.size > MAX_RESUME_FILE_SIZE) {
      setFileError(
        `File is too large. Maximum size is ${MAX_FILE_SIZE_LABEL}.`
      );
      resetFileInput();
      return;
    }

    setParsing(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/resume/parse", {
        method: "POST",
        body: formData,
      });

      const result: ParseFileResponse = await response.json();

      if (!response.ok || !result.success || !result.data) {
        throw new Error(
          result.message || "Unable to parse the resume file."
        );
      }

      onChange(result.data.text);
      setFileName(result.data.fileName);
    } catch (error) {
      setFileName("");
      setFileError(
        error instanceof Error
          ? error.message
          : "Unable to parse the resume file."
      );
    } finally {
      setParsing(false);
      resetFileInput();
    }
  };

  const clearFile = () => {
    setFileName("");
    setFileError("");
    resetFileInput();
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label
          htmlFor="resume-text"
          className="text-sm font-semibold text-slate-800"
        >
          Candidate resume *
        </label>

        <span className="text-xs text-slate-400">
          {value.length} / {MAX_RESUME_LENGTH}
        </span>
      </div>

      <div className="mb-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-3">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={parsing}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {parsing ? (
              <Loader2 size={16} className="animate-spin text-blue-600" />
            ) : (
              <Upload size={16} className="text-blue-600" />
            )}
            {parsing ? "Parsing file..." : "Upload resume file"}
          </button>

          <span className="text-xs text-slate-500">
            PDF, DOCX, TXT or MD · up to {MAX_FILE_SIZE_LABEL}
          </span>

          {fileName && (
            <span className="flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 py-1 pl-3 pr-1 text-xs font-medium text-blue-700">
              <FileText size={14} />
              <span className="max-w-[14rem] truncate">{fileName}</span>
              <button
                type="button"
                onClick={clearFile}
                aria-label="Remove uploaded file"
                className="rounded-full p-1 hover:bg-blue-100"
              >
                <X size={13} />
              </button>
            </span>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={RESUME_FILE_ACCEPT}
          className="hidden"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />

        <p className="mt-2 text-xs text-slate-400">
          The file is parsed on the server and its text is placed in the
          editor below. You can edit it before analyzing.
        </p>

        {fileError && (
          <p
            role="alert"
            className="mt-2 flex items-start gap-1.5 text-xs text-red-600"
          >
            <CircleAlert size={14} className="mt-0.5 shrink-0" />
            {fileError}
          </p>
        )}
      </div>

      <div className="relative">
        <FileText
          size={17}
          className="pointer-events-none absolute left-3 top-4 text-slate-400"
        />

        <textarea
          id="resume-text"
          required
          rows={10}
          maxLength={MAX_RESUME_LENGTH}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste the candidate's resume text here, or upload a file above..."
          className="w-full resize-y rounded-lg border border-slate-200 pl-10 pr-4 py-4 text-sm leading-6 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>
    </div>
  );
}
