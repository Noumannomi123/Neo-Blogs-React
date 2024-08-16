import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/Comments.css";
import { VStack, HStack } from "@chakra-ui/react";
import TextAreaAutoSize from "react-textarea-autosize";

import { Button } from "@chakra-ui/react";
import AllComments from "./AllComments";
import MoreComments from "./MoreComments";
const Comments = ({ comments }) => {
  const [newComment, setNewComment] = useState("");
  const [expanded, setIsExpanded] = useState(false);
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
          <AllComments expanded={expanded} comments={comments} />
        </VStack>

        {/* more comments */}
        <MoreComments expanded={expanded} setIsExpanded={setIsExpanded} />
      </div>
    </div>
  );
};
Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
};
export default Comments;
