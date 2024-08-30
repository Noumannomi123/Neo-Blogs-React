import { useState, useEffect } from "react";
import { createContext } from "react";
import PropTypes from "prop-types";
const AuthContext = createContext(null);
import axios from "axios";
import API_URL from "../config";
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  // TO-DO: only check once, and store in localStorage or cache to spped up
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(API_URL + "/user/checkAuth", {
          withCredentials: true,
        });
        const data = response.data;
        const authenticated = data.isAuthenticated;
        setLoggedIn(authenticated);
        if (authenticated) {
          console.log("Authenticaed");
        } else {
          console.error("Not authenticated");
          setUser(null);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error while sending authenticating request.");
      }
    };
    checkAuthentication();
  }, [user]);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loggedIn,
        setLoggedIn,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node,
};
export { AuthProvider };
export default AuthContext;
