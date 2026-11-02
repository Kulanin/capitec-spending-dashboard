import type { CustomerProfile } from "../../types/api";
import { ProfileDropdown } from "./ProfileDropdown";

interface UserProfileWidgetProps {
  profile: CustomerProfile;
}

export const UserProfileWidget = ({ profile }: UserProfileWidgetProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="hidden sm:flex flex-col text-right">
        <span className="text-xs font-semibold text-gray-700">
          {profile.customerId}
        </span>
        <span className="text-[10px] text-green-700 font-bold uppercase tracking-wider">
          Online Secure
        </span>
      </div>

      <ProfileDropdown profile={profile} />
    </div>
  );
};
