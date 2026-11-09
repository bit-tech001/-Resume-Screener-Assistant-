
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
    <header className="sticky top-16 z-30 flex w-full flex-col border-b border-slate-200 bg-white lg:top-0 lg:h-[76px] lg:flex-row lg:items-center lg:justify-between">

      {/* Header Main Row */}
      <div className="flex h-16 w-full items-center justify-between gap-3 px-3 sm:px-5 lg:h-full lg:px-8">

        {/* Left Section */}
        <div className="flex min-w-0 flex-1 items-center">

          <p className="text-sm font-medium text-slate-500 lg:hidden">
            Workspace
          </p>

          {/* Desktop Search */}
          <form
            onSubmit={handleSearch}
            className="relative hidden w-full max-w-[320px] lg:block"
          >
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search candidates..."
              aria-label="Search candidates"
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </form>
        </div>

        {/* Right Section */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">

          {/* Notifications */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
          </button>

          {/* User Profile */}
          <div className="hidden shrink-0 items-center border-l border-slate-200 pl-3 sm:pl-5 lg:flex">

            {user ?? (
              <div className="flex items-center gap-2 sm:gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
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
      </div>

      {/* Mobile Search Row */}
      <div className="w-full px-3 pb-3 lg:hidden">
        <form
          onSubmit={handleSearch}
          className="relative w-full"
        >
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search candidates..."
            aria-label="Search candidates"
            className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </form>
      </div>

    </header>
  );
}
