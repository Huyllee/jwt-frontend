import React from "react";
import "./Register.scss";
import { useHistory } from "react-router-dom";

const Register = (props) => {
  let history = useHistory();

  const handleLogin = () => {
    history.push("/login");
  };

  return (
    <div className="register-container pt-3 pt-md-5">
      <div className="container">
        <div className="row px-3 px-md-0">
          <div className="content-left pt-0 pt-md-5 col-md-7">
            <div className="brand pb-2 text-center text-md-start fs-2 fs-md-1">
              JWT Frontend
            </div>
            <div className="detail d-none d-md-block">
              Learning about jwt backend...
            </div>
          </div>
          <div className="content-right col-md-5 d-flex flex-column gap-3 py-3">
            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                placeholder="Email address"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                placeholder="Username"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Phone number:</label>
              <input
                type="text"
                placeholder="Phone number"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                placeholder="Password"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Re-enter password:</label>
              <input
                type="password"
                placeholder="Re-enter Password"
                className="form-control"
              />
            </div>
            <button className="btn btn-primary">Register</button>

            <hr />
            <div className="text-center">
              <button className="btn btn-success" onClick={() => handleLogin()}>
                Already have an account. Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
