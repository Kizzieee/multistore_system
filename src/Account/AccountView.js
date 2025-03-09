import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../Assets/default_profile.jpg";
import { GlobalContext } from "../GlobalContext";
import MyToast from "../MyToast";
import { logout } from "../services/authService";
import StoreCreation from "../Store/StoreCreation";
import "../style.css";
import AccountPurchaseHistory from "./AccountPurchaseHistory";

function AccountView() {
  const { setIsLoggedIn, user, setUser, isStoreOwner } =
    useContext(GlobalContext);
  const navigate = useNavigate();
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
                    <div id="Account_Information">
                      <div className="row">
                        <div className="col-6">
                          <label for="first_name">First Name:</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder={user?.first_name}
                            disabled
                          />
                        </div>
                        <div className="col-6">
                          <label for="first_name">Last Name:</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder={user?.last_name}
                            disabled
                          />
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-6">
                          <label for="first_name">Birth Date:</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder={user?.birth_date}
                            disabled
                          />
                        </div>
                        <div className="col-6">
                          <label for="first_name">Address:</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder={user?.address}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-danger mt-3" onClick={handleLogout}>
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
      <MyToast />
    </div>
  );
}

export default AccountView;
