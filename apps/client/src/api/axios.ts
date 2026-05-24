import axios from "axios";

import { toast } from "sonner";

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL,

  withCredentials: true,
});

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const message =
      error?.response?.data
        ?.message ||
      "Something went wrong";

    // AVOID DUPLICATE TOASTS
    if (!error.config?.silent) {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);