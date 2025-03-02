import { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import renderErrorMessages from "../errorHelper";
import { GlobalContext } from "../GlobalContext";
import { updateStore } from "../services/storeService";

const StoreInfo = ({
  showEditRestaurantModal,
  setShowEditRestaurantModal,
  store,
  setStore,
}) => {
  const { setToastData } = useContext(GlobalContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [updateRestaurantForm, setUpdateRestaurantForm] = useState({
    name: "",
    email: "",
    mobile_number: "",
    delivery_fee: "",
    description: "",
    opening_time: "",
    closing_time: "",
    address: {
      city: "",
      province: "",
    },
    image: null,
    is_live: false,
  });

  useEffect(() => {
    if (showEditRestaurantModal && store) {
      setUpdateRestaurantForm({
        name: store.name || "",
        email: store.email || "",
        mobile_number: store.mobile_number || "",
        delivery_fee: store.delivery_fee || "",
        description: store.description || "",
        opening_time: store.opening_time || "",
        closing_time: store.closing_time || "",
        address: {
          city: store.address?.city || "",
          province: store.address?.province || "",
        },
        image: null,
        is_live: store?.is_live || false,
      });
    }
  }, [showEditRestaurantModal, store]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);
    try {
      const updatedStore = await updateStore(store.id, updateRestaurantForm);
      setStore(updatedStore);
      setToastData({
        severity: "info",
        header: "Success",
        body: "Congratulations! You have successfully updated your restaurant!",
        show: true,
      });
      setShowEditRestaurantModal(false);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const fieldName = name.split(".")[1];
      setUpdateRestaurantForm({
        ...updateRestaurantForm,
        address: {
          ...updateRestaurantForm.address,
          [fieldName]: value,
        },
      });
    } else if (name === "is_live") {
      setUpdateRestaurantForm((prevState) => ({
        ...prevState,
        is_live: e.target.checked,
      }));
    } else {
      setUpdateRestaurantForm({
        ...updateRestaurantForm,
        [name]: value,
      });
    }
  };

  const handleCancel = () => {
    setShowEditRestaurantModal(false);
  };

  return (
    <>
      <Modal
        show={showEditRestaurantModal}
        onHide={handleCancel}
        keyboard="false"
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          className="d-flex justify-content-between align-items-center"
        >
          <Modal.Title id="contained-modal-title-vcenter" className="me-auto">
            Edit Restaurant
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Form.Check
              checked={updateRestaurantForm?.is_live}
              onChange={handleChange}
              name="is_live"
              type="switch"
              label="Live"
            />

            <div className="row">
              <div className="mb-3 col-6">
                <label htmlFor="store_name" className="form-label">
                  Store Name
                </label>
                <input
                  value={updateRestaurantForm.name || ""}
                  onChange={handleChange}
                  name="name"
                  id="store_name"
                  type="text"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3 col-6">
                <label htmlFor="store_image" className="form-label">
                  Upload Store Logo
                </label>
                <input
                  onChange={(e) =>
                    setUpdateRestaurantForm({
                      ...updateRestaurantForm,
                      image: e.target.files[0],
                    })
                  }
                  id="store_image"
                  accept=".jpg, .jpeg, .png"
                  type="file"
                  name="image"
                  className="form-control"
                />
                <span className="small">
                  Up to <strong>5MB</strong>
                </span>
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-6">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  value={updateRestaurantForm.email || ""}
                  onChange={handleChange}
                  name="email"
                  id="email"
                  type="email"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-6 mb-3">
                <label htmlFor="mobile_number" className="form-label">
                  Mobile Number
                </label>
                <input
                  value={updateRestaurantForm.mobile_number || ""}
                  onChange={handleChange}
                  name="mobile_number"
                  id="mobile_number"
                  type="tel"
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
                  value={updateRestaurantForm.address?.city || ""}
                  onChange={handleChange}
                  name="address.city"
                  id="city"
                  type="text"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-6 mb-3">
                <label htmlFor="province" className="form-label">
                  Province
                </label>
                <input
                  value={updateRestaurantForm.address?.province || ""}
                  onChange={handleChange}
                  name="address.province"
                  id="province"
                  type="text"
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
                    value={updateRestaurantForm.opening_time || ""}
                    onChange={handleChange}
                    name="opening_time"
                    id="opening_time"
                    type="time"
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="closing_time" className="form-label">
                    Closing
                  </label>
                  <input
                    value={updateRestaurantForm.closing_time || ""}
                    onChange={handleChange}
                    name="closing_time"
                    id="closing_time"
                    type="time"
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="delivery_fee" className="form-label">
                    Delivery Fee:
                  </label>
                  <input
                    value={updateRestaurantForm.delivery_fee || ""}
                    onChange={handleChange}
                    name="delivery_fee"
                    id="delivery_fee"
                    type="number"
                    className="form-control"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12 mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  value={updateRestaurantForm.description || ""}
                  onChange={handleChange}
                  name="description"
                  id="description"
                  className="form-control"
                  required
                ></textarea>
              </div>
              {error && renderErrorMessages(error)}
            </div>
            <Modal.Footer>
              <button
                onClick={handleCancel}
                type="button"
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                disabled={isLoading}
                type="submit"
                className="btn btn-primary"
              >
                {isLoading ? "Saving Changes..." : "Save Changes"}
              </button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default StoreInfo;
