import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = ({
  isLoggedIn,
  setIsModalOpen,
  isStoreOwner,
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
      navigate("/");
    }
    if (location.pathname === "/own-resto" && !isStoreOwner) {
      navigate("/account");
    }
  }, [isLoggedIn, isStoreOwner, navigate, setIsModalOpen, location.pathname]);

  return children;
};

export default ProtectedRoute;
