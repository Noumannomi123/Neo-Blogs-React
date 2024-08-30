import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
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
  console.table(blog);
  if (loading) return <Loader />;
  return (
    <>
      <NavBar />
      <div className="blog-container">
        <div className="d-flex flex-column mt-3 px-5">
          <small className="fs-5 mb-1">
            {new Date(blog.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </small>
          <div>
            <h1 className="mb-4">{blog.title}</h1>
          </div>
          <div className="w-100 d-flex align-items-center">
            <Image src={blog.pic} height={`100px`} width={`100px`} className={'rounded-circle'} />
            <h4 className="mx-3 mt-3">{blog.author_name}</h4>
          </div>
          <div className="w-100 d-flex justify-content-center mb-3 mt-2">
            <Image
              src={blog.title_picture}
              alt={`blog-image`}
              height={`250px`}
              width={`300px`}
            />
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: blog.content }}
          className="blog-content px-5"
        />
        <div className="mt-5 border blog-content px-5">
          <h3 className="mx-2">Summary</h3>
          <p className="mx-2">{blog.summary}</p>
        </div>
      </div>
    </>
  );
};

export default Blog;
