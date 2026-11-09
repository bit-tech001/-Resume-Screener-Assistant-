
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { analyzeResumeWithAI } from "@/lib/openai";
import { analysisInputSchema } from "@/schemas/analysis.schema";
import {
  MAX_JOB_DESCRIPTION_LENGTH,
  MAX_RESUME_LENGTH,
} from "@/lib/constants";
import { truncateText } from "@/lib/utils";

export async function createAnalysis(input: unknown) {
  const validatedInput = analysisInputSchema.parse(input);

  const jobDescription = truncateText(
    validatedInput.jobDescription,
    MAX_JOB_DESCRIPTION_LENGTH
  );

  const resumeText = truncateText(
    validatedInput.resumeText,
    MAX_RESUME_LENGTH
  );

  const aiResult = await analyzeResumeWithAI(
    jobDescription,
    resumeText
  );

  return prisma.analysis.create({
    data: {
      candidateName: validatedInput.candidateName,
      candidateEmail: validatedInput.candidateEmail || null,
      jobDescription,
      resumeText,
      matchScore: aiResult.matchScore,
      matchingSkills: aiResult.matchingSkills,
      skillGaps: aiResult.skillGaps,
      interviewQuestions: aiResult.interviewQuestions,
    },
  });
}

export async function getAnalyses(filters?: {
  search?: string;
  minScore?: number;
  maxScore?: number;
  limit?: number;
}) {
  const where: Prisma.AnalysisWhereInput = {};

  if (filters?.search?.trim()) {
    where.OR = [
      {
        candidateName: {
          contains: filters.search.trim(),
          mode: "insensitive",
        },
      },
      {
        candidateEmail: {
          contains: filters.search.trim(),
          mode: "insensitive",
        },
      },
    ];
  }

  if (filters?.minScore !== undefined || filters?.maxScore !== undefined) {
    where.matchScore = {
      ...(filters.minScore !== undefined
        ? { gte: filters.minScore }
        : {}),
      ...(filters.maxScore !== undefined
        ? { lte: filters.maxScore }
        : {}),
    };
  }

  return prisma.analysis.findMany({
    where,
    orderBy: { createdAt: "desc" },
    ...(filters?.limit !== undefined
      ? { take: filters.limit }
      : {}),
  });
}

export async function getAnalysisById(id: string) {
  return prisma.analysis.findUnique({
    where: { id },
  });
}

export async function getDashboardStats() {
  const [total, average, shortlisted, recent] = await Promise.all([
    prisma.analysis.count(),

    prisma.analysis.aggregate({
      _avg: { matchScore: true },
    }),

    prisma.analysis.count({
      where: { matchScore: { gte: 75 } },
    }),

    prisma.analysis.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return {
    total,
    averageScore: Math.round(average._avg.matchScore ?? 0),
    shortlisted,
    recent,
  };
}
