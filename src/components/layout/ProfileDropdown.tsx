import { useState, useEffect, useRef } from "react";
import { formatDate, getInitials } from "../../utils/formatters";
import type { CustomerProfile } from "../../types/api";

interface ProfileDropdownProps {
  profile: CustomerProfile;
}

export const ProfileDropdown = ({ profile }: ProfileDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center cursor-pointer  w-10 h-10 rounded-full bg-[#00486d] text-white font-bold text-sm shadow-sm hover:bg-[#003a59] transition-all focus:outline-none focus:ring-2 focus:ring-[#00486d]/30 shrink-0"
      >
        {getInitials(profile.name)}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-lg p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            <p className="font-bold text-gray-900 truncate">{profile.name}</p>
            <p className="text-xs text-gray-500 truncate">{profile.email}</p>
          </div>

          <hr className="my-3 border-gray-100" />

          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">Account Type</span>
              <span className="font-semibold text-gray-900 capitalize">
                {profile.accountType}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">Joined</span>
              <span className="font-semibold text-gray-900">
                {formatDate(profile.joinDate)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
