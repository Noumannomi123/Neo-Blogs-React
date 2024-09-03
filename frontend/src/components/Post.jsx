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
import Loader from "./Loader";
import useMedia from "use-media";
const Post = ({ id, title, description, image, date, author, index }) => {
  const [comments, setComments] = useState([]);
  const [loadComments, setLoadComments] = useState(true);
  const [commentsCount, setCommentsCount] = useState(0);
  const isMMobile = useMedia({ maxWidth: "700px" });
  const getComments = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/blog/comments/${id}`);
      setComments(response.data);
      setLoadComments(false);
    } catch (error) {
      console.error("Error fetching comments:");
    }
  };
  useEffect(() => {
    const fetchCommentCount = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/user/blog/comment/count/${id}`
        );
        setCommentsCount(response.data.count);
      } catch (error) {
        console.log("Error fetching comment count");
      }
    };
    fetchCommentCount();
  }, [id]);
  useEffect(() => {
    const fetchSingleComment = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/user/blog/comment/single/${id}`
        );
        setComments(response.data);
        setLoadComments(false);
      } catch (error) {
        console.log("Error fetching single comment");
      }
    };
    fetchSingleComment();
  }, [id]);
  if (commentsCount === 0) return <></>;
  return (
    <div className="mt-5">
      <div
        className={`row blog-row ${index % 2 !== 0 ? `blog-direction` : ``}`}
      >
        <Link
          to={`/users/posts/${id}`}
          className={`col-lg-2 col-sm-12 col-md-4 img-container`}
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
          className="col-lg-10 col-sm-12 col-md-8"
          to={`/users/posts/${id}`}
        >
          <h2 className="fs-4">
            {isMMobile
              ? title.length > 38
                ? `${title.slice(0, 38)}...`
                : title
              : title}
          </h2>
          <HStack spacing={5}>
            <small>{author}</small>
            <small>{timeConverter(date)}</small>
          </HStack>
          <p className="mt-3">{description}</p>
        </Link>
        {/* Buttons for comments, likes, and shares */}
        <HStack marginTop={5} marginBottom={5} spacing={8}>
          <Likes blog_id={id} />
          <button disabled>
            <HStack padding={0} margin={0} spacing={1}>
              <img height={20} width={20} src={chat} alt="comments" />
              <small className="mx-1">{commentsCount}</small>
              <small className="fw-light">Comments</small>
            </HStack>
          </button>

          <button
          // onClick={}
          >
            <HStack padding={0} margin={0} spacing={1}>
              <small className="mx-1">
                <img height={20} width={20} src={share} alt="likes" />
              </small>
              <small className="fw-light">Share</small>
            </HStack>
          </button>
        </HStack>

        <div id="comment-container">
          <Comments
            comments={comments}
            updateComments={setComments}
            loadComments={loadComments}
            setLoadComments={setLoadComments}
            getComments={getComments}
            blog_id={id}
          />
        </div>
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
