import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavButton from "./NavButton";
import "../styles/Header.css";
const Header = () => {
  return (
    <div className="w-100 hd">
      <Navbar expand="lg">
        <Navbar.Brand id="brandName" className="text-light mx-3" href="/home">
          NeoBlogs
        </Navbar.Brand>
        <Container className="toggle-container">
          <Navbar.Toggle className="options" aria-controls="basic-navbar-nav" />
        </Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <NavButton text={`Home`} address="/home" />
          <NavButton text={`About`} address="/about" />
          <NavButton text={`Contact`} address="/contact" />
          <NavButton text={`Login`} address="login" />
          <NavButton text={`Register`} bg_visible={true} address="register" />
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
