import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import renderErrorMessages from "../errorHelper";
import { activate } from "../services/userService";
import "../style.css";

function AccountActivation({ setIsModalOpen }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const activateAccount = async () => {
      try {
        await activate(searchParams);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    activateAccount();
  }, [searchParams]);

  if (loading && !error) {
    return (
      <div className="full d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const handleClick = () => {
    navigate("/");
    if (!error) setIsModalOpen(true);
  };

  return (
    <div className="full">
      <div className="card d-flex justify-content-center align-items-center m-auto">
        {error ? (
          <i className="bi bi-person-x-fill activation-icon"></i>
        ) : (
          <i className="bi bi-person-check activation-icon"></i>
        )}
        <div className="card-body d-flex flex-column justify-content-center align-items-center">
          <h5>
            {error
              ? renderErrorMessages(error)
              : "Your account has been successfully activated!"}
          </h5>

          {error ? (
            <>
              <p className="card-text">
                You can now log in and start your food journey with us.
              </p>
              <button className="main-btn-primary" onClick={handleClick}>
                Go back to Homepage!
              </button>
            </>
          ) : (
            <>
              <p className="card-text">
                You can now log in and start your food journey with us.
              </p>
              <button className="main-btn-primary" onClick={handleClick}>
                Start your food journey!
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountActivation;
