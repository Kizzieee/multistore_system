import OwnResto from "./OwnResto";
import { useNavigate } from "react-router-dom";
import "../style.css";
import { Modal } from "bootstrap";

function Store_Creation() {
  const navigate = useNavigate();

  const handleCreate = () => {
    // Manually hide the modal before navigation
    const modalElement = document.getElementById("exampleModal");
    if (modalElement) {
      const modalInstance = Modal.getInstance(modalElement);
      modalInstance?.hide();
    }
    
    navigate("/own-resto");
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog bg-secondary">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Create Restaurant
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body d-flex flex-column gap-1 justify-content-between">
            <div className="row">
              <div className="col-6 mb-3">
                <label htmlFor="storeName" className="form-label">
                  Store Name
                </label>
                <input type="text" className="form-control" id="storeName" />
              </div>

              <div className="col-6 mb-3">
                <label htmlFor="storeLogo" className="form-label">
                  Upload Store Logo
                </label>
                <input type="file" className="form-control" id="storeLogo" />
              </div>
            </div>

            <div className="row">
              <div className="col-6 mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input type="email" className="form-control" id="email" />
              </div>

              <div className="col-6 mb-3">
                <label htmlFor="mobileNumber" className="form-label">
                  Mobile Number
                </label>
                <input type="number" className="form-control" id="mobileNumber" />
              </div>
            </div>

            <div className="row">
              <div className="col-12 mb-3">
                <label htmlFor="location" className="form-label">
                  Location
                </label>
                <input type="text" className="form-control" id="location" />
              </div>
            </div>

            <div className="row">
              <div className="col-4 mb-3">
                <label htmlFor="operatingHours" className="form-label">
                  Operating Hours
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="operatingHours"
                  placeholder="7:00 AM - 9:00 PM"
                />
              </div>

              <div className="col-8">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="main-btn-outline-primary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="main-btn-primary"
              onClick={handleCreate}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Store_Creation;
