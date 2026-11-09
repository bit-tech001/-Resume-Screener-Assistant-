
import { AlertCircle } from "lucide-react";

export default function SkillGaps({
  gaps,
}: {
  gaps: string[];
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="mb-5 flex items-center gap-2">
        <AlertCircle className="text-amber-600" size={20} />
        <h3 className="font-semibold text-slate-900">
          Skill gaps
        </h3>
      </div>

      {gaps.length === 0 ? (
        <p className="text-sm text-slate-500">
          No skill gaps detected against the job requirements.
        </p>
      ) : (
        <div className="space-y-3">
          {gaps.map((skill, index) => (
            <div
              key={`${skill}-${index}`}
              className="flex items-center gap-3 rounded-lg bg-amber-50 px-4 py-3"
            >
              <AlertCircle size={16} className="text-amber-600" />
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
