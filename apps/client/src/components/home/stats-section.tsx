import * as Icons from "lucide-react";

import type {
  LucideIcon,
} from "lucide-react";

import type { Stat } from "@/types/cms";

interface Props {
  stats?: Stat[];
}

const StatsSection = ({
  stats = [],
}: Props) => {
  return (
    <section className="border-b border-[#e5e7eb]">
      <div className="mx-auto grid max-w-7xl gap-4 px-6 py-10 sm:grid-cols-3">
        {stats.map((item) => {
          const LucideIcon =
            Icons[
              item.icon as keyof typeof Icons
            ] as LucideIcon;

          const Icon =
            LucideIcon || Icons.BarChart3;

          return (
            <div
              key={item.id}
              className="border border-[#e5e7eb] bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#6b7280]">
                  {item.label}
                </p>

                <Icon className="h-4 w-4 text-[#6b7280]" />
              </div>

              <h3 className="mt-5 text-4xl font-semibold tracking-tight text-[#09090b]">
                {item.value}
              </h3>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StatsSection;