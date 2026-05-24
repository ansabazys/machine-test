interface Props {
  faqs: any;
}

const FAQSection = ({ faqs }: Props) => {
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
          {faqs?.data?.map((faq: any) => (
            <div key={faq.id} className="border border-[#e5e7eb] bg-white p-5">
              <h3 className="text-sm font-medium text-[#09090b]">
                {faq.question}
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#6b7280]">
                {faq.answer?.[0]?.children?.[0]?.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
