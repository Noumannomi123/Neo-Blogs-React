import { useEffect } from "react";
import PropTypes from "prop-types";
import "../styles/Post.css";
import PostImage from "./Image";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import { HStack } from "@chakra-ui/react";
import chat from "../assets/chat.png";
import Likes from "../components/Likes";
import share from "../assets/share.png";
import { useState } from "react";
import axios from "axios";
import API_URL from "../config";
import timeConverter from "../utils/timeConverter";
const Post = ({ id, title, description, image, date, author, index }) => {
  const [comments, setComments] = useState([
    {
      profile_pic: "",
      author: "dummyNouman",
      created_at: "",
      // likes: 0,
      // replies: [],
      content:
        "This is a long comment. Making it long enough to test the overflow behavior. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ]);
  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/blog/comments/${id}`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:");
      }
    };
    getComments();
  }, [id]);
  return (
    <div className="mt-5">
      <div
        className={`row blog-row ${index % 2 !== 0 ? `blog-direction` : ``}`}
      >
        <Link
          to={`/users/posts/${id}`}
          className={`col-lg-2 col-sm-12 col-md-5 img-container`}
        >
          <PostImage
            src={
              image
                ? image
                : `https://fastly.picsum.photos/id/8/5000/3333.jpg?hmac=OeG5ufhPYQBd6Rx1TAldAuF92lhCzAhKQKttGfawWuA`
            }
            alt={`post-image`}
            height={`150px`}
            width={`200px`}
            className={"rounded"}
          />
        </Link>

        <Link
          className="col-lg-10 col-sm-12 col-md-7"
          to={`/users/posts/${id}`}
        >
          <h2 className="fs-4">{title}</h2>
          <HStack spacing={5}>
            <small>{author}</small>
            <small>
              {timeConverter(date)}
            </small>
          </HStack>
          <p className="mt-3">{description}</p>
        </Link>
        {/* Buttons for comments, likes, and shares */}
        <HStack marginTop={5} marginBottom={5} spacing={3}>
          <button
            // onClick={}
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <HStack padding={0} margin={0} spacing={1}>
              <img height={20} width={20} src={chat} alt="comments" />
              <small style={{ marginLeft: 4 }}>{comments.length}</small>
            </HStack>
          </button>
          <Likes blog_id={id} />
          <button
            // onClick={}
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <HStack padding={0} margin={0} spacing={1}>
              <small>
                <img height={20} width={20} src={share} alt="likes" />
              </small>
              <small>Share</small>
            </HStack>
          </button>
        </HStack>
        <Comments comments={comments} setComments={setComments} blog_id={id}/>
      </div>
    </div>
  );
};

Post.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  date: PropTypes.string,
  author: PropTypes.string,
  likes: PropTypes.number,
  index: PropTypes.number,
  comments: PropTypes.arrayOf(PropTypes.string),
};
export default Post;
