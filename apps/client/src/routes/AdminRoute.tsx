import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { restoreSession } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const {
    isAuthenticated,
    isLoading,
    user,
    setAuth,
    clearAuth,
    setLoading,
  } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      return;
    }

    const restoreAuth = async () => {
      try {
        setLoading(true);
        const session = await restoreSession();
        setAuth(session);
      } catch {
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    restoreAuth();
  }, [clearAuth, isAuthenticated, setAuth, setLoading]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f7f8] text-sm text-[#6b7280]">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !user.isApproved) {
    return <Navigate to="/pending-approval" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;
