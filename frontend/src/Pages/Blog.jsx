import { useEffect } from "react";
import axios from "axios";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../components/AuthContext";
import Loader, { HelperLoader } from "../components/Loader";
import NotFoundPage from "./NotFoundPage";
import API_URL from "../config";
import NavBar from "../components/NavBar";
import "../styles/Blog.css";
const Blog = () => {
  const [loading, setLoading] = useState(true);
  const { id, blog_id } = useParams();
  const { user } = useContext(AuthContext);
  const [blog, setBlog] = useState();
  useEffect(() => {
    const loadBlog = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/blog/${blog_id}`);
        setBlog(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error loading blog", error);
      }
    };
    loadBlog();
  }, [blog_id]);

  if (user.id != id) return <NotFoundPage />;
  if (HelperLoader()) return <Loader />;
  if (loading) return <Loader />;

  return (
    <>
      <NavBar />
      <div className="vh-100 d-flex flex-column blog-container mt-3">
        <div>
          <h1 className="text-center mb-4">{blog.title}</h1>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: blog.content }}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            minHeight: "200px",
          }}
        />
      </div>
    </>
  );
};

export default Blog;
