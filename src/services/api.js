import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "./config";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from "./tokenService";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `JWT ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
          const response = await api.post("auth/jwt/refresh/", {
            refresh: refreshToken,
          });

          const newAccessToken = response.data.access;
          setAccessToken(newAccessToken);
          originalRequest.headers.Authorization = `JWT ${newAccessToken}`;

          return api(originalRequest);
        }
      } catch (refreshError) {
        clearTokens();
        const navigate = useNavigate();
        navigate("/login");
        return Promise.reject(refreshError);
      }
    }

    // If the error is not 401, or we've already retried, reject
    return Promise.reject(error);
  }
);

export default api;
