import { api } from "@/api/axios";
import type { LoginPayload, RegisterPayload, VerifyOtpPayload } from "@/types/auth.types";




export const registerUser = async (
  data: RegisterPayload
) => {
  const response = await api.post(
    "/auth/register",
    data
  );

  return response.data;
};


export const loginUser = async (
  data: LoginPayload
) => {
  const response = await api.post(
    "/auth/login",
    data
  );

  return response.data;
};


export const verifyOtp = async (
  data: VerifyOtpPayload
) => {
  const response = await api.post(
    "/auth/verify-otp",
    data
  );

  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");

  return response.data;
};

export const resendOtp = async (
  email: string
) => {

  const response = await api.post(
    "/auth/resend-otp",
    { email }
  );

  return response.data;
};