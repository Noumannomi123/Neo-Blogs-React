import { Button } from "@chakra-ui/react";
import PropTypes from "prop-types";
const MoreComments = ({expanded, loadMoreComments}) => {
  return (
    <>
      <Button
        onClick={loadMoreComments}
        fontWeight={"normal"}
        alignSelf={"center"}
        _hover={{
          textDecoration: "underline",
        }}
        style={{ backgroundColor: "inherit" }}
        backgroundColor={"inherit"}
      >
        {expanded ? "Show Less..." : "Show More Comments..."}
      </Button>
    </>
  );
};
MoreComments.propTypes = {
  loadMoreComments: PropTypes.func,
  expanded: PropTypes.bool,
};

export default MoreComments;
