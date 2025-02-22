import AccountModal from "./Account/AccountModal";
import Home from "./Main/Home";
import Restaurant from "./Main/Restaurant";
import Checkout from "./Store/Checkout";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./style.css";
import AccountActivation from "./Account/AccountActivation";

function Nagivation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="row m-0">
      <div className="navbar d-flex justify-content-center position-fixed navigation">
        <div className="container m-0">
          <Link to="/" className="nav-item">
            <h4 id="homepage">FoodVille</h4>
          </Link>
          <div className="d-flex gap-3 justify-content-end align-items-center">
            <button
              type="button"
              className="main-btn-primary"
              onClick={() => setIsModalOpen(true)}
            >
              Log in / Sign up
            </button>

            <Link to="/restaurant" className="nav-item">
              <i className="bi bi-basket3"></i>
            </Link>
          </div>
          <AccountModal
            show={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/activation" element={<AccountActivation />} />
      </Routes>
    </div>
  );
}

export default Nagivation;
