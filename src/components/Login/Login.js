import React from "react";
import "./Login.scss";

const Login = (props) => {
  return (
    <div className="login-container pt-3 pt-md-5">
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
            <input
              type="text"
              placeholder="Email address or phone number"
              className="form-control"
            />
            <input
              type="password"
              placeholder="Password"
              className="form-control"
            />
            <button className="btn btn-primary">Login</button>
            <span className="text-center">
              <a className="forgot-password" href="#">
                Forgot your password?
              </a>
            </span>
            <hr />
            <div className="text-center">
              <button className="btn btn-success">Create new account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
