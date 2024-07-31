import { useEffect, useContext } from "react";
import loader from "../assets/loader.png";
import "../styles/Loader.css";
import AuthContext from "./AuthContext";
const Loader = () => {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <img src={loader} alt="loading-image" height={150} width={150} />
    </div>
  );
};
const HelperLoader = () => {
  const { loading } = useContext(AuthContext);
  return loading;
};
export default Loader;
export { HelperLoader };
