import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { restoreSession } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const location = useLocation();
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
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-sm text-gray-600">
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

  if (
    location.pathname.startsWith("/dashboard") &&
    user?.role === "admin"
  ) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute;
