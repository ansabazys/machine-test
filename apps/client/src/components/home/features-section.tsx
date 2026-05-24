import {
  ShieldCheck,
  UserCheck,
  MailCheck,
  LayoutDashboard,
  Lock,
  Database,
} from "lucide-react";

const features = [
  {
    title: "JWT Authentication",
    description:
      "Secure token-based authentication with protected route handling.",
    icon: ShieldCheck,
  },
  {
    title: "Email OTP Verification",
    description: "OTP validation before account activation.",
    icon: MailCheck,
  },
  {
    title: "Admin Approval Workflow",
    description: "Users remain pending until approved by admins.",
    icon: UserCheck,
  },
  {
    title: "Protected Dashboards",
    description: "Role-based dashboard access system.",
    icon: LayoutDashboard,
  },
  {
    title: "Rate Limiting & Security",
    description: "Protection against abuse and brute-force login attempts.",
    icon: Lock,
  },
  {
    title: "Strapi CMS Integration",
    description: "Dynamic homepage content powered by Strapi.",
    icon: Database,
  },
];

const FeaturesSection = () => {
  return (
    <section className="border-b border-[#e5e7eb]">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6b7280]">
            Core Requirements
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#09090b]">
            Full-stack authentication architecture
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="border border-[#e5e7eb] bg-white p-5 transition-all hover:-translate-y-1"
            >
              <feature.icon className="h-5 w-5 text-[#09090b]" />

              <h3 className="mt-5 text-lg font-medium text-[#09090b]">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#6b7280]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
