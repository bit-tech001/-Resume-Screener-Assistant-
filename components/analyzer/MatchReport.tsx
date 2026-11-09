
"use client";

import MatchScore from "@/components/report/MatchScore";
import MatchingSkills from "@/components/report/MatchingSkills";
import SkillGaps from "@/components/report/SkillGaps";
import InterviewQuestions from "@/components/report/InterviewQuestions";

export interface MatchReportData {
  id: string;
  candidateName: string;
  matchScore: number;
  matchingSkills: string[];
  skillGaps: string[];
  interviewQuestions: string[];
}

export default function MatchReport({
  data,
}: {
  data: MatchReportData;
}) {
  return (
    <div className="mt-8 space-y-5">

      <MatchScore
        candidateName={data.candidateName}
        matchScore={data.matchScore}
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <MatchingSkills skills={data.matchingSkills} />
        <SkillGaps gaps={data.skillGaps} />
      </div>

      <InterviewQuestions questions={data.interviewQuestions} />

      <p className="text-xs leading-5 text-slate-500">
        AI-generated recommendations are decision-support information,
        not a final hiring decision. HR should independently verify
        qualifications and evaluate candidates fairly.
      </p>
    </div>
  );
}
