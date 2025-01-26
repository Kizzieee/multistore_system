import React, { useState } from "react";
import "../Style.css";

const Account_Purchase_History = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="bg-primary-subtle">
      <ul
        className="nav nav-tabs gap-1"
        id="myTab"
        role="tablist"
      >
        <li className="nav-item col-2" role="presentation">
          <button
            className={`nav-link  ${activeTab === "home" ? "active" : ""}`}
            id="home-tab"
            data-bs-toggle="tab"
            type="button"
            role="tab"
            aria-controls="home"
            aria-selected={activeTab === "home"}
            onClick={() => setActiveTab("home")}
          >
            All
          </button>
        </li>
        <li className="nav-item col-2" role="presentation">
          <button
            className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
            id="profile-tab"
            data-bs-toggle="tab"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
          >
            To Pay
          </button>
        </li>
        <li className="nav-item col-2" role="presentation">
          <button
            className={`nav-link ${activeTab === "contact" ? "active" : ""}`}
            id="contact-tab"
            data-bs-toggle="tab"
            type="button"
            role="tab"
            aria-controls="contact"
            aria-selected={activeTab === "contact"}
            onClick={() => setActiveTab("contact")}
          >
            To Ship
          </button>
        </li>
        <li className="nav-item col-2" role="presentation">
          <button
            className={`nav-link ${activeTab === "contact" ? "active" : ""}`}
            id="contact-tab"
            data-bs-toggle="tab"
            type="button"
            role="tab"
            aria-controls="contact"
            aria-selected={activeTab === "contact"}
            onClick={() => setActiveTab("contact")}
          >
            To Receive
          </button>
        </li>
        <li className="nav-item col-2" role="presentation">
          <button
            className={`nav-link ${activeTab === "contact" ? "active" : ""}`}
            id="contact-tab"
            data-bs-toggle="tab"
            type="button"
            role="tab"
            aria-controls="contact"
            aria-selected={activeTab === "contact"}
            onClick={() => setActiveTab("contact")}
          >
            Complete
          </button>
        </li>

       
      </ul>

      <div className="tab-content" id="myTabContent">
        <div
          className={`tab-pane fade ${
            activeTab === "home" ? "show active" : ""
          }`}
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <p>Content for the Home tab.</p>
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "profile" ? "show active" : ""
          }`}
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <p>Content for the Profile tab.</p>
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "contact" ? "show active" : ""
          }`}
          id="contact"
          role="tabpanel"
          aria-labelledby="contact-tab"
        >
          <p>Content for the Contact tab.</p>
        </div>
      </div>
    </div>
  );
};

export default Account_Purchase_History;
