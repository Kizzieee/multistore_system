import React, { useState } from "react";

const StoreInfo = ({ show, handleClose, storeData, handleSave }) => {
  const [formData, setFormData] = useState({ ...storeData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, logo: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);
    handleClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("modal")) {
      handleClose();
    }
  };

  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
      onClick={handleBackdropClick}
    >
      <div className="modal-dialog">
        <div className="modal-dialog">
          <div className="modal-content text-dark   ">
            <div className="modal-header">
              <h5 className="modal-title">Edit Store Info</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row d-flex flex-row">
                  <div className="mb-3 col-6">
                    <label className="form-label">Store Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-6">
                    <label className="form-label">Upload Store Logo</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <div className="row d-flex flex-row">
                  <div className="mb-3 col-6">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-6 mb-3">
                    <label className="form-label">Mobile Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row d-flex flex-row">
                  <div className="col-4 mb-3">
                    <label className="form-label">Operating Hours</label>
                    <input
                      type="text"
                      className="form-control"
                      name="operatingHours"
                      value={formData.operatingHours}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-8 mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;
