import React, { useState } from "react";
import api from "../api";
import renderErrorMessages from "../errorHelper";
import "../style.css";

function Account_Login() {
  const [isSignUp, setIsSignUp] = useState(false); // Track whether Sign Up is active
  const [error, setError] = useState(null);
  const [registrationForm, setRegistrationForm] = useState({
    first_name: "",
    last_name: "",
    birth_date: "",
    address: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = async (e) => {
    setRegistrationForm({
      ...registrationForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (registrationForm.password !== registrationForm.confirm_password) {
      setError("Passwords do not match");
      return;
    } else {
      const { confirm_password, ...submitData } = registrationForm;

      try {
        const response = await api.post("/auth/users/", submitData);
        console.log("Server response:", response.data);
        setError(null);
      } catch (error) {
        console.error("Failed to register", error);
        setError(error.response.data);
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
                onChange={handleChange}
                required
                placeholder="John"
                className="form-control"
              />
            </div>
            <div className="mb-2 p-0">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={registrationForm.last_name}
                onChange={handleChange}
                required
                placeholder="Doe"
                className="form-control"
              />
            </div>
            <div className="mb-2 p-0">
              <label htmlFor="birth_date">Date of Birth</label>
              <input
                type="date"
                id="birth_date"
                name="birth_date"
                value={registrationForm.birth_date}
                onChange={handleChange}
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
                onChange={handleChange}
                placeholder="123 Street, City"
                required
                className="form-control"
              />
            </div>
            <div className="mb-2 p-0">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={registrationForm.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                required
                className="form-control"
              />
            </div>
            <div className="mb-2 p-0">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={registrationForm.password}
                onChange={handleChange}
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
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            {error && renderErrorMessages(error)}
            <button type="submit" className="main-btn-primary">
              Sign Up
            </button>
          </>
        ) : (
          <>
            {/* Log In Fields are Uncontrolled (no value prop) */}
            <div className="mb-2 p-0">
              <label htmlFor="inputemailaddress">Email Address</label>
              <input
                type="email"
                id="inputemailaddress"
                className="form-control"
                placeholder="example@mail.com"
                required
              />
            </div>
            <div className="mb-2 p-0">
              <label htmlFor="inputpassword">Password</label>
              <input
                type="password"
                id="inputpassword"
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="main-btn-primary">
              Log In
            </button>
          </>
        )}

        {/* Toggle Button */}
        <div className="text-center my-3">
          <p className="p-0 m-0">or</p>
        </div>
        <button
          type="button"
          className="main-btn-outline-primary"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp
            ? "Already have an account? Log in"
            : "Don't have an account? Sign up"}
        </button>
      </form>
    </div>
  );
}

export default Account_Login;
