import PropTypes from "prop-types";
import "../styles/Comments.css";
import { VStack, HStack } from "@chakra-ui/react";
const Comments = ({ comments }) => {
  return (
    <div className="d-flex justify-content-center">
      <div className="comment-container">
        <VStack>
          <HStack>
            <h4>Comments go here.</h4>
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
