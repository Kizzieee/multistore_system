import { useContext, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../Assets/default_profile.jpg";
import { GlobalContext } from "../GlobalContext";
import { logout } from "../services/authService";
import StoreCreation from "../Store/StoreCreation";
import "../style.css";
import AccountPurchaseHistory from "./AccountPurchaseHistory";

function AccountView() {
  const { setIsLoggedIn, user, setUser, isStoreOwner } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const [toastData, setToastData] = useState({
    severity: "",
    header: "",
    body: "",
    show: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("active");

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setUser(null);
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
                  onClick={() => setShowModal(true)}
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
                setToastData={setToastData}
                showModal={showModal}
                setShowModal={setShowModal}
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
      <div aria-live="polite" aria-atomic="true" style={{ minHeight: "240px" }}>
        <ToastContainer className="p-3" position="top-end">
          <Toast
            onClose={() => setToastData({ ...toastData, show: false })}
            show={toastData.show}
            delay={3000}
            autohide
            className={`bg-${toastData.severity}`}
          >
            <Toast.Header>
              <strong className="me-auto">{toastData.header}</strong>
            </Toast.Header>
            <Toast.Body>{toastData?.body}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </div>
  );
}

export default AccountView;
