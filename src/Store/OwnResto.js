import StoreInfo from "./StoreInfo";
import React, { useState, useEffect } from "react";

const OwnResto = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [product, setProduct] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    category: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);

  // Handle Category CRUD
  const addCategory = () => {
    if (categoryName && !categories.includes(categoryName)) {
      setCategories([...categories, categoryName]);
      setCategoryName("");
    }
  };

  const deleteCategory = (name) => {
    setCategories(categories.filter((c) => c !== name));
    setProducts(products.filter((p) => p.category !== name));
  };

  // Handle Product CRUD
  const addProduct = () => {
    if (product.name && product.price && product.category) {
      if (editingProduct) {
        setProducts(
          products.map((p) =>
            p.id === editingProduct ? { ...product, id: editingProduct } : p
          )
        );
        setEditingProduct(null);
      } else {
        setProducts([
          ...products,
          { ...product, id: Date.now(), popularity: 0 },
        ]);
      }
      setProduct({
        name: "",
        description: "",
        image: "",
        price: "",
        category: "",
      });
    }
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const editProduct = (prod) => {
    setProduct(prod);
    setEditingProduct(prod.id);
  };

  //Store Info Modal
  const [showModal, setShowModal] = useState(false); // Correct state variable

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const storeData = {
    name: "Sample Store",
    email: "store@example.com",
    mobile: "1234567890",
    location: "123 Main Street",
    operatingHours: "9 AM - 9 PM",
    description: "A great store for your needs.",
  };

  const handleSave = (updatedData) => {
    console.log("Updated Store Data:", updatedData);
    setShowModal(false); // Close modal after saving
  };

  // Sort top 4 popular products
  useEffect(() => {
    setPopularProducts(
      [...products].sort((a, b) => b.popularity - a.popularity).slice(0, 4)
    );
  }, [products]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12 resto-name-banner p-0">
          <div className="resto-name-banner-gradient"></div>
          <div className="resto-banner-details d-flex justify-content-between align-items-end">
            <h1>I Love Burger - Aurora Boulevard Cubao</h1>
            <div className="d-flex flex-column justify-content-between align-items-end gap-2">
              <button className="main-btn-primary ">
                <i className="bi bi-border-width"></i> Orders
              </button>
              <button className="white-btn-primary" onClick={handleShow}>
                <i className="bi bi-info-circle"></i> Store Info
              </button>
              <StoreInfo
                show={showModal}
                handleClose={handleClose}
                storeData={storeData}
                handleSave={handleSave}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row my-4">
        <div className="col-md-6">
          <h4>Manage Categories</h4>
          <input
            type="text"
            className="form-control"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <button className="main-btn-primary mt-2" onClick={addCategory}>
            Add Category
          </button>
          <ul className="mt-3 list-category">
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
          </ul>
        </div>
        <div className="col-md-6">
          <h4>Manage Products</h4>
          <input
            type="text"
            className="form-control"
            placeholder="Product Name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Description"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />
          <input
            type="file"
            className="form-control mt-2"
            onChange={(e) =>
              setProduct({
                ...product,
                image: URL.createObjectURL(e.target.files[0]),
              })
            }
          />
          <input
            type="number"
            className="form-control mt-2"
            placeholder="Price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
          <select
            className="form-select mt-2"
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button className="main-btn-primary mt-2" onClick={addProduct}>
            {editingProduct ? "Update Product" : "Add Product"}
          </button>
        </div>
      </div>

      <h4>Product List</h4>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.name}</td>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OwnResto;
