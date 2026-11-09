
export const APP_NAME = "Resume Screener Assistant";

export const AI_MODEL =
  process.env.GEMINI_MODEL || "gemini-2.5-flash";

export const MAX_JOB_DESCRIPTION_LENGTH = 30000;

export const MAX_RESUME_LENGTH = 30000;

export const MAX_RESUME_FILE_SIZE = 5 * 1024 * 1024;

export const ACCEPTED_RESUME_FILE_TYPES = [
  ".pdf",
  ".docx",
  ".txt",
  ".md",
] as const;

export const RESUME_FILE_ACCEPT = ACCEPTED_RESUME_FILE_TYPES.join(",");

export const MAX_AI_RETRIES = 2;

export const MATCH_SCORE = {
  MIN: 0,
  MAX: 100,
};
