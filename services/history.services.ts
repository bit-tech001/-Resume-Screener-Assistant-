
import prisma from "@/lib/prisma";
import { getAnalyses } from "@/services/analysis.service";

export interface HistoryQuery {
  search?: string;
  minScore?: number;
  maxScore?: number;
}

export const HISTORY_PAGE_SIZE = 50;

export async function getHistory(
  query?: HistoryQuery,
  limit: number = HISTORY_PAGE_SIZE
) {
  return getAnalyses({
    search: query?.search,
    minScore: query?.minScore,
    maxScore: query?.maxScore,
    limit,
  });
}

export async function deleteAnalysis(id: string) {
  return prisma.analysis.delete({
    where: { id },
  });
}
