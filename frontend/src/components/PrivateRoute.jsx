import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../components/AuthContext";
function ProtectedRoute() {
  const {loggedIn} = useContext(AuthContext);
  // Outlet is children routes. That is, the route we want on success.
  return loggedIn ? <Outlet /> : <Navigate to="/users/login" />;
}

export default ProtectedRoute;
