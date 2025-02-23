import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, setIsModalOpen, children }) => {
  const navigate = useNavigate();
  if (!isLoggedIn) {
    setIsModalOpen(true);
    return navigate("/");
  }
  return children;
};

export default ProtectedRoute;
