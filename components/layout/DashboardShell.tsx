
import { Suspense } from "react";

import Sidebar, { SidebarFallback } from "./Sidebar";
import Header from "./Header";
import SessionIndicator, {
  UserBadgeFallback,
} from "./SessionIndicator";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8fafc]">

      <Suspense fallback={<SidebarFallback />}>
        <Sidebar />
      </Suspense>

      <div className="min-h-screen pl-0 md:pl-[250px]">
        <Header
          user={
            <Suspense fallback={<UserBadgeFallback />}>
              <SessionIndicator />
            </Suspense>
          }
        />

        <main className="mx-auto max-w-[1600px] p-5 md:p-8">
          {children}
        </main>
      </div>

    </div>
  );
}
