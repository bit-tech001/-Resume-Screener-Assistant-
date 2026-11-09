
import { z } from "zod";

export const analysisInputSchema = z.object({
  candidateName: z.string().trim().min(2).max(100),

  candidateEmail: z
    .string()
    .trim()
    .email()
    .optional()
    .or(z.literal("")),

  jobDescription: z
    .string()
    .trim()
    .min(50, "Job description must contain at least 50 characters")
    .max(100000),

  resumeText: z
    .string()
    .trim()
    .min(50, "Resume must contain at least 50 characters")
    .max(100000),
});

export const analysisResultSchema = z.object({
  matchScore: z
    .number()
    .int()
    .min(0)
    .max(100),

  matchingSkills: z
    .array(z.string().min(1))
    .max(5),

  skillGaps: z
    .array(z.string().min(1))
    .max(3),

  interviewQuestions: z
    .array(z.string().min(1))
    .length(3),
});

export type ValidatedAnalysisInput = z.infer<
  typeof analysisInputSchema
>;

export type ValidatedAnalysisResult = z.infer<
  typeof analysisResultSchema
>;
