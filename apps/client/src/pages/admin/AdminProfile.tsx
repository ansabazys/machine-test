import { UserRound } from "lucide-react";

import EmptyStatePanel from "@/components/dashboard/EmptyStatePanel";
import { useAuthStore } from "@/store/auth.store";

const AdminProfile = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="space-y-5">
      <section className="border border-[#e5e7eb] bg-white p-5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#6b7280]">
          Admin Profile
        </p>
        <h1 className="mt-2 text-2xl font-medium tracking-tight text-[#09090b]">
          {user?.name}
        </h1>
        <p className="mt-2 text-sm text-[#6b7280]">
          {user?.email}
        </p>
      </section>

      <EmptyStatePanel
        icon={UserRound}
        title="Admin account details"
        description="This page is prepared for admin profile management, permissions summary, and security metadata."
      />
    </div>
  );
};

export default AdminProfile;
