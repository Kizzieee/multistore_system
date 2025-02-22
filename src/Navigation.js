import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import AccountActivation from "./Account/AccountActivation";
import AccountModal from "./Account/AccountModal";
import Home from "./Main/Home";
import Restaurant from "./Main/Restaurant";
import Checkout from "./Store/Checkout";
import "./style.css";
import DeliveryStatus from "./Store/DeliveryStatus";
import Account_View from "./Account/Account_View";
import OwnResto from "./Store/OwnResto";
import Orders from "./Store/Orders";

function Nagivation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="row">
      <div className="navbar d-flex justify-content-center position-fixed navigation">
        <div className="container">
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
              <i className="bi bi-basket3 "></i>
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
        {/* <Route path="/delivery-status" element={ <DeliveryStatus />} /> */}
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/delivery-status" element={<DeliveryStatus />} />
        <Route path="/activate" element={<AccountActivation />} />
        <Route path="/account-view" element={<Account_View />} />
        <Route path="/own-resto" element={<OwnResto />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
}

export default Nagivation;
