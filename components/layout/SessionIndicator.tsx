
import { LogOut } from "lucide-react";

import { getCurrentUser } from "@/lib/auth";
import { logout } from "@/lib/actions/auth";

type SessionIndicatorVariant = "light" | "dark";

interface SessionIndicatorProps {
  variant?: SessionIndicatorVariant;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function UserBadgeFallback({
  variant = "light",
}: SessionIndicatorProps = {}) {
  const isDark = variant === "dark";

  return (
    <div className="flex min-w-0 items-center gap-3">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
          isDark
            ? "bg-blue-600 text-white"
            : "bg-blue-100 text-blue-700"
        }`}
      >
        HR
      </div>

      <div className={`min-w-0 ${isDark ? "" : "hidden sm:block"}`}>
        <p
          className={`truncate text-sm font-semibold ${
            isDark ? "text-white" : "text-slate-800"
          }`}
        >
          Loading...
        </p>
        <p
          className={`truncate text-xs ${
            isDark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Workspace session
        </p>
      </div>
    </div>
  );
}

export default async function SessionIndicator({
  variant = "light",
}: SessionIndicatorProps) {
  const user = await getCurrentUser();

  if (!user) {
    return <UserBadgeFallback variant={variant} />;
  }

  const isDark = variant === "dark";

  return (
    <div className="flex min-w-0 items-center gap-3">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
          isDark
            ? "bg-blue-600 text-white"
            : "bg-blue-100 text-blue-700"
        }`}
      >
        {getInitials(user.name)}
      </div>

      <div
        className={`min-w-0 flex-1 ${
          isDark ? "" : "hidden max-w-[180px] sm:block"
        }`}
      >
        <p
          className={`truncate text-sm font-semibold ${
            isDark ? "text-white" : "text-slate-800"
          }`}
        >
          {user.name}
        </p>
        <p
          className={`truncate text-xs ${
            isDark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          {user.email}
        </p>
      </div>

      <form action={logout}>
        <button
          type="submit"
          aria-label="Log out"
          title="Log out"
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition ${
            isDark
              ? "border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
              : "border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800"
          }`}
        >
          <LogOut size={16} />
        </button>
      </form>
    </div>
  );
}
