import { ArrowRight } from "lucide-react";

import { Link } from "react-router-dom";

interface Props {
  homepage: any;
}

const HeroSection = ({ homepage }: Props) => {
  return (
    <section className="border-b border-[#e5e7eb]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <span className="mb-5 w-fit border border-[#e5e7eb] bg-white px-3 py-1 text-[10px] font-mono uppercase tracking-[0.25em] text-[#6b7280]">
            Secure Approval Workflow
          </span>

          <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-[#09090b]">
            {homepage?.data?.title}
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-[#4b5563]">
            {homepage?.data?.subtitle?.[0]?.children?.[0]?.text}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to={homepage?.data?.ctaLink || "/register"}
              className="flex items-center gap-2 border border-[#09090b] bg-[#09090b] px-5 py-3 text-xs font-mono uppercase tracking-widest text-white transition-opacity hover:opacity-90"
            >
              {homepage?.data?.ctaText}

              <ArrowRight className="h-4 w-4" />
            </Link>

            <button className="border border-[#e5e7eb] bg-white px-5 py-3 text-xs font-mono uppercase tracking-widest text-[#6b7280] transition-colors hover:bg-[#f3f4f6] hover:text-[#09090b]">
              API Documentation
            </button>
          </div>
        </div>

        <div className="border border-[#e5e7eb] bg-white">
          <div className="border-b border-[#e5e7eb] px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#6b7280]">
                  Live Approval Activity
                </p>

                <h3 className="mt-2 text-sm font-medium text-[#18181b]">
                  Pending Approval Queue
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#16a34a]" />

                <span className="font-mono text-[10px] uppercase tracking-widest text-[#6b7280]">
                  Live
                </span>
              </div>
            </div>
          </div>

          <div className="divide-y divide-[#e5e7eb]">
            {[
              "ansab@example.com",
              "john@example.com",
              "alex@example.com",
              "maria@example.com",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-[#f9fafb]"
              >
                <div>
                  <p className="text-sm font-medium text-[#18181b]">{item}</p>

                  <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[#9ca3af]">
                    May 23 • 14:22
                  </p>
                </div>

                <span className="border border-[#d1d5db] bg-[#f9fafb] px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-[#374151]">
                  approved
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
