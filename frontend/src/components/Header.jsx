import Nav from "react-bootstrap/Nav";
import "../styles/Header.css";
import NavButton from "./NavButton";
import axios from "axios";
import API_URL from "../config";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import { useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import useMedia from "use-media";
const Header = () => {
  const navigate = useNavigate();
  const { loggedIn, user } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      await axios.get(API_URL + "/user/logout", {
        withCredentials: true,
      });
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/users/login");
      }
    }
  };
  const isMobile = useMedia({ maxWidth: "1000px" });
  return (
    <div className="for-container">
      <h2 className="text-light fw-normal">
        <a href="/home">NeoBlogs</a>
      </h2>
      {isMobile ? (
        <Dropdown>
          <Dropdown.Toggle className="navMobile" id="dropdown-autoclose-true">
            Home
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href={`/home`}>Home</Dropdown.Item>
            <Dropdown.Item href={`/users/about`}>About</Dropdown.Item>
            <Dropdown.Item href={`/users/contact`}>Contact</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Nav className="mx-5 nav-desktop">
          <NavButton text={`Home`} address="/home" />
          <NavButton text={`About`} address="/about" />
          <NavButton text={`Contact`} address="/contact" />
          {!loggedIn ? (
            <>
              <NavButton text={`Login`} address="/users/login" />
              <NavButton
                text={`Register`}
                bg_visible={true}
                address="/users/register"
              />
            </>
          ) : (
            <div className="d-flex align-items-center">
              <NavButton text={user.email} address="/home" />
              <button onClick={handleLogout} className="btn logout mx-5">
                Logout
              </button>
              <NavButton
                text={`My blogs`}
                address={`/users/${user.id}/myblogs`}
              />
            </div>
          )}
        </Nav>
      )}

      {loggedIn && (
        <Dropdown  className="d-flex align-items-center mx-2">
          <Dropdown.Toggle className="navMobile mx-4" id="dropdown-autoclose-true">More</Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href={`/users/${user.id}/posts/new`}>
              New blog
            </Dropdown.Item>
            <Dropdown.Item href="#">Menu Item</Dropdown.Item>
            <Dropdown.Item href="#">Menu Item</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
};

export default Header;
