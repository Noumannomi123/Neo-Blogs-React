import { useContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { VStack } from "@chakra-ui/react";
import "../styles/Login.css";
import "../components/GoogleSignInButton";
import GoogleSignInButton from "../components/GoogleSignInButton";
import Error from "../components/Error";
import API_URL from "../config";
import { useLocation, useNavigate } from "react-router-dom";
import mark from "../assets/mark.png";
import AuthContext from "../components/AuthContext";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser, setLoggedIn } = useContext(AuthContext);
  const location = useLocation();
  const hanldeSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        API_URL + "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setError("");
      }

      // Triggers authContext to update user and loggedIn state
      setUser(response.data.user);
      setLoggedIn(true);
      // TO-FIX:
      // localStorage being accessed.
      // TO-DO
      if (localStorage.getItem("redirectUrl") != null) {
        switch (localStorage.getItem("redirectUrl")) {
          case "/home":
            navigate("/home", { state: location.state });
            break;
          default:
            navigate(localStorage.getItem("redirectUrl"));
            break;
        }
      } else {
        setTimeout(() => navigate("/home"), 500);
      }
    } catch (error) {
      localStorage.setItem("email", null);
      if (error?.response?.status === 401)
        setError("Username or password is incorrect.");
      else setError("Unable to login.");
      console.log("Error logging in.");
    }
  };
  useEffect(() => {
    const timeoutID = setTimeout(() => setError(false), 3000);
    return () => {
      clearTimeout(timeoutID);
    };
  });
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <VStack width={"100%"}>
        <a href="/home">
          <img src={mark} alt="logo" width={50} height={50} />
        </a>

        <form className="form-signin">
          <h1 className="h3 mb-3 fw-normal text-center">Login</h1>

          <div className="form-floating mb-4">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="passwordInput">Password</label>
          </div>
          {/* Error singing */}
          {error.length > 0 && <Error message={error} />}
          <button
            onClick={hanldeSubmit}
            className="btn btn-primary py-2"
            type="submit"
          >
            Sign in
          </button>
          <button>
            <a href="/users/register">{`Don't have an account? Sign up`}</a>
          </button>
          <p className="text-center mt-3">Or</p>
          <GoogleSignInButton />
          <p className="text-center mt-5 text-muted">
            &copy; {new Date().getFullYear()}
          </p>
        </form>
      </VStack>
    </div>
  );
};
export default Login;
