import axios from "axios";

import { toast } from "sonner";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  withCredentials: true,
});

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const message =
      error?.response?.data?.message ||
      "Something went wrong";

    const requestUrl =
      error?.config?.url || "";

    // IGNORE REFRESH TOKEN ERRORS
    const isRefreshTokenRequest =
      requestUrl.includes("/refresh-token");

    // AVOID DUPLICATE TOASTS
    if (
      !error.config?.silent &&
      !isRefreshTokenRequest
    ) {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);