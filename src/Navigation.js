import AccountModal from "./Account/AccountModal";
import Home from "./Main/Home";
import Restaurant from "./Main/Restaurant";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./style.css";

function Nagivation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="row m-0">
      <div className="navbar d-flex justify-content-center position-fixed navigation">
        <div className="container m-0">
          <Link to="/" className="nav-item">
            FoodVille
          </Link>
          <div className="d-flex gap-3 justify-content-end align-items-center">
            <button
              type="button"
              class="main-btn-primary"
              onClick={() => setIsModalOpen(true)}
            >
              Log in / Sign up
            </button>

            <Link to="/restaurant" className="nav-item">
              Cart
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
      </Routes>
    </div>
  );
}

export default Nagivation;
