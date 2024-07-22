import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavButton from "./NavButton";
import "../styles/Header.css";
const Header = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" >
        <Container className="w-auto">
          <Navbar.Brand href="/home">NeoBlogs</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>

        <Container className="w-auto" id="options">
          <Navbar.Collapse id="basic-navbar-nav">
            <NavButton text={`Home`} />
            <NavButton text={`About`} />
            <NavButton text={`Contact`} />
            <NavButton text={`Login`} />
            <NavButton text={`Register`} bg_visible={true} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
