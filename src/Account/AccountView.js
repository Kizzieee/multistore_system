import { useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../Assets/default_profile.jpg";
import { logout } from "../services/authService";
import StoreCreation from "../Store/StoreCreation";
import "../style.css";
import AccountPurchaseHistory from "./AccountPurchaseHistory";

function AccountView(props) {
  const { user, setIsLoggedIn } = props;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("active");
  const isStoreOwner = user?.groups?.includes("Store Owner");

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsLoggedIn(false);
  };

  const handleCreateOrViewStore = () => {
    if (isStoreOwner) {
      navigate("/own-resto");
    }
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
              <h3>{user.first_name}</h3>
            </div>

            <div className="col-2 d-flex flex-column align-items-end justify-content-center gap-2">
              <button
                type="button"
                className="btn border btn-success"
                data-bs-toggle="modal"
                data-bs-target="#createStoreModal"
                onClick={handleCreateOrViewStore}
              >
                <i className="bi bi-shop pe-2"></i>
                {isStoreOwner ? "View " : "Create "}
                Restaurant
              </button>
              {/* Modal of the Create Store */}
              <StoreCreation />
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
                      <strong>First Name:</strong> {user.first_name} <br />
                      <strong>Last Name:</strong> {user.last_name} <br />
                      <strong>Birth Date:</strong> {user.birth_date} <br />
                      <strong>Address:</strong> {user.address} <br />
                    </p>
                  </div>
                  <button className="btn btn-danger" onClick={handleLogout}>
                    Log Out
                  </button>
                </>
              )}

              {activeTab === "link1" && (
                <div className="tab-pane fade show active">
                  {/* Purchase History */}
                  <AccountPurchaseHistory />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountView;
