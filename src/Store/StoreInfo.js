import React, { useState, useEffect } from "react";

const StoreInfo = ({ show, handleClose, storeData, handleSave }) => {
  const [formData, setFormData] = useState({ ...storeData });

  useEffect(() => {
    if (show) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [show]);

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

  return (
    <>
      {/* Modal Backdrop */}
      {show && <div className="modal-backdrop fade show"></div>}

      {/* Modal */}
      <div
        className={`modal fade ${show ? "show d-block" : ""}`}
        id="StoreInfoEditable"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="storeInfoEditableLabel"
        aria-hidden={!show}
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content text-dark">
            <div className="modal-header">
              <h5 className="modal-title">Edit Store Info</h5>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
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
                <div className="row">
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

                <div className="row">
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
                    className="main-btn-outline-primary"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="main-btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreInfo;
