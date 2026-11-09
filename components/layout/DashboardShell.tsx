
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
    <div className="min-h-dvh bg-[#f8fafc]">

      <Suspense fallback={<SidebarFallback />}>
        <Sidebar
          user={
            <Suspense fallback={<UserBadgeFallback variant="dark" />}>
              <SessionIndicator variant="dark" />
            </Suspense>
          }
        />
      </Suspense>

      <div className="min-h-dvh pt-16 pl-0 lg:pt-0 lg:pl-[250px]">
        <Header
          user={
            <Suspense fallback={<UserBadgeFallback />}>
              <SessionIndicator />
            </Suspense>
          }
        />

        <main className="mx-auto max-w-[1600px] p-4 sm:p-5 lg:p-8">
          {children}
        </main>
      </div>

    </div>
  );
}
