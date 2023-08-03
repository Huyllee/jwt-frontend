import React, { useEffect, useState } from "react";
import "./Register.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let history = useHistory();

  const handleLogin = () => {
    history.push("/login");
  };

  useEffect(() => {
    // axios.get("http://localhost:8080/api/test-api").then((data) => {
    //   console.log(data);
    // });
  }, []);

  const isValidInputs = () => {
    if (!email || !password || !username || !phone) {
      toast.error("Missing Params is required");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Your password is not the same");
      return false;
    }

    let regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleRegister = () => {
    let userData = { email, username, password, phone, confirmPassword };
    let check = isValidInputs();
    console.log(userData);
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Phone number:</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Re-enter password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter Password"
                className="form-control"
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => handleRegister()}
            >
              Register
            </button>

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
