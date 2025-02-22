import { useState } from "react";
import "../style.css";
import React from "react";

function Account_Login() {
  const [isSignUp, setIsSignUp] = useState(false); // Track whether Sign Up is active

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

      <form className="row d-flex flex-column justify-content-center align-items-center needs-validation">
        {/* Toggle Between Login & Sign Up */}
        {isSignUp ? (
          <>
            <div className="mb-2 p-0">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                id="firstname"
                className="form-control"
                placeholder="John"
                required
              />
            </div>
            <div className="mb-2 p-0">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                id="lastname"
                className="form-control"
                placeholder="Doe"
                required
              />
            </div>
            <div className="mb-2 p-0">
              <label htmlFor="dob">Date of Birth</label>
              <input type="date" id="dob" className="form-control" required />
            </div>
            <div className="mb-2 p-0">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                className="form-control"
                placeholder="123 Street, City"
                required
              />
            </div>
            <div className="mb-2 p-0">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="example@mail.com"
                required
              />
            </div>
            <div className="mb-2 p-0">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                required
              />
            </div>
            <div className="mb-2 p-0">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="main-btn-primary">
              Sign Up
            </button>
          </>
        ) : (
          <>
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
            ? "Already have an acount? Log in"
            : "Don't have an account? Sign up"}
        </button>
      </form>
    </div>
  );
}

export default Account_Login;
