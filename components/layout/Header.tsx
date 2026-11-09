
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Search } from "lucide-react";

export default function Header({
  user,
}: {
  user?: React.ReactNode;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = query.trim();

    router.push(
      trimmed
        ? `/history?q=${encodeURIComponent(trimmed)}`
        : "/history"
    );
  };

  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white px-5 md:px-8">

      <div className="flex items-center gap-3">
        <form
          onSubmit={handleSearch}
          className="relative hidden sm:block"
        >
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search candidates..."
            aria-label="Search candidates"
            className="h-10 w-64 rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </form>

        <p className="text-sm font-medium text-slate-500 sm:hidden">
          Workspace
        </p>
      </div>

      <div className="flex items-center gap-5">
        <button
          aria-label="Notifications"
          className="relative text-slate-500 hover:text-slate-900"
        >
          <Bell size={20} />
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-blue-600" />
        </button>

        <div className="border-l border-slate-200 pl-5">
          {user ?? (
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                HR
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-slate-800">
                  HR Manager
                </p>
                <p className="text-xs text-slate-500">
                  Administrator
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
