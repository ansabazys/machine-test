import { useMemo, useState } from "react";
import { Home, Settings, UserRound } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import DashboardSidebar, {
  type SidebarItem,
} from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import { logoutUser } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

const userNavItems: SidebarItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: Home,
  },
  {
    label: "Profile",
    path: "/dashboard/profile",
    icon: UserRound,
  },
  {
    label: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
];

const UserLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const pageTitle = useMemo(() => {
    if (location.pathname.endsWith("/profile")) {
      return "Profile";
    }

    if (location.pathname.endsWith("/settings")) {
      return "Settings";
    }

    return "Dashboard";
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } finally {
      clearAuth();
      localStorage.clear();
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-[#f7f7f8] text-[#09090b]">
      <DashboardSidebar
        title="User Console"
        items={userNavItems}
        user={user}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={handleLogout}
      />

      <div className="flex h-full flex-col md:ml-64">
        <DashboardTopbar
          title={pageTitle}
          userName={user?.name}
          role={user?.role}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
