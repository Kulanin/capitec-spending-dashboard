import { Home } from "lucide-react";
import { NavLink } from "react-router-dom";
import { UserProfileWidget } from "./UserProfileWidget";
import type { CustomerProfile } from "../../types/api";

interface SidebarProps {
  profile: CustomerProfile;
}

export const Sidebar = ({ profile }: SidebarProps) => {
  return (
    <aside className="w-full md:w-64 md:min-w-[16rem] shrink-0 bg-white border-b md:border-b-0 md:border-r border-gray-200 flex flex-row md:flex-col justify-between md:justify-start items-center md:items-stretch p-4 md:p-6 md:h-screen md:sticky md:top-0 z-50">
      <NavLink to="/dashboard" className="flex items-center md:mb-10 py-1">
        <img
          src="/capitec-logo.svg"
          alt="Capitec Bank"
          className="h-7 w-auto object-contain"
        />
      </NavLink>

      <nav className="hidden md:flex flex-col gap-1 flex-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
              isActive
                ? "bg-[#00486d]/5 text-[#00486d]"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`
          }
        >
          <Home className="w-5 h-5 stroke-[2.5]" />
          <span>Home</span>
        </NavLink>
      </nav>

      <div className="block md:hidden">
        <UserProfileWidget profile={profile} />
      </div>
    </aside>
  );
};
