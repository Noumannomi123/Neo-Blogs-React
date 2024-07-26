import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/Home";
import Editor from "./components/Editor";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFoundPage from "./Pages/NotFoundPage";
import NewBlog from "./Pages/NewBlog";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Landing Page</h1>
            </>
          }
        />
        <Route path="/posts/:id" element={<h1>Single Post</h1>} />
        <Route path="/users/:id/posts/new" element={<NewBlog />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
