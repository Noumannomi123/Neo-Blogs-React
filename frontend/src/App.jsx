import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/Home";
import Editor from "./components/Editor";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFoundPage from "./Pages/NotFoundPage";
import NewBlog from "./Pages/NewBlog";
import Login from "./Pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import AuthContext from "./components/AuthContext";
import { useContext, useEffect } from "react";
function App() {
  const { handleAuthentication } = useContext(AuthContext);
  useEffect(() => {
    // useEffect only runs when render is finished. so it doesn't cause errors.
    handleAuthentication();
  });
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Landing Page</h1>} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route element={<PrivateRoute />}>
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
