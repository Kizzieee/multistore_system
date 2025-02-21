import api from "./api";
import {
  clearTokens,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "./tokenService";

export const register = async (data) => {
  try {
    const response = await api.post("auth/users/", data);
    return response.data;
  } catch (error) {
    console.error("Failed to register: ", error);
    throw error.response?.data || error;
  }
};

export async function login(email, password) {
  try {
    const response = await api.post("/auth/jwt/create/", {
      email,
      password,
    });
    const { access, refresh } = response.data;
    setAccessToken(access);
    setRefreshToken(refresh);
    return response;
  } catch (error) {
    console.error("Failed to login: ", error);
    throw error.response?.data || error;
  }
}

export function logout() {
  clearTokens();
}

export async function refreshToken() {
  try {
    const refresh = getRefreshToken();
    if (refresh) {
      const response = await api.post("/auth/jwt/refresh/", {
        refresh,
      });
      const newAccess = response.data.access;
      setAccessToken(newAccess);
      return newAccess;
    }
    throw new Error("No refresh token available");
  } catch (error) {
    console.error("Failed to refresh token: ", error);
    throw error.response?.data || error;
  }
}

export async function verifyToken(accessToken) {
  try {
    const response = await api.post("/auth/jwt/verify/", {
      token: accessToken,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to verify token: ", error);
    throw error.response?.data || error;
  }
}
