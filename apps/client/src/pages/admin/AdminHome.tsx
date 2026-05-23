import { ShieldCheck, UserCheck, Users } from "lucide-react";

import EmptyStatePanel from "@/components/dashboard/EmptyStatePanel";

const AdminHome = () => {
  return (
    <div className="space-y-5">
      <section className="grid gap-5 md:grid-cols-3">
        <div className="border border-[#e5e7eb] bg-white p-5">
          <Users className="h-5 w-5 text-[#374151]" />
          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-[#6b7280]">
            User Directory
          </p>
          <p className="mt-2 text-xl font-medium text-[#09090b]">
            Manage accounts
          </p>
        </div>

        <div className="border border-[#e5e7eb] bg-white p-5">
          <ShieldCheck className="h-5 w-5 text-[#ca8a04]" />
          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-[#6b7280]">
            Approval Queue
          </p>
          <p className="mt-2 text-xl font-medium text-[#09090b]">
            Review requests
          </p>
        </div>

        <div className="border border-[#e5e7eb] bg-white p-5">
          <UserCheck className="h-5 w-5 text-[#16a34a]" />
          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-[#6b7280]">
            Access Control
          </p>
          <p className="mt-2 text-xl font-medium text-[#09090b]">
            Role protected
          </p>
        </div>
      </section>

      <EmptyStatePanel
        icon={ShieldCheck}
        title="Admin dashboard"
        description="Use the sidebar to manage all users, review pending approvals, and maintain admin account settings."
      />
    </div>
  );
};

export default AdminHome;
