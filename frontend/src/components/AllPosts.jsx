import axios from "axios";
import { useEffect, useContext, useState } from "react";
import Post from "../components/Post";
import { VStack } from "@chakra-ui/react";
import Loader, { HelperLoader } from "./Loader";
import API_URL from "../config";
import AuthContext from "../components/AuthContext";
import { Navigate } from "react-router-dom";
const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  // useEffect(() => {
  //   const getBlogs = async () => {
  //     try {
  //       const response = await axios.get(`${API_URL}/user/blog/all`);
  //       setPosts(response.data);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.log("Error reqtrieving blogs.");
  //     }
  //   };
  //   getBlogs();
  // }, [posts]);
  function showPost(post) {
    return (
      <Post
        key={post.id}
        id={post.id}
        title={post.title}
        description={
          post.content.substring(
            0,
            post.description.length > 200
              ? 200
              : Math.ceil(post.description.length / 2)
          ) + "..."
        }
        image={post.title_picture}
        date={post.created_at}
        author={post.author_id}
      />
    );
  }
  if (posts.length === 0) return <Loader />;
  return (
    <VStack spacing={10} marginLeft="15%" marginRight="15%" className="mt-5">
      {posts.map(showPost)}
    </VStack>
  );
};

export default AllPosts;
