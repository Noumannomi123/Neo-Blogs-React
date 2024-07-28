import { Navigate, Outlet } from "react-router-dom";
import PrtpTypes from "prop-types";
function ProtectedRoute({ isAuthhtenticated }) {
    // Outlet is children routes. That is, the route we want on success.
  return isAuthhtenticated ? <Outlet /> : <Navigate to="/users/login" />;
}
ProtectedRoute.propTypes = {
  isAuthhtenticated: PrtpTypes.bool.isRequired,
};

export default ProtectedRoute;
