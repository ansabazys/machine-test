import { Menu } from "lucide-react";

interface DashboardTopbarProps {
  title: string;
  userName?: string;
  role?: string;
  onMenuClick: () => void;
}

const DashboardTopbar = ({
  title,
  userName,
  role,
  onMenuClick,
}: DashboardTopbarProps) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#e5e7eb] bg-white px-4 md:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center border border-[#e5e7eb] text-[#374151] hover:bg-[#f3f4f6] md:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#6b7280]">
            Current Page
          </p>
          <h2 className="truncate text-lg font-medium tracking-tight text-[#18181b]">
            {title}
          </h2>
        </div>
      </div>

      <div className="flex min-w-0 items-center gap-3">
        <p className="hidden max-w-[180px] truncate text-sm font-medium text-[#09090b] sm:block">
          {userName}
        </p>

        <span className="border border-[#e5e7eb] bg-white px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-[#6b7280]">
          {role}
        </span>
      </div>
    </header>
  );
};

export default DashboardTopbar;
