import api from "./api";

export const me = async () => {
  try {
    const response = await api.get("auth/users/me/");
    return response.data;
  } catch (error) {
    console.error("Failed to get user info: ", error);
    throw error.response?.data || error;
  }
};
