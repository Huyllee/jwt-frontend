import React, { useState } from "react";
import "./Navbar.scss";
import { Link, NavLink, useLocation, useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../../assets/images/logo.svg";
import { logoutUser } from "../../services/userService";
import { toast } from "react-toastify";

const NavHeader = (props) => {
  const [isShow, setIsShow] = useState(true);
  const { user, logoutContext } = React.useContext(UserContext);
  const location = useLocation();
  const history = useHistory();

  const handleLogout = async () => {
    let data = await logoutUser();
    localStorage.removeItem("jwt");
    logoutContext();

    if (data && data.EC === 0) {
      toast.success("Logout success");
      history.push("/login");
    } else {
      toast.error(data.EM);
    }
  };

  if ((user && user.isAuthenticated === true) || location.pathname === "/") {
    return (
      <>
        {isShow && (
          <div className="nav-header">
            <Navbar expand="lg" className="bg-header">
              <Container>
                <NavLink className="navbar-brand" to="/">
                  <img
                    className="logo-header"
                    src={Logo}
                    width="40"
                    height="40"
                    alt=""
                  ></img>
                  JWT Management
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <NavLink className="nav-link" to="/" exact>
                      Home
                    </NavLink>
                    <NavLink className="nav-link" to="/users" exact>
                      User
                    </NavLink>
                    <NavLink className="nav-link" to="/projects" exact>
                      Project
                    </NavLink>
                    <NavLink className="nav-link" to="/about" exact>
                      About
                    </NavLink>
                  </Nav>
                  <Nav>
                    {user && user.isAuthenticated === true ? (
                      <>
                        <Nav.Item className="nav-link">
                          Welcome {user.account.userName}!
                        </Nav.Item>
                        <NavDropdown title="Settings" id="basic-nav-dropdown">
                          <NavDropdown.Item>Change Password</NavDropdown.Item>

                          <NavDropdown.Divider />
                          <NavDropdown.Item onClick={() => handleLogout()}>
                            Logout
                          </NavDropdown.Item>
                        </NavDropdown>
                      </>
                    ) : (
                      <Link className="nav-link" to="/login">
                        Login
                      </Link>
                    )}
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
        )}
      </>
    );
  } else {
    return <></>;
  }
};

export default NavHeader;
