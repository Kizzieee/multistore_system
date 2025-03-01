import api from "./api";

export const fetchProductCategories = async () => {
  try {
    const response = await api.get("store/categories/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch product categories: ", error);
    throw error?.response?.data || error?.message || error;
  }
};

export const addProductCategory = async (data) => {
  try {
    const response = await api.post("store/categories/", data);
    return response.data;
  } catch (error) {
    console.error("Failed to add product category: ", error);
    throw error?.response?.data || error?.message || error;
  }
};
export const updateProductCategory = async (categoryId, data) => {
  try {
    const response = await api.patch(`store/categories/${categoryId}/`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to update product category: ", error);
    throw error?.response?.data || error?.message || error;
  }
};

export const deleteProductCategory = async (categoryId) => {
  try {
    const response = await api.delete(`store/categories/${categoryId}/`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete product category: ", error);
    throw error?.response?.data || error?.message || error;
  }
};

export const fetchProducts = async () => {
  try {
    const response = await api.get("store/products/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products: ", error);
    throw error?.response?.data || error?.message || error;
  }
};
