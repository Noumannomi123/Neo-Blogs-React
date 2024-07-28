import { VStack } from "@chakra-ui/react";
import "../styles/Login.css";
import "../components/GoogleSignInButton";
import GoogleSignInButton from "../components/GoogleSignInButton";
const Login = () => {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <VStack className="stack">
        <form className="form-signin">
          <h1 className="h3 mb-3 fw-normal text-center">Login</h1>

          <div className="form-floating mb-4">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              placeholder="Password"
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

export default Login;
