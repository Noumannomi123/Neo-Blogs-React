import Loader, { HelperLoader } from "../components/Loader";
import "../styles/MyBlogs.css";
import Card from "react-bootstrap/Card";
import lorem from "../assets/lorem.jpg";
import NavBar from "../components/NavBar";
import { useContext } from "react";
import AuthContext from "../components/AuthContext";
const MyBlogs = () => {
  const { user } = useContext(AuthContext);
  const blogs = [
    {
      id: 1,
      date: "2024-01-04",
      title: "Exploring the wonders of world.",
      titleImage: "4",
    },
    {
      id: 2,
      date: "2024-01-04",
      title: "Exploring the wonders of world.",
      titleImage: "4",
    },
    {
      id: 3,
      date: "2024-01-04",
      title: "Exploring the wonders of world.",
      titleImage: "4",
    },
    {
      id: 4,
      date: "2024-01-04",
      title: "Exploring the wonders of world.",
      titleImage: "4",
    },
    {
      id: 5,
      date: "2024-01-04",
      title: "Exploring the wonders of world.",
      titleImage: "4",
    },
  ];
  const showBlogs = (blog, index) => {
    return (
      <a href={`/users/${user.id}/posts/${blog.id}`}>
        <Card
          direction="horizontal"
          key={index}
          style={{ width: "15rem" }}
          className="px-2 blog-card"
        >
          <Card.Img variant="top" src={lorem} />
          <Card.Body id={index}>
            <small className="mt-1">{blog.date}</small>
            <h4 className="mt-2">{blog.title}</h4>
          </Card.Body>
        </Card>
      </a>
    );
  };
  if (HelperLoader()) return <Loader />;
  return (
    <>
      <NavBar />
      <h1 className="text-center mt-4 fw-normal">Explore your blogs here</h1>
      <div className="d-flex flex-row justify-content-center flex-wrap mx-3 mt-5">
        {blogs.map((blog, index) => showBlogs(blog, index))}
      </div>
    </>

    // <div className="mx-5 mt-3 d-flex">
    //   <BlogCard
    //     date={"2024-01-04"}
    //     title={"Exploring the wonders of world."}
    //     titleImage={"4"}
    //   />
    //   <BlogCard
    //     date={"2024-01-04"}
    //     title={"Exploring the wonders of world."}
    //     titleImage={"4"}
    //   />
    // </div>
  );
};

export default MyBlogs;
