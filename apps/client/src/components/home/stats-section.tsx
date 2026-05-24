import { ShieldCheck, UserCheck, Clock3 } from "lucide-react";

const stats = [
  {
    label: "Approved Users",
    value: "28K+",
    icon: UserCheck,
  },
  {
    label: "Auth Uptime",
    value: "99.9%",
    icon: ShieldCheck,
  },
  {
    label: "Avg Approval",
    value: "1.2s",
    icon: Clock3,
  },
];

const StatsSection = () => {
  return (
    <section className="border-b border-[#e5e7eb]">
      <div className="mx-auto grid max-w-7xl gap-4 px-6 py-10 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.label}
            className="border border-[#e5e7eb] bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#6b7280]">
                {item.label}
              </p>

              <item.icon className="h-4 w-4 text-[#6b7280]" />
            </div>

            <h3 className="mt-5 text-4xl font-semibold tracking-tight text-[#09090b]">
              {item.value}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
