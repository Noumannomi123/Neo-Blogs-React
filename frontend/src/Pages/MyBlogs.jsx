import { useEffect } from "react";
import { useState } from "react";
import Loader, { HelperLoader } from "../components/Loader";
import "../styles/MyBlogs.css";
import Card from "react-bootstrap/Card";
import lorem from "../assets/logoLarge.png";
import NavBar from "../components/NavBar";
import { useContext } from "react";
import axios from "axios";
import AuthContext from "../components/AuthContext";
import API_URL from "../config";
import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
const MyBlogs = () => {
  const { user } = useContext(AuthContext);
  // const blogs = [
  //   {
  //     id: 1,
  //     date: "2024-01-04",
  //     title: "Exploring the wonders of world.",
  //     titleImage: "4",
  //   },
  //   {
  //     id: 2,
  //     date: "2024-01-04",
  //     title: "Exploring the wonders of world.",
  //     titleImage: "4",
  //   },
  //   {
  //     id: 3,
  //     date: "2024-01-04",
  //     title: "Exploring the wonders of world.",
  //     titleImage: "4",
  //   },
  //   {
  //     id: 4,
  //     date: "2024-01-04",
  //     title: "Exploring the wonders of world.",
  //     titleImage: "4",
  //   },
  //   {
  //     id: 5,
  //     date: "2024-01-04",
  //     title: "Exploring the wonders of world.",
  //     titleImage: "4",
  //   },
  // ];
  const [blogs, setBlogs] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/blog/${user.id}/all`);
        setBlogs(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log("Error reqtrieving blogs.");
      }
    };
    getBlogs();
  }, [user.id]);

  const showBlogs = (blog) => {
    return (
      <Card
        direction="horizontal"
        key={blog.id}
        style={{ width: "15rem", maxHeight: "100%" }}
        className="px-2 blog-card"
      >
        <Card.Img
          variant="top"
          src={blog.title_picture || lorem}
          onError={(e) => (e.target.src = lorem)}
        />
        <Card.Body id={blog.id}>
          <small className="mt-1">{blog.created_at}</small>
          <h4 className="mt-2">{blog.title}</h4>
        </Card.Body>
      </Card>
    );
  };
  if (id != user.id) return <NotFoundPage />;
  if (HelperLoader()) return <Loader />;
  if (loading) return <Loader />;
  return (
    <>
      <NavBar />
      <h1 className="text-center mt-4 fw-normal">Explore your blogs here</h1>
      <div className="d-flex flex-row justify-content-center flex-wrap mx-3 mt-5">
        {blogs.map((blog) => showBlogs(blog))}
      </div>
    </>
  );
};

export default MyBlogs;
