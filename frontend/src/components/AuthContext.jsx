import { createContext, useState } from "react";
import API_URL from "../config";
import axios from "axios";
import PropTypes from "prop-types";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  // useEffect(() => {
  //   // useEffect only runs when render is finished. so it doesn't cause errors.
  //   handleAuthentication();
  // });
  const handleAuthentication = async () => {
    try {
      const response = await axios.get(API_URL + "/user/checkAuth", {
        withCredentials: true,
      });
      const data = response.data;
      const authenticated = data.isAuthenticated;
      setIsAuthenticated(authenticated);
      // console.log("Setting authenticated to: ", authenticated, data.user);
      if (authenticated) {
        setUser(data.user);
      } else {
        console.error("Not authenticated");
      }
    } catch (error) {
      console.error("Error while sending authenticating request.");
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        handleAuthentication,
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
