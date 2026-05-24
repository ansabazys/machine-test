interface Props {
  announcements?: {
    id: number;
    title: string;
    description: string;
    priority: string;
  }[];
}

const AnnouncementsSection = ({ announcements = [] }: Props) => {
  return (
    <section className="border-b border-[#e5e7eb]">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6b7280]">
            System Announcements
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {announcements.map((item) => (
            <div key={item.id} className="border border-[#e5e7eb] bg-white p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-[#09090b]">
                  {item.title}
                </h3>

                <span className="border border-[#d1d5db] bg-[#f9fafb] px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-[#374151]">
                  {item.priority}
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-[#6b7280]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnnouncementsSection;
