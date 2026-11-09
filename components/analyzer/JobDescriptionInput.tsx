
import { Briefcase } from "lucide-react";
import { MAX_JOB_DESCRIPTION_LENGTH } from "@/lib/constants";

export default function JobDescriptionInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label
          htmlFor="job-description"
          className="text-sm font-semibold text-slate-800"
        >
          Job description *
        </label>

        <span className="text-xs text-slate-400">
          {value.length} / {MAX_JOB_DESCRIPTION_LENGTH}
        </span>
      </div>

      <div className="relative">
        <Briefcase
          size={17}
          className="pointer-events-none absolute left-3 top-4 text-slate-400"
        />

        <textarea
          id="job-description"
          required
          rows={8}
          maxLength={MAX_JOB_DESCRIPTION_LENGTH}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste the complete job description, including responsibilities, requirements and skills..."
          className="w-full resize-y rounded-lg border border-slate-200 pl-10 pr-4 py-4 text-sm leading-6 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>
    </div>
  );
}
