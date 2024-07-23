import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../styles/Header.css";
import NavButton from "./NavButton";
const Header = () => {
  return (
    <Navbar expand="lg" className="h-auto bg2">
      <Container className="">
        <Navbar.Brand id="brandName" className="text-light" href="/home">
          NeoBlogs
        </Navbar.Brand>
        <Navbar.Toggle className="options" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ch2">
            <NavButton text={`Home`} address="/home" />
            <NavButton text={`About`} address="/about" />
            <NavButton text={`Contact`} address="/contact" />
            <NavButton text={`Login`} address="login" />
            <NavButton text={`Register`} bg_visible={true} address="register" />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    // <div className="w-100 hd">
    //   <Navbar expand="lg">
    //     <Navbar.Brand id="brandName" className="text-light mx-3" href="/home">
    //       NeoBlogs
    //     </Navbar.Brand>
    //     <Container className="toggle-container">
    //       <Navbar.Toggle className="options" aria-controls="basic-navbar-nav" />
    //     </Container>
    //     <Navbar.Collapse id="basic-navbar-nav">
    // <NavButton text={`Home`} address="/home" />
    // <NavButton text={`About`} address="/about" />
    // <NavButton text={`Contact`} address="/contact" />
    // <NavButton text={`Login`} address="login" />
    // <NavButton text={`Register`} bg_visible={true} address="register" />
    //     </Navbar.Collapse>
    //   </Navbar>
    // </div>
  );
};

export default Header;
