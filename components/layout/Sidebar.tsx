
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileSearch,
  History,
  BrainCircuit,
  ChevronLeft,
  Menu,
  X,
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

function SidebarPanel({
  pathname,
  onNavigate,
  user,
}: {
  pathname: string;
  onNavigate?: () => void;
  user?: React.ReactNode;
}) {
  return (
    <aside className="flex h-full w-[250px] shrink-0 flex-col border-r border-slate-800 bg-[#101827] text-white">

      {/* Logo */}
      <div className="flex h-[76px] shrink-0 items-center gap-3 border-b border-slate-800 px-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600">
          <BrainCircuit size={23} />
        </div>

        <div>
          <h1 className="text-sm font-bold">Synthweb</h1>
          <p className="text-xs text-slate-400">
            Resume Screener AI
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 pt-8">
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
                onClick={onNavigate}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon size={18} className="shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom section */}
      <div className="shrink-0 p-4">
        {user && (
          <div className="mb-3 rounded-xl border border-slate-700 bg-slate-800/60 p-3">
            {user}
          </div>
        )}

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
  return (
    <div className="hidden h-dvh lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:block">
      <SidebarPanel pathname="" />
    </div>
  );
}

export default function Sidebar({
  user,
}: {
  user?: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="fixed inset-y-0 left-0 z-40 hidden h-dvh lg:block">
        <SidebarPanel pathname={pathname} />
      </div>

      {/* Mobile Header */}
      <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-slate-800 bg-[#101827] px-4 text-white lg:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
            <BrainCircuit size={21} />
          </div>

          <div>
            <h1 className="text-sm font-bold">Synthweb</h1>
            <p className="text-[10px] text-slate-400">
              Resume Screener AI
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          {isOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </header>

      {/* Mobile Overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[250px] transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative h-full">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="absolute right-3 top-5 z-10 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X size={19} />
          </button>

          <SidebarPanel
            pathname={pathname}
            user={user}
            onNavigate={() => setIsOpen(false)}
          />
        </div>
      </div>
    </>
  );
}
