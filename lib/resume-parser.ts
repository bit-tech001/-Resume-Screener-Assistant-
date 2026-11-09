
import mammoth from "mammoth";
import { extractText, getDocumentProxy } from "unpdf";

import {
  ACCEPTED_RESUME_FILE_TYPES,
  MAX_RESUME_FILE_SIZE,
  MAX_RESUME_LENGTH,
} from "@/lib/constants";

type ResumeFileExtension = (typeof ACCEPTED_RESUME_FILE_TYPES)[number];

const MIME_EXTENSION_MAP: Record<string, ResumeFileExtension> = {
  "application/pdf": ".pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    ".docx",
  "application/msword": ".docx",
  "text/plain": ".txt",
  "text/markdown": ".md",
};

function getExtension(fileName: string): string {
  const dotIndex = fileName.lastIndexOf(".");

  if (dotIndex === -1) {
    return "";
  }

  return fileName.slice(dotIndex).toLowerCase();
}

function resolveExtension(file: File): ResumeFileExtension {
  const extension = getExtension(file.name);

  if (
    ACCEPTED_RESUME_FILE_TYPES.includes(
      extension as ResumeFileExtension
    )
  ) {
    return extension as ResumeFileExtension;
  }

  const mimeExtension = MIME_EXTENSION_MAP[file.type];

  if (mimeExtension) {
    return mimeExtension;
  }

  throw new Error(
    "Unsupported file type. Please upload a PDF, DOCX, TXT or MD file."
  );
}

function normalizeText(text: string): string {
  return text
    .replace(/^\uFEFF/, "")
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, MAX_RESUME_LENGTH);
}

async function extractPdfText(buffer: Buffer): Promise<string> {
  const pdf = await getDocumentProxy(new Uint8Array(buffer));
  const { text } = await extractText(pdf, { mergePages: true });

  return text;
}

async function extractDocxText(buffer: Buffer): Promise<string> {
  const { value } = await mammoth.extractRawText({ buffer });

  return value;
}

export async function parseResumeFile(file: File): Promise<string> {
  if (file.size === 0) {
    throw new Error("The uploaded file is empty.");
  }

  if (file.size > MAX_RESUME_FILE_SIZE) {
    throw new Error(
      `File is too large. Maximum size is ${Math.round(
        MAX_RESUME_FILE_SIZE / (1024 * 1024)
      )} MB.`
    );
  }

  const extension = resolveExtension(file);

  const buffer = Buffer.from(await file.arrayBuffer());

  let rawText: string;

  switch (extension) {
    case ".pdf":
      rawText = await extractPdfText(buffer);
      break;
    case ".docx":
      rawText = await extractDocxText(buffer);
      break;
    case ".txt":
    case ".md":
      rawText = buffer.toString("utf8");
      break;
  }

  const text = normalizeText(rawText);

  if (text.length === 0) {
    throw new Error(
      "No readable text was found in the file. Scanned PDFs are not supported — please paste the resume text instead."
    );
  }

  return text;
}
