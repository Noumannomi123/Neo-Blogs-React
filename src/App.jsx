import "bootstrap/dist/css/bootstrap.min.css";
import AllPosts from "./Pages/AllPosts";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><h1>Landing Page</h1></>}/>
        <Route path="/posts" element={<AllPosts />} />
      </Routes>
    </Router>
  );
}

export default App;
