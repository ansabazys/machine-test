import { createBrowserRouter } from "react-router-dom";

import Register from "@/pages/auth/Register";
import VerifyOtp from "@/pages/auth/VerifyOtp";
import Login from "@/pages/auth/Login";
import PendingApproval from "@/pages/auth/PendingApproval";

export const router = createBrowserRouter([
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
]);
