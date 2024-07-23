import "bootstrap/dist/css/bootstrap.min.css";
import AllPosts from "./components/AllPosts";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
        <Route path="/posts" element={<AllPosts />} />
        <Route path="/posts/:id" element={<h1>Single Post</h1>} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
