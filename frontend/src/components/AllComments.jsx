import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Image from "../components/Image";
import dummyProfile from "../assets/dummyProfile.png";
import { Button, HStack, VStack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import timeConverter from "../utils/timeConverter";

import Replies from "./Replies";
const AllComments = ({
  expanded,
  comments,
  blog_id,
  comment_username,
  canReply = true,
}) => {
  const [showReply, setShowReply] = useState({});
  const user_id = localStorage.getItem("id");
  const navigate = useNavigate();
  const handlShowReply = (replyId) => {
    if (!user_id) {
      navigate("/users/login");
      return;
    }
    setShowReply({ ...showReply, [replyId]: true });
  };
  const handleCancelClick = (replyId) => {
    setShowReply({ ...showReply, [replyId]: false });
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
            <HStack spacing={1}>
              <small>{username}</small>
              {comment_username && (
                <>
                  <small>{`>`}</small>
                  <small>{comment_username}</small>
                </>
              )}
            </HStack>
            <small>{timeConverter(created_at)}</small>
          </HStack>
          {/* comment.text */}
          <p className="w-100">{content}</p>
          {expanded && canReply && (
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
                  onClick={() => {
                    handlShowReply(id);
                  }}
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

          {expanded && canReply && (
            <Replies
              comment={comment}
              post_id={blog_id}
              showReply={showReply}
              setShowReply={() => handlShowReply(id)}
              setHideReply={() => handleCancelClick(id)}
            />
          )}
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
  blog_id: PropTypes.number,
  comment_username: PropTypes.string,
  canReply: PropTypes.bool,
};
export default AllComments;
