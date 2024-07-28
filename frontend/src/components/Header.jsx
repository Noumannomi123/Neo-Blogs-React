import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../styles/Header.css";
import NavButton from "./NavButton";
const Header = () => {
  return (
    <Navbar expand="lg" className="h-auto bg2">
      <Container className="for-container">
        <Navbar.Brand id="brandName" className="text-light" href="/home">
          NeoBlogs
        </Navbar.Brand>
        <Navbar.Toggle className="options" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ch2">
            <NavButton text={`Home`} address="/home" />
            <NavButton text={`About`} address="/about" />
            <NavButton text={`Contact`} address="/contact" />
            <NavButton text={`Login`} address="/users/login" />
            <NavButton
              text={`Register`}
              bg_visible={true}
              address="/users/register"
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
