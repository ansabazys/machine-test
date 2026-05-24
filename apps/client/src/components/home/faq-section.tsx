import { useState } from "react";

import { ChevronDown } from "lucide-react";

import type { Faq } from "@/types/cms";

interface Props {
  faq?: Faq[];
}

const FAQSection = ({
  faq = [],
}: Props) => {
  const [openId, setOpenId] =
    useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenId((prev) =>
      prev === id ? null : id
    );
  };

  return (
    <section className="border-b border-[#e5e7eb]">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6b7280]">
            FAQ
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#09090b]">
            Authentication & approval workflow
          </h2>
        </div>

        <div className="space-y-4">
          {faq.map((item) => {
            const isOpen =
              openId === item.id;

            return (
              <div
                key={item.id}
                className="overflow-hidden border border-[#e5e7eb] bg-white transition-all"
              >
                <button
                  onClick={() =>
                    toggleFaq(item.id)
                  }
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <h3 className="text-sm font-medium text-[#09090b]">
                    {item.question}
                  </h3>

                  <ChevronDown
                    className={`h-4 w-4 text-[#6b7280] transition-transform duration-200 ${
                      isOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-7 text-[#6b7280]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;