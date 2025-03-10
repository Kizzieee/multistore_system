import api from "./api";

export const fetchMyOrders = async () => {
  try {
    const response = await api.get("store/orders/my_orders/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch my orders: ", error);
    throw error?.response?.data || error?.message || error;
  }
};

export const createOrder = async (data) => {
  try {
    const response = await api.post("store/orders/", data);
    return response.data;
  } catch (error) {
    console.error("Failed to create order: ", error);
    throw error?.response?.data || error?.message || error;
  }
};

export const fetchStoreMyOrders = async () => {
  try {
    const response = await api.get("store/orders/my_store_orders/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch my store orders: ", error);
    throw error?.response?.data || error?.message || error;
  }
};

export const updateOrderStatus = async (orderId, orderStatus) => {
  try {
    const response = await api.patch(
      `store/orders/${orderId}/update_order_status/`,
      { status: orderStatus }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update order status: ", error);
    throw error?.response?.data || error?.message || error;
  }
};
