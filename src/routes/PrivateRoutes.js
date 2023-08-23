/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = (props) => {
  const { user } = React.useContext(UserContext);

  let history = useHistory();

  useEffect(() => {
    console.log(user);
    let session = sessionStorage.getItem("account");
    if (!session) {
      history.push("/login");
      window.location.reload();
    }
  }, []);

  return (
    <>
      <Route path={props.path} component={props.component} />
    </>
  );
};

export default PrivateRoutes;
