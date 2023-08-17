import React, { useEffect, useState } from "react";
import "./Login.scss";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userService";

const Login = (props) => {
  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");
  const defaultObjValidInput = {
    isValidValueLogin: true,
    isValidPassword: true,
  };
  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  let history = useHistory();

  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      history.push("/");
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateNewAccount = () => {
    history.push("/register");
  };

  const handleLogin = async () => {
    setObjValidInput(defaultObjValidInput);

    if (!valueLogin) {
      toast.error("Please enter email address or phone number");
      setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false });
      return;
    }

    if (!password) {
      toast.error("Please enter your password");
      setObjValidInput({ ...defaultObjValidInput, isValidPassword: false });
      return;
    }

    let res = await loginUser(valueLogin, password);
    if (res && res.data && +res.data.EC === 0) {
      let data = {
        isAuth: true,
        token: "fake token",
      };
      sessionStorage.setItem("account", JSON.stringify(data));
      history.push("/users");
      window.location.reload();
    }
    if (res && res.data && +res.data.EC !== 0) {
      toast.error(res.data.EM);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      handleLogin();
    }
  };

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
              className={
                objValidInput.isValidValueLogin
                  ? "form-control"
                  : "form-control is-invalid"
              }
              value={valueLogin}
              onChange={(e) => setValueLogin(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className={
                objValidInput.isValidPassword
                  ? "form-control"
                  : "form-control is-invalid"
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            <button className="btn btn-primary" onClick={() => handleLogin()}>
              Login
            </button>
            <span className="text-center">
              <a className="forgot-password" href="#">
                Forgot your password?
              </a>
            </span>
            <hr />
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={() => handleCreateNewAccount()}
              >
                Create new account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
