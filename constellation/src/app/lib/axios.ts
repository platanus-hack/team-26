// lib/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Flag to prevent multiple token refresh attempts
let isRefreshing = false;
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];

// Helper function to process the failed requests queue
interface FailedRequest {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}

type ProcessQueueFunction = (
  error: Error | null,
  token?: string | null
) => void;

const processQueue: ProcessQueueFunction = (error, token = null) => {
  failedQueue.forEach((prom: FailedRequest) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Add a request interceptor to include token automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("access");

    if (access) {
      config.headers["Authorization"] = `Bearer ${access}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      // If refresh is already in progress, queue the request
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((access) => {
            originalRequest.headers["Authorization"] = "Bearer " + access;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("refresh");

      if (!refreshToken) {
        // No refresh token available, redirect to login
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        return Promise.reject(error);
      }

      // Attempt to refresh the token
      return new Promise(function (resolve, reject) {
        axios
          .post(process.env.NEXT_PUBLIC_API_URL + "/users/token/refresh", {
            refresh: refreshToken,
          })
          .then(({ data }) => {
            const newToken = data.access;
            localStorage.setItem("access", newToken);
            axiosInstance.defaults.headers.common["Authorization"] =
              "Bearer " + newToken;
            originalRequest.headers["Authorization"] = "Bearer " + newToken;
            processQueue(null, newToken);
            resolve(axiosInstance(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
