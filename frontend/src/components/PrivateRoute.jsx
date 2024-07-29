import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import API_URL from "../config";
import { useContext } from "react";
import AuthContext from "../components/AuthContext";
import Loader from "../components/Loader";
function ProtectedRoute() {
  const { setUser } = useContext(AuthContext);
  // Outlet is children routes. That is, the route we want on success.
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(API_URL + "/user/checkAuth", {
          withCredentials: true,
        });
        const data = response.data;
        const authenticated = data.isAuthenticated;
        setIsAuthenticated(authenticated);
        if (authenticated) {
          console.log("Yeah authenticaed", data.user);
          setUser(data.user);
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
  }, [setUser]);
  if (loading) return <Loader />;
  return isAuthenticated ? <Outlet /> : <Navigate to="/users/login" />;
}

export default ProtectedRoute;
