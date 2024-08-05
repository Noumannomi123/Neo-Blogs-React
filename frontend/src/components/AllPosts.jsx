import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import { VStack } from "@chakra-ui/react";
import Loader from "./Loader";
import API_URL from "../config";
const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/blog/all`);
        setPosts(response.data);
      } catch (error) {
        console.log("Error reqtrieving blogs.");
      }
    };
    getBlogs();
  }, []);
  if (posts.length === 0) return <Loader />;
  function showPost(post) {
    return (
      <Post
        key={post.id}
        id={post.id}
        title={post.title}
        description={
          post.summary.substring(
            0,
            post.summary.length > 200
              ? 200
              : Math.ceil(post.nummary.length / 2)
          ) + "..."
        }
        image={post.title_picture}
        date={post.created_at}
        author={post.author_id}
      />
    );
  }
  return (
    <VStack spacing={10} marginLeft="10%" marginRight="10%" className="mt-5">
      {posts.map(showPost)}
    </VStack>
  );
};

export default AllPosts;
