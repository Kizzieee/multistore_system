import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import {
  default as Account_View,
  default as Account_View,
} from "./Account/Account_View";
import AccountActivation from "./Account/AccountActivation";
import AccountModal from "./Account/AccountModal";
import Home from "./Main/Home";
import Restaurant from "./Main/Restaurant";
import { getAccessToken, getRefreshToken } from "./services/tokenService";
import { me } from "./services/userService";
import Checkout from "./Store/Checkout";
import DeliveryStatus from "./Store/DeliveryStatus";
import Orders from "./Store/Orders";
import OwnResto from "./Store/OwnResto";
import "./style.css";

function Nagivation() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [justLoggedIn, setJustLoggedIn] = useState(false);
  const [user, setUser] = useState({
    email: "",
    first_name: "",
    last_name: "",
    birth_date: "",
    address: "",
  });

  const accountModalProps = {
    isModalOpen,
    setIsModalOpen,
    justLoggedIn,
    setJustLoggedIn,
  };

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        if (getRefreshToken()) {
          const userData = await me();
          setUser(userData);
          setIsLoggedIn((prev) => !prev); // Functional update to avoid dependency issue
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }

    fetchUserInfo();
  }, [justLoggedIn]);

  const handleLoginClickModal = () => {
    if (!isLoggedIn) {
      setIsModalOpen(!isModalOpen);
    } else {
      navigate("/account");
    }
  };

  return (
    <div className="row">
      <div className="navbar d-flex justify-content-center position-fixed navigation">
        <div className="container">
          <Link to="/" className="nav-item">
            <h4 id="homepage">FoodVille</h4>
          </Link>
          <div className="d-flex gap-3 justify-content-end align-items-center">
            <div onClick={handleLoginClickModal}>
              {isLoggedIn ? (
                <div className="user-info" style={{ cursor: "pointer" }}>
                  <span className="user-icon">👤</span>{" "}
                  <span className="user-name">
                    {user.first_name} {user.last_name}
                  </span>
                </div>
              ) : (
                <button type="button" className="main-btn-primary">
                  Log in / Sign up
                </button>
              )}
            </div>

            <Link to="/restaurant" className="nav-item">
              <i className="bi bi-basket3 "></i>
            </Link>
          </div>
          <AccountModal
            show={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            {...accountModalProps}
          />
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/delivery-status" element={ <DeliveryStatus />} /> */}
        <Route
          path="/account"
          element={<Account_View user={user} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/delivery-status" element={<DeliveryStatus />} />
        <Route
          path="/activate"
          element={<AccountActivation setIsModalOpen={setIsModalOpen} />}
        />
        <Route path="/own-resto" element={<OwnResto />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
}

export default Nagivation;
