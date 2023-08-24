import React, { useEffect, useState } from "react";
import { fetchUserAccount } from "../services/userService";

const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState({
    account: {},
    token: "",
    isAuthenticated: false,
  });

  // Login updates the user data with a name parameter
  const loginContext = (userData) => {
    setUser(userData);
  };

  const fetchUser = async () => {
    let res = await fetchUserAccount();
    if (res && res.EC === 0) {
      let groupWithRole = res.DT.groupWithRole;
      let email = res.DT.email;
      let userName = res.DT.userName;
      let token = res.DT.access_token;
      let data = {
        isAuthenticated: true,
        token,
        account: { groupWithRole, email, userName },
      };
      setUser(data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Logout updates the user data to default
  const logout = () => {
    setUser((user) => ({
      name: "",
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
