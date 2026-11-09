
import { LogOut } from "lucide-react";

import { getCurrentUser } from "@/lib/auth";
import { logout } from "@/lib/actions/auth";

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function UserBadgeFallback() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
        HR
      </div>

      <div className="hidden sm:block">
        <p className="text-sm font-semibold text-slate-800">
          Loading...
        </p>
        <p className="text-xs text-slate-500">
          Workspace session
        </p>
      </div>
    </div>
  );
}

export default async function SessionIndicator() {
  const user = await getCurrentUser();

  if (!user) {
    return <UserBadgeFallback />;
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
        {getInitials(user.name)}
      </div>

      <div className="hidden max-w-[180px] sm:block">
        <p className="truncate text-sm font-semibold text-slate-800">
          {user.name}
        </p>
        <p className="truncate text-xs text-slate-500">
          {user.email}
        </p>
      </div>

      <form action={logout}>
        <button
          type="submit"
          aria-label="Log out"
          title="Log out"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
        >
          <LogOut size={16} />
        </button>
      </form>
    </div>
  );
}
