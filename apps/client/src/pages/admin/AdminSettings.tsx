import { Settings } from "lucide-react";

import EmptyStatePanel from "@/components/dashboard/EmptyStatePanel";

const AdminSettings = () => {
  return (
    <EmptyStatePanel
      icon={Settings}
      title="Admin settings"
      description="Workspace rules, approval policies, and admin preferences can be configured here."
    />
  );
};

export default AdminSettings;
