import { createBrowserRouter, Navigate } from "react-router-dom";

import Register from "@/pages/auth/Register";
import VerifyOtp from "@/pages/auth/VerifyOtp";
import Login from "@/pages/auth/Login";
import PendingApproval from "@/pages/auth/PendingApproval";

import DashboardLayout from "@/layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "@/pages/user/Dashboard";

export const router = createBrowserRouter([
  /*
  |--------------------------------------------------------------------------
  | Public Routes
  |--------------------------------------------------------------------------
  */

  {
    path: "/",
    element: <Navigate to="/login" replace />,
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
        <DashboardLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
]);
