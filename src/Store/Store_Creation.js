import OwnResto from "./OwnResto";
import "../style.css";

function Store_Creation() {
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
              Create Shop
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
                <label for="exampleFormControlInput1" className="form-label">
                  Store Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                />
              </div>

              <div className="col-6 mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Upload Store Logo
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="exampleFormControlInput1"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-6 mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                />
              </div>

              <div className="col-6 mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Mobile Number
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="exampleFormControlInput1"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12 mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-4 mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Operating Hours
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="7:00 AM - 9:00 PM"
                />
              </div>

              <div className="col-8">
                <label>Description</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="button" className="btn btn-primary">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Store_Creation;
