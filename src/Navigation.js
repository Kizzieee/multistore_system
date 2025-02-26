import { faMotorcycle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

import AccountActivation from "./Account/AccountActivation";
import AccountModal from "./Account/AccountModal";
import AccountView from "./Account/AccountView";
import Home from "./Main/Home";
import Restaurant from "./Main/Restaurant";
import ProtectedRoute from "./ProtectedRoute";
import Checkout from "./Store/Checkout";
import DeliveryStatus from "./Store/DeliveryStatus";
import Orders from "./Store/Orders";
import OwnResto from "./Store/OwnResto";

import { GlobalContext } from "./GlobalContext";
import { me } from "./services/userService";

function Navigation() {
  const { isLoggedIn, setIsLoggedIn, user, setUser, setIsStoreOwner } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [justLoggedIn, setJustLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch user information
  useLayoutEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await me();
        setUser(userData);
        setIsLoggedIn(true);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [justLoggedIn, setUser, setIsLoggedIn]);

  // Set store owner status based on user info
  useEffect(() => {
    if (user) {
      setIsStoreOwner(user.groups?.includes("Store Owner"));
    } else {
      setIsStoreOwner(false);
    }
  }, [user, setIsStoreOwner]);

  // Handle modal open/close and login navigation
  const handleLoginClickModal = () => {
    if (!isLoggedIn) {
      setIsModalOpen(!isModalOpen);
    } else {
      navigate("/account");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div className="row m-0">
      {/* Navbar */}
      <div className="navbar d-flex justify-content-center position-fixed navigation">
        <div className="container">
          {/* Logo */}
          <Link to="/" className="nav-item">
            <h4 id="homepage">FoodVille</h4>
          </Link>

          <div className="d-flex gap-3 justify-content-end align-items-center">
            {/* Login/Signup Button or User Info */}
            <div onClick={handleLoginClickModal}>
              {isLoggedIn ? (
                <div className="user-info" style={{ cursor: "pointer" }}>
                  <span className="user-icon">👤</span>{" "}
                  <span className="user-name">
                    {user?.first_name} {user?.last_name}
                  </span>
                </div>
              ) : (
                <button type="button" className="main-btn-primary">
                  Log in / Sign up
                </button>
              )}
            </div>

            {/* Delivery Button */}
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

            {/* Restaurant Link */}
            {isLoggedIn && (
              <Link to="/restaurant" className="nav-item">
                <i className="bi bi-basket3"></i>
              </Link>
            )}

            {/* Delivery Status Offcanvas */}
            <DeliveryStatus id="myOffcanvas" />
          </div>

          {/* Account Modal */}
          <AccountModal
            show={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            justLoggedIn={justLoggedIn}
            setJustLoggedIn={setJustLoggedIn}
          />
        </div>
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/delivery-status" element={<DeliveryStatus />} />
        <Route
          path="/activate"
          element={<AccountActivation setIsModalOpen={setIsModalOpen} />}
        />
        <Route
          path="/own-resto"
          element={
            <ProtectedRoute setIsModalOpen={setIsModalOpen}>
              <OwnResto />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute setIsModalOpen={setIsModalOpen}>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute setIsModalOpen={setIsModalOpen}>
              <AccountView />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default Navigation;
