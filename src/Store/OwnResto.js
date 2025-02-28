import { Store } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import renderErrorMessages from "../errorHelper";
import MyToast from "../MyToast";
import { fetchMyStore } from "../services/storeService";
import StoreInfo from "./StoreInfo";

const OwnResto = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [showEditRestaurantModal, setShowEditRestaurantModal] = useState(false);
  const [store, setStore] = useState(null);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        setIsLoading(true);
        const storeData = await fetchMyStore();
        setStore(storeData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStoreData();
  }, [setStore]);

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
            <input
              type="text"
              className="form-control"
              placeholder="Enter category name"
              // value={categoryName}
              // onChange={(e) => setCategoryName(e.target.value)}
            />
            <button
              className="main-btn-primary mt-2"
              // onClick={addCategory}
            >
              Add Category
            </button>
            {/* <ul className="mt-3 list-category">
              {categories.map((cat, index) => (
                <li
                  key={index}
                  className="col-12 d-flex justify-content-between align-items-center p-2 border rounded"
                >
                  {cat}{" "}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteCategory(cat)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </li>
              ))}
            </ul> */}
          </div>
          <div className="col-md-6">
            <h4>Manage Products</h4>
            <input
              type="text"
              className="form-control"
              placeholder="Product Name"
              // value={product.name}
              // onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Description"
              // value={product.description}
              // onChange={(e) =>
              //   setProduct({ ...product, description: e.target.value })
              // }
            />
            <input
              type="file"
              className="form-control mt-2"
              // onChange={(e) =>
              //   setProduct({
              //     ...product,
              //     image: URL.createObjectURL(e.target.files[0]),
              //   })
              // }
            />
            <input
              type="number"
              className="form-control mt-2"
              placeholder="Price"
              // value={product.price}
              // onChange={(e) =>
              //   setProduct({ ...product, price: e.target.value })
              // }
            />
            <select
              className="form-select mt-2"
              // value={product.category}
              // onChange={(e) =>
              //   setProduct({ ...product, category: e.target.value })
              // }
            >
              <option value="">Select Category</option>
              {/* {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))} */}
            </select>
            <button
              className="main-btn-primary mt-2"
              // onClick={addProduct}
            >
              {/* {editingProduct ? "Update Product" : "Add Product"} */}
            </button>
          </div>
        </div>

        <h4>Product List</h4>
        {/* <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr className="text-center">
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {products.map((prod) => (
              <tr key={prod.id}>
                <td>
                  {prod.image && (
                    <img
                      src={prod.image}
                      alt={prod.name}
                      width="50"
                      height="50"
                    />
                  )}
                </td>
                <td>{prod.name}</td>
                <td>{prod.description}</td>
                <td>&#8369;{prod.price}</td>
                <td>{prod.category}</td>
                <td>
                  <button
                    className="btn btn-outline-warning btn-sm me-2"
                    onClick={() => editProduct(prod)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteProduct(prod.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      setProducts(
                        products.map((p) =>
                          p.id === prod.id
                            ? { ...p, available: !p.available }
                            : p
                        )
                      )
                    }
                    className={`px-4 py-2 font-semibold rounded-lg ${
                      prod.available
                        ? "main-btn-primary"
                        : "main-btn-outline-primary text-color-main"
                    }`}
                  >
                    {prod.available ? "Available" : "Unavailable"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
      <MyToast />
    </div>
  );
};

export default OwnResto;
