import { VStack } from "@chakra-ui/react";
import "../styles/Login.css";
const Login = () => {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      {/* login form */}
      <VStack className="stack">
        <form className="form-signin">
          <h1 className="h3 mb-3 fw-normal text-center">Login</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>

          <div className="checkbox mb-3">
            <label className="mt-3">
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="btn btn-primary py-2" type="submit">
            Next
          </button>
          <button>{`Don't have an account? Sign up`} </button>
          <p className="text-center mt-3">OR</p>
          <button className="login">{`Login with Google`}</button>
          <p className="text-center mt-5 text-muted">
            &copy; {new Date().getFullYear()}
          </p>
        </form>
      </VStack>
    </div>
  );
};

export default Login;
