import { AxiosError } from "axios";

import { api } from "./axios";

import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "@/store/auth.store";


// REQUEST INTERCEPTOR
api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // If access token expired
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Refresh token request
        const response = await api.post("/auth/refresh");

        const newAccessToken = response.data.accessToken;

        setAccessToken(newAccessToken);

        // Retry original request
        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);

      } catch (refreshError) {
        clearAccessToken();

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);