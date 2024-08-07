import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Loader, { HelperLoader } from "../components/Loader";
import API_URL from "../config";
import NavBar from "../components/NavBar";
import Image from "../components/Image";
import "../styles/Blog.css";
const Blog = () => {
  const [loading, setLoading] = useState(true);
  const { blog_id } = useParams();
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

  if (HelperLoader()) return <Loader />;
  if (loading) return <Loader />;
  return (
    <>
      <NavBar />
      <div className="d-flex flex-column blog-container mt-3">
        <div>
          <h1 className="text-center mb-4">{blog.title}</h1>
        </div>
        <div className="w-100 d-flex justify-content-center mb-3">
          <Image
            src={blog.title_picture}
            alt={`blog-image`}
            height={`150px`}
            width={`200px`}
          />
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: blog.content }}
        style={{
          border: "1px solid #ddd",
          padding: "10px",
          minHeight: "200px",
          margin: "0px 6% 0px 6%",
        }}
      />
      <div className="mt-2 border" style={{ margin: "0px 6% 0px 6%" }}>
        <h3 className="mx-2">Summary</h3>
        <p className="mx-2">{blog.summary}</p>
      </div>
    </>
  );
};

export default Blog;
