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

    // SILENTLY IGNORE REFRESH AUTH ERRORS
    const isRefreshRequest =
      requestUrl.includes("/refresh");

    const isRefreshTokenMissing =
      message === "Refresh token missing";

    if (
      !error.config?.silent &&
      !isRefreshRequest &&
      !isRefreshTokenMissing
    ) {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);