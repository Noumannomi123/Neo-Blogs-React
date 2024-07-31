import Nav from "react-bootstrap/Nav";
import "../styles/Header.css";
import NavButton from "./NavButton";
import axios from "axios";
import API_URL from "../config";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import { useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
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
  return (
    <div className="for-container">
      <h2 className="text-light fw-normal">
        <a href="/home">NeoBlogs</a>
      </h2>
      <Nav className="mx-5">
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
          <>
            <NavButton text={user.email} address="/home" />
            <button onClick={handleLogout} className="btn logout">
              Logout
            </button>
          </>
        )}
      </Nav>
      {loggedIn && (
        <Dropdown className="d-inline mx-2">
          <Dropdown.Toggle id="dropdown-autoclose-true">More</Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href={`/users/${user.id}/posts/new`}>New blog</Dropdown.Item>
            <Dropdown.Item href="#">Menu Item</Dropdown.Item>
            <Dropdown.Item href="#">Menu Item</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
};

export default Header;
