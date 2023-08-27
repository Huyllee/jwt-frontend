import React, { useState } from "react";
import "./Navbar.scss";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../../assets/images/logo.svg";

const NavHeader = (props) => {
  const [isShow, setIsShow] = useState(true);
  const { user } = React.useContext(UserContext);
  const location = useLocation();

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
                    <Nav.Item className="nav-link">
                      Welcome {user && user.userName ? user.userName : "Guest"}!
                    </Nav.Item>
                    <NavDropdown title="Settings" id="basic-nav-dropdown">
                      <NavDropdown.Item href="#action/3.1">
                        Change Password
                      </NavDropdown.Item>

                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
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
