import type { LucideIcon } from "lucide-react";

interface EmptyStatePanelProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const EmptyStatePanel = ({
  icon: Icon,
  title,
  description,
}: EmptyStatePanelProps) => {
  return (
    <section className="border border-[#e5e7eb] bg-white p-8">
      <div className="flex min-h-[260px] items-center justify-center text-center">
        <div className="max-w-md">
          <div className="mx-auto flex h-12 w-12 items-center justify-center border border-[#e5e7eb] bg-[#f7f7f8] text-[#374151]">
            <Icon className="h-5 w-5" />
          </div>

          <h1 className="mt-5 text-2xl font-medium tracking-tight text-[#09090b]">
            {title}
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#6b7280]">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default EmptyStatePanel;
