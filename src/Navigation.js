import { faMotorcycle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import {
  default as React,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

import AccountActivation from "./Account/AccountActivation";
import AccountModal from "./Account/AccountModal";
import AccountView from "./Account/AccountView";
import Home from "./Main/Home";
import Restaurant from "./Main/Restaurant";
import ProtectedRoute from "./ProtectedRoute";
import Checkout from "./Store/Checkout";
import DeliveryStatus from "./Store/DeliveryStatus";
import OwnResto from "./Store/OwnResto";

import { GlobalContext } from "./GlobalContext";
import { fetchCart } from "./services/cartService";
import { fetchMyOrders } from "./services/orderService";
import { getAccessToken, getRefreshToken } from "./services/tokenService";
import { me } from "./services/userService";
import OrdersV2 from "./Store/OrdersV2";

function Navigation() {
  const {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    setIsStoreOwner,
    orders,
    setOrders,
    setCart,
    cart,
  } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [justLoggedIn, setJustLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const activeOrders = orders.filter(
    (order) => order?.status !== "Completed" && order?.status !== "Rejected"
  );

  useLayoutEffect(() => {
    const fetchUserAndOrders = async () => {
      try {
        if (!getAccessToken() && !getRefreshToken()) {
          setUser(null);
          setIsLoggedIn(false);
        } else {
          const userData = await me();
          setUser(userData);
          setIsLoggedIn(true);
          const myOrders = await fetchMyOrders();
          setOrders(myOrders);
          const myCart = await fetchCart();
          setCart(myCart);
        }
      } catch (error) {
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndOrders();
  }, [justLoggedIn, setUser, setIsLoggedIn, setOrders, setCart]);

  useEffect(() => {
    if (user) {
      setIsStoreOwner(user.groups?.includes("Store Owner"));
    } else {
      setIsStoreOwner(null);
    }
  }, [user, setIsStoreOwner]);

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
            {activeOrders.length > 0 && (
              <button
                className="delivery-btn bg-white d-flex flex-row align-items-center gap-3"
                type="button"
                onClick={() => setShowOffCanvas(true)}
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
            )}
            {/* Restaurant Link with Cart Badge */}
            {isLoggedIn && (
              <>
                {cart?.cart_item_count === 0 ? (
                  // Render OverlayTrigger only when the cart is empty
                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={
                      <Tooltip id="tooltip-empty-cart">
                        You don't have any items in your cart.
                      </Tooltip>
                    }
                  >
                    <div
                      className="position-relative"
                      style={{ cursor: "pointer" }}
                    >
                      <i className="bi bi-basket3"></i>
                    </div>
                  </OverlayTrigger>
                ) : (
                  // Directly render the cart icon with navigation logic when the cart has items
                  <div
                    className="position-relative"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/restaurant")}
                  >
                    <i className="bi bi-basket3"></i>
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{
                        fontSize: "0.60rem",
                        lineHeight: "1",
                        padding: "0.25em 0.5em",
                      }}
                    >
                      {cart?.cart_item_count || 0}
                    </span>
                  </div>
                )}
              </>
            )}
            {/* Delivery Status Offcanvas */}
            <DeliveryStatus
              showOffCanvas={showOffCanvas}
              setShowOffCanvas={setShowOffCanvas}
            />
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
        <Route
          path="/restaurant"
          element={
            <ProtectedRoute setIsModalOpen={setIsModalOpen}>
              <Restaurant />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute setIsModalOpen={setIsModalOpen}>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/delivery-status"
          element={
            <ProtectedRoute setIsModalOpen={setIsModalOpen}>
              <DeliveryStatus />
            </ProtectedRoute>
          }
        />
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
              {/* <Orders /> */}
              <OrdersV2 />
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
