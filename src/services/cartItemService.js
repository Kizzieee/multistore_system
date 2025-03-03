import api from "./api";

export const fetchCartItems = async () => {
  try {
    const response = await api.get("store/cartitems/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch cart items: ", error);
    throw error?.response?.data || error?.message || error;
  }
};

export const addCartItem = async (productID) => {
  try {
    const response = await api.post("store/cartitems/", {
      product: productID,
      quantity: 1,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to add cart item: ", error);
    throw error?.response?.data || error?.message || error;
  }
};

export const updateCartItem = async (cartItemId, quantity) => {
  try {
    const response = await api.patch(`store/cartitems/${cartItemId}/`, {
      quantity: quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update cart item: ", error);
    throw error?.response?.data || error?.message || error;
  }
};

export const deleteCartItem = async (cartItemId) => {
  try {
    const response = await api.delete(`store/cartitems/${cartItemId}/`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete cart item: ", error);
    throw error?.response?.data || error?.message || error;
  }
};
