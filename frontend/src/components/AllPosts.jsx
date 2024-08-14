import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import Loader from "./Loader";
import API_URL from "../config";
import useMedia from "use-media";
const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const isMobile = useMedia({ maxWidth: "1000px" });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/blog/all`);
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error reqtrieving blogs.");
      }
    };
    getBlogs();
  }, []);

  function showPost(post, index) {
    return (
      <Post
        key={post.id}
        id={post.id}
        title={post.title}
        description={
          post.summary.substring(
            0,
            post.summary.length > 200 ? 200 : Math.ceil(post.nummary.length / 2)
          ) + "..."
        }
        image={post.title_picture}
        date={post.created_at}
        author={post.author_name}
        index={index}
      />
    );
  }
  if (loading) return <Loader />;
  if (posts.length === 0) return <h3>Sorry no blogs to show.</h3>;
  return (
    <div className="d-flex justify-content-center">
      {isMobile ? (
        <div style={{ width: "90%" }}>{posts.map(showPost)}</div>
      ) : (
        <div style={{ width: "75%" }}>{posts.map(showPost)}</div>
      )}
    </div>
  );
};

export default AllPosts;
