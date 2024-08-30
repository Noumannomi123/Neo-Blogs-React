import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { VStack } from "@chakra-ui/react";
import "../styles/Login.css";
import "../components/GoogleSignInButton";
import GoogleSignInButton from "../components/GoogleSignInButton";
import Error from "../components/Error";
import API_URL from "../config";
import { useNavigate } from "react-router-dom";
import mark from "../assets/mark.png";
const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const hanldeSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post(
        API_URL + "/user/register",
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
      navigate("/home");
    } catch (error) {
      if (error.response.status === 409) setError("User already exists.");
      else setError("Umable to register at the moment.");
      console.log("Error loggin in.");
    }
  };
  useEffect(() => {
    const timeoutID = setTimeout(() => setError(""), 3000);
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
        <form className="form-signin" onSubmit={hanldeSubmit}>
          <h1 className="h3 mb-3 fw-normal text-center">Sign up</h1>
          <div className="form-floating mb-4">
            <input
              type="text"
              className="form-control"
              id="nameInput"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="floatingInput">Name</label>
          </div>
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
          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control"
              id="confirmPasswordInput"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label htmlFor="confirmPasswordInput">Confirm Password</label>
          </div>
          {error.length > 0 && (
            <Error message={error} clickAction={() => setError("")} />
          )}
          <button className="btn btn-primary py-2" type="submit">
            Next
          </button>
          <button>
            <a href="/users/login">{`Already have an account? Log in`}</a>
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
export default SignUp;
