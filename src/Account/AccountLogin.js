import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import renderErrorMessages from "../errorHelper";
import { login, register } from "../services/authService";
import "../style.css";

function AccountLogin(props) {
  const { isModalOpen, setIsModalOpen, justLoggedIn, setJustLoggedIn } = props;
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false); // Track whether Sign Up is active
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [registrationForm, setRegistrationForm] = useState({
    first_name: "",
    last_name: "",
    birth_date: "",
    address: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    setError(null);
    // Reset Registration Form
    setRegistrationForm(
      Object.fromEntries(Object.keys(registrationForm).map((key) => [key, ""]))
    );
    // Reset Login Form
    setLoginForm(
      Object.fromEntries(Object.keys(loginForm).map((key) => [key, ""]))
    );
  };

  const handleLoginFormChange = async (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistrationFormChange = async (e) => {
    setRegistrationForm({
      ...registrationForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (registrationForm.password !== registrationForm.confirm_password) {
        setError("Passwords do not match");
        return;
      } else {
        const { confirm_password, ...submitData } = registrationForm;

        try {
          await register(submitData);
          setError(null);
          setIsSignUp(!isSignUp);
          setRegistrationForm(
            Object.fromEntries(Object.keys(loginForm).map((key) => [key, ""]))
          );
          setSuccess("Please check your email to verify your new account.");
        } catch (error) {
          setError(error);
        }
      }
    } else {
      try {
        setError(null);
        await login(loginForm.email, loginForm.password);
        setLoginForm(
          Object.fromEntries(Object.keys(loginForm).map((key) => [key, ""]))
        );
        navigate("/");
        setIsModalOpen(!isModalOpen);
        setJustLoggedIn(!justLoggedIn);
      } catch (error) {
        setError(error);
      }
    }
  };

  return (
    <div className="container">
      <div className="row mb-4">
        <p className="fw-bold h5 p-0">Local Flavors, Unlimited Choices!</p>
        <p className="p-0">
          {isSignUp
            ? "Sign up to create an account"
            : "Log in or Sign Up to continue"}
        </p>
      </div>

      <form
        className="row d-flex flex-column justify-content-center align-items-center needs-validation"
        onSubmit={handleSubmit}
      >
        {/* Toggle Between Login & Sign Up */}
        {isSignUp ? (
          <>
            <div className="mb-2 p-0">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={registrationForm.first_name}
                onChange={handleRegistrationFormChange}
                required
                placeholder="John"
                className="form-control"
                autoComplete="on"
              />
            </div>
            <div className="mb-2 p-0">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={registrationForm.last_name}
                onChange={handleRegistrationFormChange}
                required
                placeholder="Doe"
                className="form-control"
                autoComplete="on"
              />
            </div>
            <div className="mb-2 p-0">
              <label htmlFor="birth_date">Date of Birth</label>
              <input
                type="date"
                id="birth_date"
                name="birth_date"
                value={registrationForm.birth_date}
                onChange={handleRegistrationFormChange}
                required
                className="form-control"
              />
            </div>
            <div className="mb-2 p-0">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={registrationForm.address}
                onChange={handleRegistrationFormChange}
                placeholder="123 Street, City"
                required
                className="form-control"
                autoComplete="on"
              />
            </div>
            <div className="mb-2 p-0">
              <label htmlFor="mobile_number">Contact Number</label>
              <input
                type="number"
                id="mobile_number"
                name="mobile_number"
                value={registrationForm.mobile_number}
                onChange={handleRegistrationFormChange}
                placeholder="09XXXXXXXXX"
                required
                className="form-control"
                autoComplete="on"
              />
            </div>
            <div className="mb-2 p-0">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={registrationForm.email}
                onChange={handleRegistrationFormChange}
                placeholder="example@domain.com"
                required
                className="form-control"
                autoComplete="on"
              />
            </div>
            <div className="mb-2 p-0">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={registrationForm.password}
                onChange={handleRegistrationFormChange}
                required
                className="form-control"
              />
            </div>
            <div className="mb-2 p-0">
              <label htmlFor="confirm_password">Confirm Password</label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                value={registrationForm.confirm_password}
                onChange={handleRegistrationFormChange}
                required
                className="form-control"
              />
            </div>
            <button type="submit" className="main-btn-primary">
              Sign Up
            </button>
          </>
        ) : (
          <>
            <div className="mb-2 p-0">
              <label htmlFor="login_email">Email Address</label>
              <input
                type="email"
                id="login_email"
                name="email"
                value={loginForm.email}
                onChange={handleLoginFormChange}
                placeholder="example@domain.com"
                required
                className="form-control"
                autoComplete="on"
              />
            </div>
            <div className="mb-2 p-0">
              <label htmlFor="login_password">Password</label>
              <input
                type="password"
                id="login_password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginFormChange}
                required
                className="form-control"
              />
            </div>
            <button type="submit" className="main-btn-primary">
              Log In
            </button>
          </>
        )}
        {error && renderErrorMessages(error)}
        {success && (
          <div className="alert alert-success" role="alert">
            {success}
          </div>
        )}

        {/* Toggle Button */}
        <div className="text-center my-3">
          <p className="p-0 m-0">or</p>
        </div>
        <button
          type="button"
          className="main-btn-outline-primary"
          onClick={handleToggle}
        >
          {isSignUp
            ? "Already have an account? Log in"
            : "Don't have an account? Sign up"}
        </button>
      </form>
    </div>
  );
}

export default AccountLogin;
