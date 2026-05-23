import { useMemo, useState } from "react";
import {
  Home,
  Settings,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import DashboardSidebar, {
  type SidebarItem,
} from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import { logoutUser } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

const adminNavItems: SidebarItem[] = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: Home,
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    label: "Pending Approvals",
    path: "/admin/pending-approvals",
    icon: ShieldCheck,
  },
  {
    label: "Profile",
    path: "/admin/profile",
    icon: UserRound,
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const pageTitle = useMemo(() => {
    if (location.pathname.endsWith("/users")) {
      return "Users";
    }

    if (location.pathname.endsWith("/pending-approvals")) {
      return "Pending Approvals";
    }

    if (location.pathname.endsWith("/profile")) {
      return "Profile";
    }

    if (location.pathname.endsWith("/settings")) {
      return "Settings";
    }

    return "Admin Dashboard";
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
        title="Admin Console"
        items={adminNavItems}
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

export default AdminLayout;
