import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/Home";
import Editor from "./components/Editor";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFoundPage from "./Pages/NotFoundPage";
import NewBlog from "./Pages/NewBlog";
import Login from "./Pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import API_URL from "./config";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    // useEffect only runs when render is finished. so it doesn't cause errors.
    hanldeAuthentication();
    console.log("CHECKING");
  });
  const hanldeAuthentication = async () => {
    try {
      const response = await axios.get(API_URL + "/user/login");
      const data = response.data;
      const authenticated = data.isAuthenticated;
      setIsAuthenticated(authenticated);
      if (authenticated) {
        setUser(data.user);
        console.log("Yes authenticated");
        console.log(user);
      } else {
        console.log("Not authenticated");
      }
    } catch (error) {
      console.log("Error while sending authenticating request.");
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Landing Page</h1>} />
        <Route
          path="/users/login"
          element={<Login checkAuthStatus={hanldeAuthentication} />}
        />
        <Route path="/Home" element={<Home />} />
        <Route element={<PrivateRoute isAuthhtenticated={isAuthenticated} />}>
          <Route path="/editor" element={<Editor />} />
          {/* fix ID */}
          <Route path="/users/:id/posts/new" element={<NewBlog />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
