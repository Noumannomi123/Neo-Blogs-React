import { useState } from "react";
import Image from "../components/Image";
import dummyProfile from "../assets/dummyProfile.png";
import { Button, HStack, VStack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import timeConverter from "../utils/timeConverter";

import TextAreaAutoSize from "react-textarea-autosize";
import Replies from "./Replies";
const AllComments = ({ expanded, comments }) => {
  const [replyComment, setReplyComment] = useState({});
  const handlReplyComment = (commentId) => {
    setReplyComment({ [commentId]: true });
  };
  const handleCancelClick = (commentId) => {
    setReplyComment({ [commentId]: false });
  };
  const showComment = (comment) => {
    const { id, content, created_at, pic, username } = comment;
    return (
      <HStack key={id} spacing={3} width={"100%"} alignSelf={"flex-start"}>
        <Image
          styles={{ alignSelf: "start", marginTop: "10px" }}
          src={pic || dummyProfile}
          className={`rounded-circle`}
          height={"40px"}
          width={"40px"}
        />
        <VStack width={"100%"}>
          <HStack width={"100%"} spacing={5}>
            {/* comment.author, comment.createdAt */}
            <small>{username}</small>
            <small>{timeConverter(created_at)}</small>
          </HStack>
          {/* comment.text */}
          <p className="w-100">{content}</p>
          {expanded && (
            <HStack alignSelf={"start"} spacing={0}>
              <small>
                <Button
                  fontWeight={"inherit"}
                  backgroundColor={"inherit"}
                  size={"sm"}
                  _hover={{
                    backgroundColor: "rgba(45, 103, 160,0.8)",
                    color: "white",
                  }}
                >
                  Like
                </Button>
              </small>
              <small>
                <Button
                  onClick={() => handlReplyComment(id)}
                  fontWeight={"inherit"}
                  backgroundColor={"inherit"}
                  size={"sm"}
                  _hover={{
                    backgroundColor: "rgba(45, 103, 160,0.8)",
                    color: "white",
                  }}
                >
                  Reply
                </Button>
              </small>
            </HStack>
          )}
          {replyComment[id] && (
            <VStack width={"95%"} marginTop={2} alignSelf={"end"}>
              <TextAreaAutoSize
                className="comment-area w-100 px-2 pt-2 pb-2 shadow-sm bg-white rounded"
                id="comment-field"
                placeholder="Add your reply here..."
                maxRows={3}
              />
              <HStack alignSelf={"end"} spacing={3}>
                <Button
                  onClick={() => handleCancelClick(id)}
                  backgroundColor={"inherit"}
                  size={"sm"}
                  _hover={{
                    backgroundColor: "rgba(45, 103, 160,0.3)",
                    color: "white",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  backgroundColor={`rgba(45, 103, 160,0.8)`}
                  size={"sm"}
                  color={`white`}
                  _hover={{}}
                >
                  Submit
                </Button>
              </HStack>
            </VStack>
          )}
          <Replies id={id}/>
        </VStack>
      </HStack>
    );
  };
  return (
    <>
      {comments.length > 0 && expanded
        ? comments.map(showComment)
        : comments[0].content.length > 80
        ? showComment({
            ...comments[0],
            content: `${comments[0].content.slice(0, 80)}...`,
          })
        : showComment(comments[0])}
    </>
  );
};
AllComments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
  expanded: PropTypes.bool,
};
export default AllComments;
