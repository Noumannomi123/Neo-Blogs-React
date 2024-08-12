import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/Home";
import Editor from "./components/Editor";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFoundPage from "./Pages/NotFoundPage";
import NewBlog from "./Pages/NewBlog";
import Login from "./Pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import SignUp from "./Pages/Register";
import MyBlogs from "./Pages/MyBlogs";
import Blog from "./Pages/Blog";
import EditBlog from "./Pages/EditBlog";
import Profile from "./Pages/Profile";
import GoogleSignInButton from "./components/GoogleSignInButton";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GoogleSignInButton />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/register" element={<SignUp />} />
        <Route path="/Home" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/editor" element={<Editor />} />
          <Route path="/users/:id/posts/new" element={<NewBlog />} />
          <Route path="/users/:id/posts/:blog_id/edit" element={<EditBlog />} />
          <Route path="/users/:id/myblogs" element={<MyBlogs />} />
          <Route path={`/users/:id/profile`} element={<Profile />} />
        </Route>
        <Route path="/users/posts/:blog_id" element={<Blog />} />
        {/*read blog*/}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
