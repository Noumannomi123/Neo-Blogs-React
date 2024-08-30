import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import API_URL from "../config";
import { Button } from "@chakra-ui/react";
import TextAreaAutoSize from "react-textarea-autosize";
import "../styles/Replies.css";
import { VStack, HStack } from "@chakra-ui/react";
import AllComments from "./AllComments";
import { SkeletonText, SkeletonCircle } from "@chakra-ui/react";
const Replies = ({ post_id, commentId, showReply, setHideReply }) => {
  const [replies, setReplies] = useState(null);
  const [loader, setLoader] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [newReply, setNewReply] = useState("");
  const getComments = async () => {
    if (replies) return;
    try {
      const response = await axios.get(
        `${API_URL}/user/blog/replies/${commentId}/${post_id}`
      );
      setReplies(response.data);
    } catch (error) {
      console.error("Error fetching comments:");
    }
  };
  const handleNewReplySubmit = async () => {
    try {
      const result = await axios.post(`${API_URL}/user/blog/reply`, {
        user_id: localStorage.getItem("id"),
        content: newReply,
        post_id: post_id,
        comment_id: commentId,
      });
      // TO-FIX:
      // update current replies
      // console.log(result.data);
      setReplies([result.data, ...replies]);
      setNewReply("");
      setHideReply();
    } catch (error) {
      console.error("Error adding comment to the database.", error.message);
    }
  };
  return (
    <>
      <div className="reply-container">
        {showReply[commentId] && (
          <>
            <TextAreaAutoSize
              className="comment-area w-100 px-2 pt-2 pb-2 shadow-sm bg-white rounded"
              id="comment-field"
              placeholder="Add your reply here..."
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              maxRows={3}
            />
            {/* Cancel and Submit buttons */}
            <Button
              className="mt-3"
              backgroundColor={"transparent"}
              _hover={{ backgroundColor: "rgba(42, 113, 193,0.2)" }}
              size="xs"
              onClick={setHideReply}
            >
              Cancel
            </Button>
            <Button
              className="mt-3 mx-2"
              backgroundColor={"rgba(42, 113, 193,0.65)"}
              color={"white"}
              _hover={{ backgroundColor: "rgba(42, 113, 193,0.50)" }}
              size={"xs"}
              onClick={handleNewReplySubmit}
            >
              Submit
            </Button>
          </>
        )}
      </div>
      {expanded && replies?.length > 0 ? (
        !loader ? (
          <AllComments
            expanded={expanded}
            comments={replies}
            canReply={false}
          />
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
        )
      ) : null}
      {/* <Button onClick={() => getComments()}>Load Replies</Button> */}
      <Button
        onClick={() => {
          setLoader(true);
          getComments();
          setLoader(false);
          setExpanded(!expanded);
        }}
        fontWeight={"normal"}
        alignSelf={"center"}
        _hover={{
          textDecoration: "underline",
        }}
        style={{ backgroundColor: "inherit" }}
        backgroundColor={"inherit"}
      >
        {expanded ? "Hide Replies" : "Show Replies"}
      </Button>
    </>
  );
};
Replies.propTypes = {
  post_id: PropTypes.number.isRequired,
  commentId: PropTypes.number.isRequired,
  showReply: PropTypes.object.isRequired,
  setHideReply: PropTypes.func.isRequired,
};
export default Replies;
