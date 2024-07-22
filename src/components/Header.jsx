import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavButton from "./NavButton";
import "../styles/Header.css";
const Header = () => {
  return (
    <div className="w-100 hd">
      <Navbar expand="lg" className="bg-body-tertiary">
        {/* remove this class to check the color effect */}
        <Container className="w-auto">
          <Navbar.Brand href="/home">NeoBlogs</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
        <Container className="w-auto" id="options">
          <Navbar.Collapse id="basic-navbar-nav">
            <NavButton text={`Home`} address="/home" />
            <NavButton text={`About`} address="/about" />
            <NavButton text={`Contact`} address="/contact" />
            <NavButton text={`Login`} address="login" />
            <NavButton text={`Register`} bg_visible={true} address="register" />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
