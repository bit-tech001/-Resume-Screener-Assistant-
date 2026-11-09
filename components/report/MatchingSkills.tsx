
import { CheckCircle2 } from "lucide-react";

export default function MatchingSkills({
  skills,
}: {
  skills: string[];
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="mb-5 flex items-center gap-2">
        <CheckCircle2 className="text-green-600" size={20} />
        <h3 className="font-semibold text-slate-900">
          Matching skills
        </h3>
      </div>

      {skills.length === 0 ? (
        <p className="text-sm text-slate-500">
          No matching skills identified for this candidate.
        </p>
      ) : (
        <div className="space-y-3">
          {skills.map((skill, index) => (
            <div
              key={`${skill}-${index}`}
              className="flex items-center gap-3 rounded-lg bg-green-50 px-4 py-3"
            >
              <CheckCircle2 size={16} className="text-green-600" />
              <span className="text-sm font-medium text-slate-700">
                {skill}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
