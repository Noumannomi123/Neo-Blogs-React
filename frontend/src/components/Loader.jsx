import { useContext } from "react";
import loader from "../assets/loader.png";
import "../styles/Loader.css";
import AuthContext from "./AuthContext";
import PropTypes from "prop-types";
const Loader = ({children, height = 'vh-100'}) => {
  return (
    <div className={`${height} d-flex flex-column justify-content-center align-items-center`}>
      <img src={loader} alt="loading-image" height={150} width={150} />
      {children}
    </div>
  );
};
Loader.propTypes = {
  children: PropTypes.node,
  height: PropTypes.number,
};
const HelperLoader = () => {
  const { loading } = useContext(AuthContext);
  return loading;
};
export default Loader;
export { HelperLoader };
