import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/Comments.css";
import { VStack, HStack, SkeletonCircle } from "@chakra-ui/react";
import TextAreaAutoSize from "react-textarea-autosize";

import { Button } from "@chakra-ui/react";
import AllComments from "./AllComments";
import MoreComments from "./MoreComments";
import AuthContext from "./AuthContext";
import { useLocation } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";
import { SkeletonText } from "@chakra-ui/react";

const Comments = ({
  comments,
  updateComments,
  loadComments,
  setLoadComments,
  blog_id,
  className,
  getComments,
}) => {
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
      updateComments([response.data, ...comments]);
    } catch (error) {
      console.log("Error adding comment to the database.");
    }
    setNewComment("");
  };
  return (
    <div className={`d-flex justify-content-center ${className}`}>
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
            comments &&
            comments.length > 0 && (
              <AllComments blog_id={blog_id} expanded={expanded} comments={comments} />
            )
          ) : (
            <HStack width={"100%"}>
              <SkeletonCircle alignSelf={"start"} size={"10"} />
              <VStack width={"100%"}>
                <HStack spacing={4} width={"100%"} marginBottom={"10px"}>
                  <SkeletonText
                    animation={"wave"}
                    noOfLines={1}
                    skeletonHeight={2}
                    w={"10%"}
                  />
                  <SkeletonText
                    animation={"wave"}
                    noOfLines={1}
                    skeletonHeight={2}
                    w={"5%"}
                  />
                </HStack>
                <SkeletonText
                  animation={"wave"}
                  noOfLines={2}
                  spacing="4"
                  skeletonHeight={2}
                  w={"100%"}
                />
              </VStack>
            </HStack>
          )}
        </VStack>

        {/* more comments */}
        <MoreComments
          expanded={expanded}
          loadMoreComments={async () => {
            if (comments.length === 1) {
              setLoadComments(!loadComments);
              await getComments();
              setIsExpanded(!expanded);
            } else setIsExpanded(!expanded);
          }}
        />
      </div>
    </div>
  );
};
Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
  updateComments: PropTypes.func,
  blog_id: PropTypes.number,
  loadComments: PropTypes.bool,
  setLoadComments: PropTypes.func,
  className: PropTypes.string,
  getComments: PropTypes.func,
};
export default Comments;
