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
