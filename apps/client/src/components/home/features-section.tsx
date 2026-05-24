import * as Icons from "lucide-react";

import type {
  LucideIcon,
} from "lucide-react";

import type { Feature } from "@/types/cms";

interface Props {
  features?: Feature[];
}

const FeaturesSection = ({
  features = [],
}: Props) => {
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
          {features.map((feature) => {
            const LucideIcon =
              Icons[
                feature.icon as keyof typeof Icons
              ] as LucideIcon;

            const Icon =
              LucideIcon || Icons.Box;

            return (
              <div
                key={feature.id}
                className="border border-[#e5e7eb] bg-white p-5 transition-all hover:-translate-y-1"
              >
                <Icon className="h-5 w-5 text-[#09090b]" />

                <h3 className="mt-5 text-lg font-medium text-[#09090b]">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#6b7280]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;