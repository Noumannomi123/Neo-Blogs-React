import { Button } from "@chakra-ui/react";
import PropTypes from "prop-types";
const MoreComments = ({ expanded, loadMoreComments, commentCount }) => {
  return (
    <>
      {commentCount > 2 ? (
        <Button
          onClick={loadMoreComments}
          fontWeight={"medium"}
          alignSelf={"center"}
          _hover={{
            textDecoration: "underline",
            transform: "scale(1.05)",
            transition: "all 0.2s ease-in-out",
          }}
          style={{
            backgroundColor: "transparent",
            color: "#2A71C1",
            padding: "8px 16px",
            margin: "8px 0",
            borderRadius: "20px",
            border: "1px solid #2A71C1",
          }}
          backgroundColor={"transparent"}
        >
          {expanded
            ? "Show Less..."
            : `Show ${commentCount - 1} More Comments...`}
        </Button>
      ) : (
        <Button
          fontWeight={"normal"}
          alignSelf={"center"}
          _hover={{
            textDecoration: "underline",
          }}
          style={{ backgroundColor: "inherit" }}
          backgroundColor={"inherit"}
        >
          {`No More comments`}
        </Button>
      )}
    </>
  );
};
MoreComments.propTypes = {
  loadMoreComments: PropTypes.func,
  expanded: PropTypes.bool,
  commentCount: PropTypes.number,
};

export default MoreComments;
