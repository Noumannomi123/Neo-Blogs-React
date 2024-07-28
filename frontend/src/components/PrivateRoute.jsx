import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "./AuthContext";
import { useContext } from "react";
function ProtectedRoute() {
    // Outlet is children routes. That is, the route we want on success.
    const {isAuthhtenticated} = useContext(AuthContext);
  return isAuthhtenticated ? <Outlet /> : <Navigate to="/users/login" />;
}

export default ProtectedRoute;
