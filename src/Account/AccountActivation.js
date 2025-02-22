import { useNavigate } from "react-router-dom";
import "../style.css";

function AccountActivation() {
  const navigate = useNavigate();
  return (
    <div className="full">
      <div className="card d-flex justify-content-center align-items-center m-auto">
        <i className="bi bi-person-check activation-icon"></i>
        <div className="card-body d-flex flex-column justify-content-center align-items-center">
          <h5>Your account has been successfully activated!</h5>
          <p className="card-text">
            You can now log in and start your food journey with us.
          </p>
          <button className="main-btn-primary" onClick={() => navigate("/")}>
            Start your food journey!
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountActivation;
