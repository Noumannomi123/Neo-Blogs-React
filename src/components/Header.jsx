import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../styles/Header.css";
const Header = () => {
  return (
    <>
      {/* navbar buttons for blogs page */}
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container className="w-auto">
          <Navbar.Brand href="/home">NeoBlogs</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
        <Container className="w-auto" id="options">
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <div className="navButtons"><button className="btn btn-primary navBtn">Home</button></div>
                <div className="navButtons"><button className="btn btn-primary navBtn">About</button></div>
                <div className="navButtons"><button className="btn btn-primary navBtn">Contact</button></div>
                <div className="navButtons"><button className="btn btn-primary navBtn">Login</button></div>
                <div className="navButtons"><button className="btn btn-primary navBtn">Register</button></div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
