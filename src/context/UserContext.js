import React, { useEffect, useState } from "react";
import { fetchUserAccount } from "../services/userService";

const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const userDefault = {
    isLoading: true,
    account: {},
    token: "",
    isAuthenticated: false,
  };
  const [user, setUser] = useState(userDefault);

  // Login updates the user data with a name parameter
  const loginContext = (userData) => {
    setUser({ ...userData, isLoading: false });
  };

  const fetchUser = async () => {
    let res = await fetchUserAccount();
    if (res && res.EC === 0) {
      let groupWithRole = res.DT.groupWithRole;
      let email = res.DT.email;
      let userName = res.DT.userName;
      let token = res.DT.access_token;
      let data = {
        isLoading: false,
        isAuthenticated: true,
        token,
        account: { groupWithRole, email, userName },
      };
      setUser(data);
    } else {
      setUser({ ...userDefault, isLoading: false });
    }
  };

  useEffect(() => {
    if (
      window.location.pathname !== "/" &&
      window.location.pathname !== "/login"
    ) {
      fetchUser();
    } else {
      setUser({ ...user, isLoading: false });
    }
  }, []);

  // Logout updates the user data to default
  const logoutContext = () => {
    setUser({ ...userDefault, isLoading: false });
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
