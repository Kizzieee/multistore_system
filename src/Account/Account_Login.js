function Account_Login() {
  return (
    <div>
      <div className="container mt-5">
        <h1 className="text-center">Login</h1>
        <form className="row d-flex flex-column justify-content-center align-items-center needs-validation">
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
          <button type="submit" class="btn btn-dark col-4">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Account_Login;
