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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMotorcycle } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Nagivation() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="row m-0">
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

            <button
              className="delivery-btn bg-white d-flex flex-row align-items-center gap-3"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#staticBackdrop"
              aria-controls="staticBackdrop"
            >
              <motion.div
                className="delivery-icon"
                initial={{ x: 0 }}
                animate={{ x: 10, opacity: 0.5 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <FontAwesomeIcon icon={faMotorcycle} size="60" />
              </motion.div>
              <p className="p-0 m-0">Delivery</p>
            </button>
            <DeliveryStatus id="myOffcanvas" />

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
