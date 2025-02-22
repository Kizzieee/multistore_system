import { useState } from "react";
import defaultProfile from "../Assets/default_profile.jpg";
import Account_Purchase_History from "./Account_Purchase_History";
import Store_Creation from "../Store/Store_Creation";
import "../style.css";

function Account_View() {
  const [activeTab, setActiveTab] = useState("active");

  return (
    <div className="row mt-5">
      <div className="container mt-5">
        <div className=" mb-3 d-flex justify-content-between">
          <div className="col-2 d-flex flex-column align-items-center">
            <div className="profile_picture">
              <img
                src={defaultProfile}
                className="profile_picture_img"
                alt="User's profile"
              />
            </div>
            <h3>@Kizsea</h3>
          </div>

          <div className="col-2 d-flex flex-column align-items-end justify-content-center gap-2">
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
                <h3>Active Tab Content</h3>
                <p>This is the content for the Active tab.</p>
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
    </div>
  );
}

export default Account_View;
