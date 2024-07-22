import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
const NavButton = ({ text, bg_visible, address}) => {
  return (
    <Nav className="me-auto p-1">
      <Nav.Link href={address}>
        <Button
          className={`${bg_visible === true ? `` : `navButton`}`}
          variant="primary"
          size="sm"
        >
          {text}
        </Button>
      </Nav.Link>
    </Nav>
  );
};
NavButton.propTypes = {
  text: PropTypes.string.isRequired,
  bg_visible: PropTypes.bool,
  address: PropTypes.string.isRequired,
};
export default NavButton;
