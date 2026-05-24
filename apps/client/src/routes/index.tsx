import { createBrowserRouter, Navigate } from "react-router-dom";

import Register from "@/pages/auth/Register";
import VerifyOtp from "@/pages/auth/VerifyOtp";
import Login from "@/pages/auth/Login";
import PendingApproval from "@/pages/auth/PendingApproval";

import UserLayout from "@/layouts/UserLayout";
import AdminLayout from "@/layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import Dashboard from "@/pages/user/Dashboard";
import UserProfile from "@/pages/user/Profile";
import UserSettings from "@/pages/user/Settings";
import AdminHome from "@/pages/admin/AdminHome";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminProfile from "@/pages/admin/AdminProfile";
import AdminSettings from "@/pages/admin/AdminSettings";
import HomePage from "@/pages/home/HomePage";
;

export const router = createBrowserRouter([
  /*
  |--------------------------------------------------------------------------
  | Public Routes
  |--------------------------------------------------------------------------
  */

  {
    path: "/",
    element: <HomePage />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/verify-otp",
    element: <VerifyOtp />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/pending-approval",
    element: <PendingApproval />,
  },

  /*
  |--------------------------------------------------------------------------
  | Protected Routes
  |--------------------------------------------------------------------------
  */

  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <UserLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "settings",
        element: <UserSettings />,
      },
    ],
  },

  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),

    children: [
      {
        index: true,
        element: <AdminHome />,
      },
      {
        path: "users",
        element: <AdminDashboard />,
      },
      {
        path: "pending-approvals",
        element: (
          <AdminDashboard
            defaultFilter="pending"
            title="Pending Approvals"
            description="Review verified users waiting for admin approval."
          />
        ),
      },
      {
        path: "profile",
        element: <AdminProfile />,
      },
      {
        path: "settings",
        element: <AdminSettings />,
      },
    ],
  },
]);
