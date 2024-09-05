import { useState, useEffect } from "react";
import { createContext } from "react";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";
const AuthContext = createContext(null);
import axios from "axios";
import API_URL from "../config";
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cookies, removeCookie] = useCookies([]);
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        if (!cookies.token) {
          setLoggedIn(false);
          setLoading(false);
        }
        const response = await axios.post(
          API_URL,
          {},
          {
            withCredentials: true,
          }
        );
        const data = response.data;
        const authenticated = data.status;
        console.log(data);
        setLoggedIn(authenticated);
        if (authenticated) {
          setUser(data.user);
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
  }, [cookies, removeCookie]);
  const logout = () => {
    removeCookie("token");
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loggedIn,
        setLoggedIn,
        loading,
        logout,
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
