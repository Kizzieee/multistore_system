function Account_Registration() {
  return (
    <div>
      <div className="container mt-5">
        <h1>Register</h1>
        <form className="row needs-validation">
          <fieldset className="row mb-3">
            <legend>Account Information</legend>
            <div className="mb-2 col-4">
              <label for="inputfirstname">First Name</label>
              <input
                type="text"
                id="inputfirstname"
                className="form-control"
                required
              />
            </div>
            <div className="mb-2 col-4">
              <label for="inputlastname">Last Name</label>
              <input
                type="text"
                id="inputlastname"
                className="form-control"
                required
              />
            </div>
            <div class="mb-2 col-md-4">
              <label for="validationCustomUsername" class="form-label m-0">
                Username
              </label>
              <div class="input-group has-validation">
                <span class="input-group-text" id="inputGroupPrepend">
                  @
                </span>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustomUsername"
                  aria-describedby="inputGroupPrepend"
                  required
                />
                <div class="invalid-feedback">Please choose a username.</div>
              </div>
            </div>
            <div className="mb-2 col-4">
              <label for="inputdateofbirth">Date of Birth</label>
              <input
                type="date"
                id="inputdateofbirth"
                className="form-control"
                required
              />
            </div>
            <div className="mb-2 col-8">
              <label for="inputladdress">Address</label>
              <input
                type="text"
                id="inputladdress"
                className="form-control"
                required
              />
            </div>
          </fieldset>

          <fieldset className="row mb-3">
            <legend>Account Secuirty</legend>

            <div className="mb-2 col-4">
              <label for="inputemailaddress">Email Address</label>
              <input
                type="email"
                id="inputemailaddress"
                className="form-control"
                placeholder="example@mail.com"
                required
              />
            </div>

            <div className="mb-2 col-4">
              <label for="inputpassword">Password</label>
              <input
                type="password"
                id="inputpassword"
                className="form-control"
                required
              />
            </div>

            <div className="mb-2 col-4">
              <label for="inputconfirmpassowrd">Confirm Password</label>
              <input
                type="password"
                id="inputconfirmpassowrd"
                className="form-control"
                required
              />
            </div>
          </fieldset>

          <div className="row">
            <button type="submit" class="btn btn-dark">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Account_Registration;
