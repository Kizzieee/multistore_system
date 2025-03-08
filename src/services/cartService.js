import api from "./api";

export const fetchCart = async () => {
  try {
    const response = await api.get("store/cart/");
    return response.data[0];
  } catch (error) {
    console.error("Failed to fetch cart: ", error);
    throw error?.response?.data || error?.message || error;
  }
};
