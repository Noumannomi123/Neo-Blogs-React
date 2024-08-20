import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import API_URL from "../config";
import Comments from "./Comments";
const Replies = ({ post_id, commentId }) => {
  const [replies, setReplies] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const getComments = async () => {
      try {
        // 19, post_id , 53, commendId
        const response = await axios.get(
          `${API_URL}/user/blog/replies/${commentId}`,
          { params: { post_id: post_id } }
        );
        setReplies(response.data);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching comments:");
      }
    };
    getComments();
  }, [post_id, commentId]);
  console.table(replies);
  if (loader) return <></>;
  return (
    <>
      <div className="w-100">
        <Comments
          comments={replies}
          updateComments={setReplies}
          // loadComments={showReplies}
          blog_id={commentId}
        />
      </div>
    </>
  );
};
Replies.propTypes = {
  post_id: PropTypes.number.isRequired,
  showReplies: PropTypes.bool,
  commentId: PropTypes.number.isRequired,
};
export default Replies;
