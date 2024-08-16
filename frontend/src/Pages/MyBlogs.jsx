import { useEffect } from "react";
import { useState } from "react";
import Loader, { HelperLoader } from "../components/Loader";
import "../styles/MyBlogs.css";
import Card from "react-bootstrap/Card";
import lorem from "../assets/logoLarge.png";
import NavBar from "../components/NavBar";

import axios from "axios";

import API_URL from "../config";
import { useNavigate, useParams } from "react-router-dom";
import { HStack } from "@chakra-ui/react";
import NotFoundPage from "./NotFoundPage";
import Image from "../components/Image";
import edit from "../assets/edit.png";
import { Link } from "react-router-dom";
import trash from "../assets/delete.png";
const MyBlogs = () => {
  const user = {
    id: localStorage.getItem("id"),
    email: localStorage.getItem("email"),
  };

  const [blogs, setBlogs] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/blog/${user.id}/all`);
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error reqtrieving blogs.");
      }
    };
    getBlogs();
  }, [user.id]);
  // const [modal, setIsModal] = useState(false);
  const handleBlogDelete = async (blog_id) => {
    // setIsModal(true);
    window.confirm("Are you sure you want to delete this blog?");
    if (!window.confirm) return;
    try {
      await axios.delete(`${API_URL}/user/blog//${blog_id}`);
      setBlogs(blogs.filter((blog) => blog.id != blog_id));
    } catch (error) {
      console.log("Error deleting blog", error);
    }
  };
  const showBlogs = (blog) => {
    return (
      <div className="card-container" key={blog.id}>
        <Link to={`/users/posts/${blog.id}`}>
          <Card
            direction="horizontal"
            style={{ width: "18rem", maxHeight: "90%" }}
            className="mx-2 blog-card"
          >
            <Image
              styles={{ alignSelf: "center" }}
              src={blog.title_picture || lorem}
              width={"265px"}
              height={"150px"}
            />
            <Card.Body>
              <HStack spacing={130}>
                <small className="mt-1">{blog.created_at.slice(0, 10)}</small>
                <HStack>
                  <img
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/users/${user.id}/posts/${blog.id}/edit`);
                    }}
                    height={15}
                    width={15}
                    src={edit}
                    alt="Edit blog"
                  />
                  <img
                    onClick={(e) => {
                      e.preventDefault(); // avoid navigating to parent element. i,e; Link
                      handleBlogDelete(blog.id);
                    }}
                    height={15}
                    width={15}
                    src={trash}
                    alt="Edit blog"
                  />
                </HStack>
              </HStack>

              <p className="mt-2 fw-bold">
                {blog.title.length > 55 ? blog.title.slice(0, 55) + `...` : blog.title}
              </p>
            </Card.Body>
          </Card>
        </Link>
      </div>
    );
  };
  if (id != user.id) return <NotFoundPage />;
  if (HelperLoader()) return <Loader />;
  if (loading) return <Loader />;
  return (
    <>
      <NavBar />
      <h1 className="text-center mt-4 fw-normal">Explore your blogs here</h1>
      {blogs.length === 0 ? (
        <h1 className="text-center mt-5 fw-lighter">No blogs found</h1>
      ) : (
        <div className="d-flex flex-row justify-content-center flex-wrap mx-3 mt-5">
          {blogs.map((blog) => showBlogs(blog))}
        </div>
      )}
    </>
  );
};

export default MyBlogs;
