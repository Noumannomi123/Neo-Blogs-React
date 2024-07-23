import "../styles/Background.css";
import PropTypes from "prop-types";
const Background = ({ children }) => {
  return <div className="bg">{children}</div>;
};
Background.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Background;
