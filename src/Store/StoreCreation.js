import { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import renderErrorMessages from "../errorHelper";
import { GlobalContext } from "../GlobalContext";
import { createStore } from "../services/storeService";
import "../style.css";

function StoreCreation({ setToastData, showModal, setShowModal }) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsStoreOwner } = useContext(GlobalContext);
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

    setIsLoading(true);
    try {
      await createStore(createStoreForm);
      setError(null);
      setIsStoreOwner(true);
      cleanUpModalForm();
      setToastData({
        severity: "info",
        header: "Success",
        body: "Congratulations! You have created your own restaurant!",
        show: true,
      });
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
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

  const cleanUpModalForm = () => {
    setShowModal(false);
    setCreateStoreForm((prev) =>
      Object.fromEntries(Object.keys(prev).map((key) => [key, prev[key] ?? ""]))
    );
  };

  return (
    <Modal
      show={showModal}
      onHide={cleanUpModalForm}
      keyboard={false}
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="fs-5" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Restaurant
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-column gap-1 justify-content-between">
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
          <Modal.Footer>
            <button
              type="button"
              onClick={cleanUpModalForm}
              className="btn btn-secondary"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default StoreCreation;
