import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../Assets/default_profile.jpg";
import { me } from "../services/userService";
import Store_Creation from "../Store/Store_Creation";
import "../style.css";
import Account_Purchase_History from "./Account_Purchase_History";

function Account_View() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("active");
  const [user, setUser] = useState({
    email: "",
    first_name: "",
    last_name: "",
    birth_date: "",
    address: "",
  });

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const userData = await me();
        setUser(userData);
      } catch (error) {
        navigate("/login");
      }
    }

    fetchUserInfo();
  }, []);

  if (!user.email) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row mb-3 d-flex justify-content-between">
        <div className="col-2 d-flex flex-column align-items-center">
          <div className="profile_picture">
            <img
              src={defaultProfile}
              className="profile_picture_img"
              alt="User's profile"
            />
          </div>
          <h3>{user.email}</h3>
        </div>

        <div className="col-2 d-flex flex-column align-items-end justify-content-center gap-2">
          {/* Cart */}
          <button type="button" className="btn btn-success">
            <i class="bi bi-cart3 pe-2"></i>
            Orders
          </button>

          {/* Create Store */}
          <button
            type="button"
            className="btn border border-success"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i className="bi bi-shop pe-2"></i>
            Create Store
          </button>

          {/* Modal of the Create Store */}
          <Store_Creation />
        </div>
      </div>
      <div className="row d-flex">
        <ul className="nav nav-pills flex-column col-2">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "active" ? "active" : ""}`}
              onClick={() => setActiveTab("active")}
            >
              Account Setting
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "link1" ? "active" : ""}`}
              onClick={() => setActiveTab("link1")}
            >
              Past Orders
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "link2" ? "active" : ""}`}
              onClick={() => setActiveTab("link2")}
            >
              Notifications
            </button>
          </li>
        </ul>

        <div className="tab-content mt-3 col-10 border-start">
          {activeTab === "active" && (
            <div className="tab-pane fade show active">
              <h3>Account Information</h3>
              <p>
                <strong>First Name:</strong> {user.first_name} <br />
                <strong>Last Name:</strong> {user.last_name} <br />
                <strong>Birth Date:</strong> {user.birth_date} <br />
                <strong>Address:</strong> {user.address} <br />
              </p>
            </div>
          )}
          {activeTab === "link1" && (
            <div className="tab-pane fade show active">
              {/* Purchase History */}
              <Account_Purchase_History />
            </div>
          )}
          {activeTab === "link2" && (
            <div className="tab-pane fade show active">
              <h3>Link 2 Content</h3>
              <p>This is the content for Link 2.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account_View;
