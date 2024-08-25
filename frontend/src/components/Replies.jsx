import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import API_URL from "../config";
import { Button } from "@chakra-ui/react";
import TextAreaAutoSize from "react-textarea-autosize";
import "../styles/Replies.css";
import dummyProfile from "../assets/dummyProfile.png";
import { VStack, HStack } from "@chakra-ui/react";
import timeConverter from "../utils/timeConverter";
import Image from "./Image";
import AllComments from "./AllComments";
import { SkeletonText, SkeletonCircle } from "@chakra-ui/react";
const Replies = ({
  post_id,
  commentId,
  showReply,
  setShowReply,
  setHideReply,
}) => {
  const [replies, setReplies] = useState(null);
  const [loader, setLoader] = useState(true);
  const [expanded, setExpanded] = useState(false);
  // const [newReply, setNewReply] = useState("");
  // const [loadReplies, setLoadReplies] = useState(false);
  // const handlShowReply = (replyId) => {
  //   setLoadReplies({ ...loadReplies, [replyId]: true });
  // };
  // const handleCancelClick = (replyId) => {
  //   setLoadReplies({ ...loadReplies, [replyId]: false });
  // };
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
                  // onClick={() => handlShowReply(id)}
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
        </VStack>
      </HStack>
    );
  };

  const getComments = async () => {
    if (replies) return;
    try {
      // 19, post_id , 53, commendId
      const response = await axios.get(
        `${API_URL}/user/blog/replies/${commentId}/${post_id}`
      );
      setReplies(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching comments:");
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
              // value={newComment}
              // onChange={(e) => setNewComment(e.target.value)}
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
  setShowReply: PropTypes.func.isRequired,
  setHideReply: PropTypes.func.isRequired,
};
export default Replies;
