import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { VStack } from "@chakra-ui/react";
import "../styles/Login.css";
import "../components/GoogleSignInButton";
import GoogleSignInButton from "../components/GoogleSignInButton";
import API_URL from "../config";
const Login = ({ checkAuthStatus }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hanldeSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password);
      const response = await axios.post(API_URL + "/user/login", {
        email,
        password,
      });
      console.log(response.data, "returned by server");
      checkAuthStatus();
    } catch (error) {
      console.log("Error loggin in.");
    }
  };
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <VStack className="stack">
        <form className="form-signin" onSubmit={hanldeSubmit}>
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

          <button className="btn btn-primary py-2" type="submit">
            Next
          </button>
          <button>{`Don't have an account? Sign up`} </button>
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
Login.propTypes = {
  checkAuthStatus: PropTypes.func.isRequired,
};
export default Login;
