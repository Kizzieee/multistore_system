import api from "./api";

export const createStore = async (data) => {
  try {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobile_number", data.mobile_number);
    formData.append("delivery_fee", data.delivery_fee);
    formData.append("description", data.description);
    formData.append("opening_time", data.opening_time);
    formData.append("closing_time", data.closing_time);

    formData.append("address.city", data.address.city);
    formData.append("address.province", data.address.province);

    if (data.image) {
      formData.append("image", data.image);
    }

    const response = await api.post("store/stores/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to create store: ", error);
    throw error?.response?.data || error?.message || error;
  }
};

export const updateStore = async (storeId, data) => {
  try {
    const formData = new FormData();

    if (data.name) formData.append("name", data.name);
    if (data.email) formData.append("email", data.email);
    if (data.mobile_number)
      formData.append("mobile_number", data.mobile_number);
    if (data.delivery_fee) formData.append("delivery_fee", data.delivery_fee);
    if (data.description) formData.append("description", data.description);
    if (data.opening_time) formData.append("opening_time", data.opening_time);
    if (data.closing_time) formData.append("closing_time", data.closing_time);

    if (data.address?.city) formData.append("address.city", data.address.city);
    if (data.address?.province)
      formData.append("address.province", data.address.province);

    if (data.image) {
      formData.append("image", data.image);
    }

    const response = await api.patch(`store/stores/${storeId}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to update store: ", error);
    throw error?.response?.data || error?.message || error;
  }
};

export const fetchMyStore = async () => {
  try {
    const response = await api.get(`store/stores/my_store/`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch your store: ", error);
    throw error?.response?.data || error?.message || error;
  }
};
