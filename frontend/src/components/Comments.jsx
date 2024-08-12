import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/Comments.css";
import { VStack, HStack } from "@chakra-ui/react";
import TextAreaAutoSize from "react-textarea-autosize";
import Image from "../components/Image";
const Comments = ({ comments }) => {
  const [comment, setComment] = useState("");
  return (
    <div className="d-flex justify-content-center">
      <div className="comment-container">
        <VStack spacing={7}>
          <HStack width={"100%"} spacing={3}>
            <div
              className="rounded-circle"
              style={{ width: "40px", height: "40px" }}
            />
            <TextAreaAutoSize
              className="comment-area w-100 px-2 pt-2 pb-2 shadow-sm bg-white rounded"
              id="comment-field"
              placeholder="Add your comment here..."
              value={comment}
              maxRows={3}
              onChange={(e) => setComment(e.target.value)}
            />
          </HStack>
          <HStack spacing={3} width={"100%"} alignSelf={"flex-start"}>
            <Image
              src={""}
              className={`rounded-circle`}
              height={"40px"}
              width={"40px"}
            />

            <VStack width={"100%"}>
              <HStack></HStack>
              <p className="w-100">{`This is a long comment and i want to be tripple dooted so i want to keep writing still is...`}</p>
            </VStack>
          </HStack>
        </VStack>
      </div>
    </div>
  );
};
Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.string),
};
export default Comments;
