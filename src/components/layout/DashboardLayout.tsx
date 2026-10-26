import React from "react";
import type { CustomerProfile } from "../../types/api";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  profile: CustomerProfile;
  children: React.ReactNode;
}

export const DashboardLayout = ({
  profile,
  children,
}: DashboardLayoutProps) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-slate-50 text-left">
      <Sidebar profile={profile} />

      <main className="flex-1 min-w-0 flex flex-col p-4 sm:p-6 md:p-8 gap-6 md:gap-8 md:h-screen md:overflow-y-auto">
        {children}
      </main>
    </div>
  );
};
