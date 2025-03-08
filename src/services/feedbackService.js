import api from "./api";

export const createFeedback = async (data) => {
  try {
    const response = await api.post("store/feedbacks/", data);
    return response.data;
  } catch (error) {
    console.error("Failed to create feedback: ", error);
    throw error?.response?.data || error?.message || error;
  }
};
