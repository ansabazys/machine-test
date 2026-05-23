import { Settings } from "lucide-react";

import EmptyStatePanel from "@/components/dashboard/EmptyStatePanel";

const UserSettings = () => {
  return (
    <EmptyStatePanel
      icon={Settings}
      title="User settings"
      description="Account preferences, notification settings, and security controls can be added here."
    />
  );
};

export default UserSettings;
