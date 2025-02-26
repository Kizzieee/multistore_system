import { Toast } from "bootstrap";
import { useContext, useState } from "react";
import renderErrorMessages from "../errorHelper";
import { GlobalContext } from "../GlobalContext";
import { createStore } from "../services/storeService";
import "../style.css";

function StoreCreation({ setSuccessMessage }) {
  const { setIsStoreOwner } = useContext(GlobalContext);
  const [error, setError] = useState(null);
  const [createStoreForm, setCreateStoreForm] = useState({
    name: "",
    image: null,
    email: "",
    mobile_number: "",
    address: {
      city: "",
      province: "",
    },
    delivery_fee: "",
    description: "",
    opening_time: "",
    closing_time: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createStore(createStoreForm);
      setError(null);
      setSuccessMessage("Store created successfully.");

      const toastEl = document.getElementById("storeCreated");
      if (toastEl) {
        const toast = new Toast(toastEl);
        toast.show();
        setTimeout(() => {
          toast.hide();
        }, 3000);
      }

      setIsStoreOwner(true);
      handleCancel();
    } catch (error) {
      setError(error);
    }
  };

  const handleCreateStoreFormChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];

      setCreateStoreForm({
        ...createStoreForm,
        address: {
          ...createStoreForm.address,
          [addressField]: value,
        },
      });
    } else {
      setCreateStoreForm({
        ...createStoreForm,
        [name]: value,
      });
    }
  };

  const handleCancel = () => {
    setCreateStoreForm((prev) =>
      Object.fromEntries(Object.keys(prev).map((key) => [key, prev[key] ?? ""]))
    );
  };

  return (
    <div
      className="modal fade"
      id="createStoreModal"
      tabIndex="10"
      aria-labelledby="createStoreModalLabel"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="createStoreModalLabel">
              Create Restaurant
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleCancel}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body d-flex flex-column gap-1 justify-content-between">
              <div className="row">
                <div className="col-6 mb-3">
                  <label htmlFor="name" className="form-label">
                    Store Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={createStoreForm?.name}
                    onChange={handleCreateStoreFormChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="image" className="form-label">
                    Upload Store Logo
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept=".jpg, .jpeg, .png"
                    name="image"
                    onChange={(e) =>
                      setCreateStoreForm({
                        ...createStoreForm,
                        image: e.target.files[0],
                      })
                    }
                    className="form-control"
                  />
                  <span className="small">
                    Up to <strong>5MB</strong>
                  </span>
                </div>
              </div>

              <div className="row">
                <div className="col-6 mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={createStoreForm?.email}
                    onChange={handleCreateStoreFormChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-6 mb-3">
                  <label htmlFor="mobile_number" className="form-label">
                    Mobile Number
                  </label>
                  <input
                    type="number"
                    id="mobile_number"
                    name="mobile_number"
                    value={createStoreForm?.mobile_number}
                    onChange={handleCreateStoreFormChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-6 mb-3">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="address.city"
                    value={createStoreForm?.address?.city}
                    onChange={handleCreateStoreFormChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="province" className="form-label">
                    Province
                  </label>
                  <input
                    type="text"
                    id="province"
                    name="address.province"
                    value={createStoreForm?.address?.province}
                    onChange={handleCreateStoreFormChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                Operating Hours:
                <div className="row g-3">
                  <div className="col-md-4">
                    <label htmlFor="opening_time" className="form-label">
                      Opening
                    </label>
                    <input
                      type="time"
                      id="opening_time"
                      name="opening_time"
                      value={createStoreForm?.opening_time}
                      onChange={handleCreateStoreFormChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="closing_time" className="form-label">
                      Closing
                    </label>
                    <input
                      type="time"
                      id="closing_time"
                      name="closing_time"
                      value={createStoreForm?.closing_time}
                      onChange={handleCreateStoreFormChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="delivery_fee" className="form-label">
                      Delivery Fee:
                    </label>
                    <input
                      type="number"
                      id="delivery_fee"
                      name="delivery_fee"
                      value={createStoreForm?.delivery_fee}
                      onChange={handleCreateStoreFormChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="description">Description</label>
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  value={createStoreForm?.description}
                  onChange={handleCreateStoreFormChange}
                  className="form-control"
                  rows="3"
                  required
                />
              </div>
              {error && renderErrorMessages(error)}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StoreCreation;
