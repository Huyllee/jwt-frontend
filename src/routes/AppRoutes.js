import React from "react";
import { Switch, Route } from "react-router-dom";
import Users from "../components/ManageUsers/Users";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = (props) => {
  return (
    <>
      <Switch>
        <PrivateRoutes path="/projects" component={Users} />
        <PrivateRoutes path="/users" component={Users} />
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/" exact>
          home
        </Route>
        <Route path="*">404 Not Found</Route>
      </Switch>
    </>
  );
};

export default AppRoutes;