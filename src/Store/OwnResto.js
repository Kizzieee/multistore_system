import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import renderErrorMessages from "../errorHelper";
import MyToast from "../MyToast";
import {
  addProduct,
  addProductCategory,
  deleteProduct,
  deleteProductCategory,
  fetchMyProducts,
  fetchProductCategories,
} from "../services/productService";
import { fetchMyStore } from "../services/storeService";
import StoreInfo from "./StoreInfo";

const OwnResto = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [showEditRestaurantModal, setShowEditRestaurantModal] = useState(false);
  const [store, setStore] = useState(null);
  const [categories, setCategories] = useState([]);
  const [addCategory, setAddCategory] = useState({ name: "" });
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [products, setProducts] = useState([]);
  const [isExecutingRequest, setIsExecutingRequest] = useState(false);
  const [productOperation, setProductOperation] = useState("add");
  const [productBtnText, setProductBtnText] = useState("Add Product");
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    is_available: true,
    category: "",
    image: null,
  });

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        setIsLoading(true);
        const storeData = await fetchMyStore();
        setStore(storeData);
        const categoriesData = await fetchProductCategories();
        setCategories(categoriesData);
        const productsData = await fetchMyProducts();
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStoreData();
  }, [setStore]);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setIsAddingCategory(true);
    try {
      const addedCategory = await addProductCategory(addCategory);
      setCategories((prevCategories) => [addedCategory, ...prevCategories]);
      setAddCategory({ name: "" });
    } catch (error) {
      setError(error);
    } finally {
      setIsAddingCategory(false);
    }
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setAddCategory({ ...addCategory, [name]: value });
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteProductCategory(categoryId);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== categoryId)
      );
    } catch (error) {
      setError(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (productOperation === "add") {
      setIsExecutingRequest(true);
      setProductBtnText("Adding Product...");
      try {
        const addedProduct = await addProduct(product);
        setProducts((prevProducts) => [addedProduct, ...prevProducts]);
        setProduct({
          name: "",
          description: "",
          price: "",
          is_available: true,
          category: "",
          image: null,
        });
        document.getElementById("productImage").value = "";
      } catch (error) {
        setError(error);
      } finally {
        setIsExecutingRequest(false);
        setProductBtnText("Add Product");
      }
    }
    if (productOperation === "edit") {
      setIsExecutingRequest(true);
      setProductBtnText("Saving Changes...");
      console.log(product);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (error) {
      setError(error);
    }
  };

  const handleChangeManageProduct = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  if (isLoading === true) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        {renderErrorMessages(error)}
      </div>
    );
  }

  return (
    <div className="container mt-5 p-0">
      <div className=" col-10 m-auto mt-5 p-0">
        <div className="row">
          <div className="col-md-12 resto-name-banner p-0">
            <div className="resto-name-banner-gradient"></div>
            <div className="resto-banner-details d-flex justify-content-between align-items-end">
              <h1>{store?.display_name}</h1>
              {store?.image && (
                <img
                  src={
                    typeof store.image === "string"
                      ? store.image
                      : URL.createObjectURL(store.image)
                  }
                  alt="Store Logo"
                  className="me-3 rounded"
                  style={{
                    width: "230px",
                    height: "130px",
                    objectFit: "cover",
                  }}
                />
              )}
              <div className="d-flex flex-column justify-content-between align-items-end gap-2">
                <button
                  className="main-btn-primary"
                  onClick={() => navigate("/orders")}
                >
                  <i className="bi bi-border-width"></i> Orders
                </button>
                <button
                  className="white-btn-primary"
                  onClick={() => setShowEditRestaurantModal(true)}
                >
                  <i className="bi bi-info-circle"></i> Store Info
                </button>
              </div>
            </div>
          </div>
        </div>
        <StoreInfo
          showEditRestaurantModal={showEditRestaurantModal}
          setShowEditRestaurantModal={setShowEditRestaurantModal}
          store={store}
          setStore={setStore}
        />

        <div className="row my-4">
          <div className="col-md-6">
            <h4>Manage Categories</h4>
            <form onSubmit={handleAddCategory}>
              <input
                onChange={handleCategoryChange}
                value={addCategory.name}
                name="name"
                type="text"
                placeholder="Enter category name"
                className="form-control"
                required
              />
              <button
                disabled={isAddingCategory}
                type="submit"
                className="btn btn-primary mt-2"
              >
                {isAddingCategory ? "Adding Category..." : "Add Category"}
              </button>
            </form>
            <ul className="mt-3 list-category">
              {categories.map((category) => (
                <li
                  key={category?.id}
                  className="col-12 d-flex justify-content-between align-items-center p-2 border rounded"
                >
                  {" "}
                  {category?.name}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteCategory(category?.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <h4>Manage Products</h4>
              <input
                value={product?.name}
                onChange={handleChangeManageProduct}
                name="name"
                type="text"
                placeholder="Product Name"
                className="form-control"
                required
              />
              <textarea
                value={product?.description}
                onChange={handleChangeManageProduct}
                name="description"
                placeholder="Description"
                className="form-control mt-2"
                required
              />
              <input
                onChange={(e) =>
                  setProduct({
                    ...product,
                    image: e.target.files[0],
                  })
                }
                name="image"
                id="productImage"
                accept=".jpg, .jpeg, .png"
                type="file"
                className="form-control mt-2"
              />
              <span className="small">
                Up to <strong>5MB</strong>
              </span>
              <input
                value={product?.price}
                onChange={handleChangeManageProduct}
                name="price"
                type="number"
                placeholder="Price"
                className="form-control mt-2"
                required
              />
              <div className="d-flex align-items-center mt-2">
                <select
                  value={product?.category || ""}
                  onChange={(e) => {
                    setProduct({
                      ...product,
                      category: parseInt(e.target.value, 10),
                    });
                  }}
                  name="category"
                  className="form-select flex-grow-1"
                  required
                  style={{ maxWidth: "75%" }}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category?.id} value={category?.id}>
                      {category?.name}
                    </option>
                  ))}
                </select>
                <div className="form-check ms-2">
                  <input
                    checked={product?.is_available ?? true}
                    onChange={(e) => {
                      setProduct({
                        ...product,
                        is_available: e.target.checked,
                      });
                    }}
                    name="is_available"
                    id="availableCheckbox"
                    type="checkbox"
                    className="form-check-input"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="availableCheckbox"
                  >
                    Available
                  </label>
                </div>
              </div>
              <button
                type="submit"
                disabled={isExecutingRequest}
                className="btn btn-primary mt-2"
              >
                {productOperation === "add" ? "Add Product" : "Save Changes"}
              </button>
            </form>
          </div>
        </div>

        <h4>Product List</h4>
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr className="text-center">
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {products.map((product) => (
              <tr key={product?.id}>
                <td>
                  {product?.image && (
                    <img
                      src={product?.image}
                      alt={product?.name}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </td>
                <td>{product?.name}</td>
                <td>
                  {product?.description?.length > 100
                    ? `${product.description.substring(0, 100)}...`
                    : product.description}
                </td>
                <td>&#8369;{product?.price}</td>
                <td>{product?.category}</td>
                <td>
                  {product?.is_available ? (
                    <i className="bi bi-check-circle-fill text-success"></i>
                  ) : (
                    <i className="bi bi-x-circle-fill text-danger"></i>
                  )}
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-warning btn-sm">
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteProduct(product?.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <MyToast />
    </div>
  );
};

export default OwnResto;
