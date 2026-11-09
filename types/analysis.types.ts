
export interface AnalysisResult {
  matchScore: number;
  matchingSkills: string[];
  skillGaps: string[];
  interviewQuestions: string[];
}

export interface AnalysisInput {
  candidateName: string;
  candidateEmail?: string;
  jobDescription: string;
  resumeText: string;
}

export interface AnalysisResponse extends AnalysisResult {
  id: string;
  candidateName: string;
  createdAt: Date;
}
