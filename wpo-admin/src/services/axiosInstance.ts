// src/api/axiosInstance.ts
import {
  getAccessToken,
  removeAccessToken,
  removeAccessTokenExpiry,
} from "@/utils/tokenUtils";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Handle global errors (Response Interceptor)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        removeAccessToken();
        removeAccessTokenExpiry();
      }

      if (error.response.status === 500) {
        console.error("Server error:", error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
