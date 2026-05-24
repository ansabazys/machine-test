

import {
  CheckCircle2,
  TimerReset,
  XCircle,
} from "lucide-react";

const activity = [
  {
    user: "ansab@example.com",
    status: "approved",
    icon: CheckCircle2,
    color: "text-[#16a34a]",
  },
  {
    user: "john@example.com",
    status: "pending",
    icon: TimerReset,
    color: "text-[#ca8a04]",
  },
  {
    user: "alex@example.com",
    status: "rejected",
    icon: XCircle,
    color: "text-[#dc2626]",
  },
];

const ActivityPanel = () => {
  return (
    <section className="border-b border-[#e5e7eb]">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6b7280]">
            Approval Workflow
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#09090b]">
            Live approval activity
          </h2>
        </div>

        <div className="border border-[#e5e7eb] bg-white">
          <div className="divide-y divide-[#e5e7eb]">
            {activity.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-5 py-4 hover:bg-[#f9fafb]"
              >
                <div className="flex items-start gap-3">
                  <item.icon
                    className={`mt-0.5 h-4 w-4 ${item.color}`}
                  />

                  <div>
                    <p className="text-sm font-medium text-[#18181b]">
                      {item.user}
                    </p>

                    <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[#9ca3af]">
                      May 23 • 14:22
                    </p>
                  </div>
                </div>

                <span className="border border-[#d1d5db] bg-[#f9fafb] px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-[#374151]">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivityPanel;