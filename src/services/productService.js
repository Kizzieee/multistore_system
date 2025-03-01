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

export const fetchMyProducts = async () => {
  try {
    const response = await api.get("store/products/my_products/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch my products: ", error);
    throw error?.response?.data || error?.message || error;
  }
};

export const addProduct = async (data) => {
  try {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("is_available", data.is_available);
    formData.append("category", data.category);

    if (data.image) {
      formData.append("image", data.image);
    }

    const response = await api.post("store/products/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to add product: ", error);
    throw error?.response?.data || error?.message || error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`store/products/${productId}/`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete product : ", error);
    throw error?.response?.data || error?.message || error;
  }
};
