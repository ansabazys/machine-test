import { api } from "@/api/axios";
import type { User } from "@/store/auth.store";
import type { LoginPayload, RegisterPayload, VerifyOtpPayload } from "@/types/auth.types";

const normalizeUser = (user: any): User => ({
  _id: user._id || user.id,
  name: user.name,
  email: user.email,
  role: user.role?.toLowerCase() as User["role"],
  isApproved: user.isApproved ?? user.status === "APPROVED",
  isVerified: user.isVerified ?? user.emailVerified,
});

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

  return {
    ...response.data,
    accessToken: response.data.data.accessToken,
    user: normalizeUser(response.data.data.user),
  };
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

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return normalizeUser(response.data.data);
};

export const restoreSession = async () => {
  const refreshResponse = await api.post("/auth/refresh");
  const accessToken = refreshResponse.data.accessToken;

  const userResponse = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return {
    accessToken,
    user: normalizeUser(userResponse.data.data),
  };
};
