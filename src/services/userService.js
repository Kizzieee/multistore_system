import api from "./api";

export const me = async () => {
  try {
    const response = await api.get("auth/users/me/");
    return response.data;
  } catch (error) {
    console.error("Failed to get user info: ", error);
    throw error?.response?.data || error?.message || error;
  }
};

export async function activate(searchParams) {
  try {
    const uuid = searchParams.get("uuid");
    const token = searchParams.get("token");

    if (!uuid || !token) {
      throw new Error("Invalid activation link.");
    }

    const response = await api.post("auth/users/activation/", {
      uid: uuid,
      token: token,
    });

    return response.data;
  } catch (error) {
    console.error("Failed to activate account: ", error);
    throw error?.response?.data || error?.message || error;
  }
}
