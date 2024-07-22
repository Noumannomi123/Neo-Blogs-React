import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
const NavButton = ({ text, bg_visible}) => {
    console.log(bg_visible);
  return (
    <Nav className="me-auto p-1">
      <Button className={`${bg_visible === true ? ``: `navButton`}`} variant="primary" size="sm">
        {text}
      </Button>
    </Nav>
  );
};
NavButton.propTypes = {
  text: PropTypes.string.isRequired,
  bg_visible: PropTypes.bool,
};
export default NavButton;
