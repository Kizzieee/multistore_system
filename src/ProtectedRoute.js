import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "./GlobalContext";

const ProtectedRoute = ({ setIsModalOpen, children }) => {
  const { user, isLoggedIn, isStoreOwner } = useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user === null && isLoggedIn === null && isStoreOwner === null) {
      return;
    }

    setLoading(false);
    console.log("user", user);
    console.log("isLoggedIn", isLoggedIn);
    console.log("isStoreOwner", isStoreOwner);

    if (!isLoggedIn) {
      navigate("/");
      setIsModalOpen(true);
    }

    if (location.pathname === "/own-resto" && isStoreOwner === false) {
      navigate("/");
    }
  }, [
    user,
    isLoggedIn,
    isStoreOwner,
    navigate,
    setIsModalOpen,
    location.pathname,
  ]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
