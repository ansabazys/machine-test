import { lazy, Suspense } from "react";

import { createBrowserRouter, Navigate } from "react-router-dom";

import UserLayout from "@/layouts/UserLayout";
import AdminLayout from "@/layouts/AdminLayout";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";


// =========================
// Lazy Loaded Pages
// =========================

const Register = lazy(() => import("@/pages/auth/Register"));
const VerifyOtp = lazy(() => import("@/pages/auth/VerifyOtp"));
const Login = lazy(() => import("@/pages/auth/Login"));
const PendingApproval = lazy(() => import("@/pages/auth/PendingApproval"));

const Dashboard = lazy(() => import("@/pages/user/Dashboard"));
const UserProfile = lazy(() => import("@/pages/user/Profile"));
const UserSettings = lazy(() => import("@/pages/user/Settings"));

const AdminHome = lazy(() => import("@/pages/admin/AdminHome"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminProfile = lazy(() => import("@/pages/admin/AdminProfile"));
const AdminSettings = lazy(() => import("@/pages/admin/AdminSettings"));

const HomePage = lazy(() => import("@/pages/home/HomePage"));

const ErrorPage = lazy(() => import("@/pages/error/ErrorPage"));


// =========================
// Suspense Wrapper
// =========================

const withSuspense = (component: React.ReactNode) => (
  <Suspense
    fallback={
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    }
  >
    {component}
  </Suspense>
);


// =========================
// Router
// =========================

export const router = createBrowserRouter([
  
  {
    path: "/",

    element: withSuspense(<HomePage />),

    errorElement: withSuspense(<ErrorPage />),
  },

  {
    path: "/register",

    element: withSuspense(<Register />),

    errorElement: withSuspense(<ErrorPage />),
  },

  {
    path: "/verify-otp",

    element: withSuspense(<VerifyOtp />),

    errorElement: withSuspense(<ErrorPage />),
  },

  {
    path: "/login",

    element: withSuspense(<Login />),

    errorElement: withSuspense(<ErrorPage />),
  },

  {
    path: "/pending-approval",

    element: withSuspense(<PendingApproval />),

    errorElement: withSuspense(<ErrorPage />),
  },


  // =========================
  // User Routes
  // =========================

  {
    path: "/dashboard",

    element: (
      <ProtectedRoute>
        <UserLayout />
      </ProtectedRoute>
    ),

    errorElement: withSuspense(<ErrorPage />),

    children: [
      {
        index: true,

        element: withSuspense(<Dashboard />),
      },

      {
        path: "profile",

        element: withSuspense(<UserProfile />),
      },

      {
        path: "settings",

        element: withSuspense(<UserSettings />),
      },
    ],
  },


  // =========================
  // Admin Routes
  // =========================

  {
    path: "/admin",

    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),

    errorElement: withSuspense(<ErrorPage />),

    children: [
      {
        index: true,

        element: withSuspense(<AdminHome />),
      },

      {
        path: "users",

        element: withSuspense(<AdminDashboard />),
      },

      {
        path: "profile",

        element: withSuspense(<AdminProfile />),
      },

      {
        path: "settings",

        element: withSuspense(<AdminSettings />),
      },
    ],
  },


  // =========================
  // Fallback Route
  // =========================

  {
    path: "*",

    element: <Navigate to="/" replace />,
  },
]);