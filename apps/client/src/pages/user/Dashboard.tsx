import { CheckCircle2, MailCheck, ShieldCheck, UserRound } from "lucide-react";

import { useAuthStore } from "@/store/auth.store";

const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="space-y-5">
      <section className="border border-[#e5e7eb] bg-white p-5">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#6b7280]">
              User Dashboard
            </p>
            <h1 className="mt-2 text-2xl font-medium tracking-tight text-[#09090b]">
              Welcome, {user?.name}
            </h1>
            <p className="mt-2 text-sm text-[#6b7280]">
              Your profile and CMS content will be shown here.
            </p>
          </div>

          <span className="w-fit border border-[#16a34a]/30 bg-[#16a34a]/10 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-[#16a34a]">
            Approved
          </span>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <div className="border border-[#e5e7eb] bg-white p-5">
          <UserRound className="h-5 w-5 text-[#6b7280]" />
          <h3 className="mt-4 font-mono text-[10px] uppercase tracking-widest text-[#6b7280]">
            Name
          </h3>
          <p className="mt-2 text-xl font-medium text-[#09090b]">
            {user?.name}
          </p>
        </div>

        <div className="border border-[#e5e7eb] bg-white p-5">
          <MailCheck className="h-5 w-5 text-[#16a34a]" />
          <h3 className="mt-4 font-mono text-[10px] uppercase tracking-widest text-[#6b7280]">
            Email
          </h3>
          <p className="mt-2 truncate text-xl font-medium text-[#09090b]">
            {user?.email}
          </p>
        </div>

        <div className="border border-[#e5e7eb] bg-white p-5">
          <ShieldCheck className="h-5 w-5 text-[#2563eb]" />
          <h3 className="mt-4 font-mono text-[10px] uppercase tracking-widest text-[#6b7280]">
            Role
          </h3>
          <p className="mt-2 text-xl font-medium uppercase text-[#09090b]">
            {user?.role}
          </p>
        </div>
      </section>

      <section className="border border-[#e5e7eb] bg-white p-5">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#16a34a]" />
          <div>
            <h2 className="text-base font-medium text-[#09090b]">
              Account access is active
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#6b7280]">
              This route is only for approved users. Admin users are redirected
              to the separate approval panel at /admin.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
