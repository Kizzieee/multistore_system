import { useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../Assets/default_profile.jpg";
import { logout } from "../services/authService";
import StoreCreation from "../Store/StoreCreation";
import "../style.css";
import AccountPurchaseHistory from "./AccountPurchaseHistory";

function AccountView(props) {
  const { user, setIsLoggedIn, isStoreOwner, setIsStoreOwner } = props;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("active");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="row mt-5">
      <div className="container mt-5">
        <div className="col-10 m-auto">
          <div className="mb-3 d-flex justify-content-between">
            <div className="col-2 d-flex flex-column align-items-center">
              <div className="profile_picture">
                <img
                  src={defaultProfile}
                  className="profile_picture_img"
                  alt="User's profile"
                />
              </div>
              <h3>{user?.first_name}</h3>
            </div>

            <div className="col-2 d-flex flex-column align-items-end justify-content-center gap-2">
              {!isStoreOwner ? (
                <button
                  type="button"
                  className="btn border btn-success"
                  data-bs-toggle="modal"
                  data-bs-target="#createStoreModal"
                >
                  <i className="bi bi-shop pe-2"></i>Create Restaurant
                </button>
              ) : (
                <button
                  type="button"
                  className="btn border btn-info"
                  onClick={() => {
                    navigate("/own-resto");
                  }}
                >
                  <i className="bi bi-shop pe-2"></i>View Restaurant
                </button>
              )}
              <StoreCreation
                setSuccessMessage={setSuccessMessage}
                setIsStoreOwner={setIsStoreOwner}
              />
            </div>
          </div>

          <div className="row d-flex">
            <ul className="nav nav-pills flex-column col-2">
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "active" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("active")}
                >
                  Account Setting
                </button>
              </li>
              <li className="nav-item" id="orders">
                <button
                  className={`nav-link ${
                    activeTab === "link1" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("link1")}
                >
                  Orders
                </button>
              </li>
            </ul>

            <div className="tab-content mt-3 col-10 border-start">
              {activeTab === "active" && (
                <>
                  <div className="tab-pane fade show active">
                    <h3>Account Information</h3>
                    <p>
                      <strong>First Name:</strong> {user?.first_name} <br />
                      <strong>Last Name:</strong> {user?.last_name} <br />
                      <strong>Birth Date:</strong> {user?.birth_date} <br />
                      <strong>Address:</strong> {user?.address} <br />
                    </p>
                  </div>
                  <button className="btn btn-danger" onClick={handleLogout}>
                    Log Out
                  </button>
                </>
              )}

              {activeTab === "link1" && (
                <div className="tab-pane fade show active">
                  <AccountPurchaseHistory />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Toast Notification */}
      <div className="toast-container position-fixed top-0 end-0 p-3">
        <div
          id="storeCreated"
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style={{
            width: "300px",
            fontSize: "1rem",
            backgroundColor: "rgba(170, 255, 170, 0.8)",
          }}
        >
          <div
            className="toast-header"
            style={{ backgroundColor: "rgba(140, 255, 140, 0.8)" }}
          >
            <strong className="me-auto">Success</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">{successMessage}</div>
        </div>
      </div>
    </div>
  );
}

export default AccountView;
