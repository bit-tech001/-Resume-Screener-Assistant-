
import { MessageSquare } from "lucide-react";

export default function InterviewQuestions({
  questions,
}: {
  questions: string[];
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="mb-5 flex items-center gap-2">
        <MessageSquare className="text-blue-600" size={20} />
        <h3 className="font-semibold text-slate-900">
          Suggested interview questions
        </h3>
      </div>

      {questions.length === 0 ? (
        <p className="text-sm text-slate-500">
          No interview questions generated for this analysis.
        </p>
      ) : (
        <div className="space-y-3">
          {questions.map((question, index) => (
            <div
              key={index}
              className="flex gap-4 rounded-lg border border-slate-100 p-4"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600">
                {index + 1}
              </span>

              <p className="text-sm leading-6 text-slate-700">
                {question}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
