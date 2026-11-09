
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileSearch,
  History,
  BrainCircuit,
  ChevronLeft,
} from "lucide-react";

const navigation = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    match: (pathname: string) => pathname === "/dashboard",
  },
  {
    name: "Resume Analyzer",
    href: "/analyzer",
    icon: FileSearch,
    match: (pathname: string) =>
      pathname === "/analyzer" || pathname.startsWith("/analyzer"),
  },
  {
    name: "Analysis History",
    href: "/history",
    icon: History,
    match: (pathname: string) =>
      pathname.startsWith("/history") ||
      pathname.startsWith("/analysis"),
  },
];

function SidebarPanel({ pathname }: { pathname: string }) {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[250px] flex-col border-r border-slate-800 bg-[#101827] text-white">

      <div className="flex h-[76px] items-center gap-3 border-b border-slate-800 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
          <BrainCircuit size={23} />
        </div>

        <div>
          <h1 className="text-sm font-bold">Synthweb</h1>
          <p className="text-xs text-slate-400">
            Resume Screener AI
          </p>
        </div>
      </div>

      <div className="px-4 pt-8">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[2px] text-slate-500">
          Workspace
        </p>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            const active = item.match(pathname);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4">
        <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
          <div className="mb-2 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-400" />
            <span className="text-xs font-medium text-slate-200">
              AI Engine Active
            </span>
          </div>

          <p className="text-xs leading-5 text-slate-400">
            Powered by Google Gemini and Neon PostgreSQL.
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between px-2 text-xs text-slate-500">
          <span>Version 1.0.0</span>
          <ChevronLeft size={15} />
        </div>
      </div>
    </aside>
  );
}

export function SidebarFallback() {
  return <SidebarPanel pathname="" />;
}

export default function Sidebar() {
  const pathname = usePathname();

  return <SidebarPanel pathname={pathname} />;
}
