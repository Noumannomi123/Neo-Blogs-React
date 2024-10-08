import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Nav from "react-bootstrap/Nav";
import "../styles/Header.css";
import NavButton from "./NavButton";
import axios from "axios";
import API_URL from "../config";
import Dropdown from "react-bootstrap/Dropdown";
import useMedia from "use-media";
import logo from "../assets/logoLarge.png";
import Image from "../components/Image";
import { useEffect } from "react";
import AuthContext from "./AuthContext";
import dummyProfile from "../assets/dummyProfile.png";

const Header = () => {
  const navigate = useNavigate();
  const isMobile = useMedia({ maxWidth: "1200px" });
  const { loggedIn, logout, user } = useContext(AuthContext);

  const [profilePic, setProfilePic] = useState(null);
  const handleLogout = () => {
    logout();
    navigate("/users/login");
  };

  useEffect(() => {
    if (!user) return;
    const getProfilePic = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/user/profile/pic/${user.id}`
        );
        setProfilePic(response.data.pic);
      } catch (error) {
        console.error("Error fetching profile picture:");
      }
    };
    if (loggedIn) getProfilePic();
  }, [user, loggedIn]);
  return (
    <div className="for-container">
      <a href="/home" className="d-flex align-items-center">
        <Image
          className={"border rounded-circle"}
          src={logo}
          height={"30px"}
          width={"30px"}
          alt={"Logo"}
        />
        <div className="mx-2">
          <h2
            style={{ fontSize: "1.5rem", fontFamily: "Pacifico" }}
            className="text-light fw-normal"
          >
            NeoBlogs
          </h2>
        </div>
      </a>

      {isMobile ? (
        <>
          <Dropdown>
            <Dropdown.Toggle className="navMobile" id="dropdown-autoclose-true">
              Home
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item className="navMobileItems" href={`/home`}>
                Home
              </Dropdown.Item>
              <Dropdown.Item className="navMobileItems" href={`/users/about`}>
                About
              </Dropdown.Item>
              <Dropdown.Item className="navMobileItems" href={`/users/contact`}>
                Contact
              </Dropdown.Item>
              {!user ? (
                <>
                  <Dropdown.Item
                    className="navMobileItems"
                    href={`/users/login`}
                  >
                    Login
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="navMobileItems"
                    href={`/users/register`}
                  >
                    Register
                  </Dropdown.Item>
                </>
              ) : (
                <>
                  <Dropdown.Item
                    className="navMobileItems"
                    onClick={() => navigate("/users/${user.id}/profile")}
                  >
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="navMobileItems"
                    onClick={handleLogout}
                  >
                    Logout
                  </Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </>
      ) : (
        <Nav className="mx-5 nav-desktop">
          <NavButton text={`Home`} address="/home" />
          <NavButton text={`About`} address="/about" />
          <NavButton text={`Contact`} address="/contact" />
          {!user ? (
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
              <NavButton
                text={user.email}
                address={`/users/${user.id}/profile`}
              />
              <NavButton
                text={`My blogs`}
                address={`/users/${user.id}/myblogs`}
              />
              <button onClick={handleLogout} className="btn logout mx-2">
                Logout
              </button>
            </div>
          )}
        </Nav>
      )}

      {user && (
        <>
          <Dropdown className="d-flex align-items-center">
            <Dropdown.Toggle
              className="navMobile mx-4"
              id="dropdown-autoclose-true"
            >
              More
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                className="navMobileItems"
                href={`/users/${user.id}/posts/new`}
              >
                New blog
              </Dropdown.Item>
              <Dropdown.Item
                className="navMobileItems"
                href={`/users/${user.id}/myblogs`}
              >
                My Blogs
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {!isMobile && (
            <div className="d-flex align-items-center flex-grow-1 flex-end justify-content-end mx-5">
              <Link to={`/users/${user.id}/profile`}>
                <Image
                  className={"rounded-circle"}
                  src={profilePic || dummyProfile}
                  width={"30px"}
                  height={"30px"}
                />
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Header;
