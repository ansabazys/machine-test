import type { LucideIcon } from "lucide-react";

import { Loader2, LogOut, X } from "lucide-react";

import { NavLink } from "react-router-dom";

import type { User } from "@/store/auth.store";

export interface SidebarItem {
  label: string;

  path: string;

  icon: LucideIcon;
}

interface DashboardSidebarProps {
  title: string;

  items?: SidebarItem[];

  user: User | null;

  isOpen: boolean;

  onClose: () => void;

  onLogout: () => void;

  logoutLoading?: boolean;
}

const DashboardSidebar = ({
  title,
  items = [],
  user,
  isOpen,
  onClose,
  onLogout,
  logoutLoading = false,
}: DashboardSidebarProps) => {
  return (
    <>
      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* SIDEBAR */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-[#e5e7eb] bg-white text-[#09090b] transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex h-16 items-center justify-between border-b border-[#e5e7eb] px-4">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#6b7280]">
              Dashboard
            </p>

            <h1 className="mt-1 text-lg font-medium tracking-tight text-[#09090b]">
              {title}
            </h1>
          </div>

          {/* MOBILE CLOSE */}
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center text-[#6b7280] transition-colors hover:bg-[#f3f4f6] hover:text-[#09090b] md:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 space-y-1 px-3 py-5">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard" || item.path === "/admin"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-[#eceef2] text-[#09090b]"
                      : "text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#09090b]"
                  }`
                }
              >
                <Icon className="h-4 w-4" />

                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="border-t border-[#e5e7eb] p-3">
          {/* USER */}
          <div className="mb-3 min-w-0 px-2">
            <p className="truncate text-sm font-medium text-[#09090b]">
              {user?.name || "Signed in"}
            </p>

            <p className="mt-1 truncate text-xs text-[#6b7280]">
              {user?.email || "admin@example.com"}
            </p>
          </div>

          {/* LOGOUT */}
          <button
            type="button"
            onClick={onLogout}
            disabled={logoutLoading}
            className="
              flex h-10 w-full items-center gap-3 px-3
              text-sm text-[#6b7280]
              transition-colors
              hover:bg-[#f3f4f6]
              hover:text-[#09090b]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {logoutLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />

                <span>Logging out...</span>
              </>
            ) : (
              <>
                <LogOut className="h-4 w-4" />

                <span>Logout</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
