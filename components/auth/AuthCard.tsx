
import Link from "next/link";
import { BrainCircuit } from "lucide-react";

export default function AuthCard({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#f8fafc] px-4 py-8 sm:px-5 sm:py-10">
      <div className="w-full max-w-md">

        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
            <BrainCircuit size={24} />
          </div>

          <div className="text-left">
            <h1 className="text-base font-bold text-slate-900">
              Synthweb
            </h1>
            <p className="text-xs text-slate-500">
              Resume Screener AI
            </p>
          </div>
        </Link>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
          <h2 className="text-xl font-bold text-slate-900">
            {title}
          </h2>

          <p className="mt-1.5 text-sm leading-6 text-slate-500">
            {description}
          </p>

          <div className="mt-6">{children}</div>
        </div>

        <p className="mt-6 text-center text-xs leading-5 text-slate-400">
          {footer}
        </p>

      </div>
    </div>
  );
}
