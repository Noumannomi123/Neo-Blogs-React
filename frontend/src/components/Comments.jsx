import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/Comments.css";
import { VStack, HStack } from "@chakra-ui/react";
import TextAreaAutoSize from "react-textarea-autosize";

import { Button } from "@chakra-ui/react";
import AllComments from "./AllComments";
import MoreComments from "./MoreComments";
import AuthContext from "./AuthContext";
import { useLocation } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";
const Comments = ({ comments, setComments, loadComments, blog_id }) => {
  const [newComment, setNewComment] = useState("");
  const [expanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const { state } = location;
    if (state) {
      const comment = state.comment;
      const id = state.blog_id;
      if (id == blog_id) {
        if (comment) setNewComment(comment);
      }
      // reset state
      navigate(location.pathname, { replace: true });
    }
  }, [location, blog_id, navigate]);
  const { loggedIn } = useContext(AuthContext);
  const handleCommentSubmit = async () => {
    if (!loggedIn) {
      const currentUrl = `${location.pathname}${location.search}${location.hash}`;
      localStorage.setItem("redirectUrl", currentUrl);
      navigate("/users/login", {
        state: { comment: newComment, blog_id: blog_id },
      });
      return;
    }
    try {
      const response = await axios.post(
        `${API_URL}/user/blog/comment/${blog_id}`,
        {
          user_id: localStorage.getItem("id"),
          content: newComment,
        }
      );
      setComments([response.data, ...comments]);
    } catch (error) {
      console.log("Error adding comment to the database.");
    }
    setNewComment("");
  };
  return (
    <div className="d-flex justify-content-center">
      <div className="comment-container">
        <VStack spacing={7}>
          <HStack width={"100%"} spacing={3}>
            <div
              className="rounded-circle"
              style={{ width: "40px", height: "40px" }}
            />
            <div className="w-100">
              <TextAreaAutoSize
                className="comment-area w-100 px-2 pt-2 pb-2 shadow-sm bg-white rounded"
                id="comment-field"
                placeholder="Add your comment here..."
                value={newComment}
                maxRows={3}
                onChange={(e) => setNewComment(e.target.value)}
              />
              {newComment.length > 0 && (
                <Button
                  onClick={handleCommentSubmit}
                  className="border rounded"
                  padding={2}
                  _hover={{ backgroundColor: "#ba83ff", color: "white" }}
                  bgColor={"#f8e5ff"}
                  color={"black"}
                  size="xs"
                >
                  Comment
                </Button>
              )}
            </div>
          </HStack>

          {/* All comments */}
          {!loadComments ? (
            <AllComments expanded={expanded} comments={comments} />
          ) : (
            <p>Loading...</p>
          )}
        </VStack>

        {/* more comments */}
        <MoreComments expanded={expanded} setIsExpanded={setIsExpanded} />
      </div>
    </div>
  );
};
Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
  setComments: PropTypes.func,
  blog_id: PropTypes.number,
  loadComments: PropTypes.bool,
};
export default Comments;
