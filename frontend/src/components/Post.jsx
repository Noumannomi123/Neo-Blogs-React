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
  const [comments, setComments] = useState([]);
  const [loadComments, setLoadComments] = useState(true);
  const [showComments, setShowComments] = useState(false);
  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/blog/comments/${id}`);
        setComments(response.data);
        setLoadComments(false);
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
            <small>{timeConverter(date)}</small>
          </HStack>
          <p className="mt-3">{description}</p>
        </Link>
        {/* Buttons for comments, likes, and shares */}
        <HStack marginTop={5} marginBottom={5} spacing={8}>
          <Likes blog_id={id} />
          <button
            onClick={() => setShowComments(!showComments)}
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
              <small className="fw-light">Comments</small>
            </HStack>
          </button>

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
              <small className="fw-light">Share</small>
            </HStack>
          </button>
        </HStack>

        {showComments && (
          <div id="comment-container">
            <Comments
              comments={comments}
              setComments={setComments}
              loadComments={loadComments}
              blog_id={id}
            />
          </div>
        )}
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
