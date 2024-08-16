import { Button } from "@chakra-ui/react";
import PropTypes from "prop-types";
const MoreComments = ({expanded, setIsExpanded}) => {
  return (
    <>
      <Button
        onClick={() => setIsExpanded(!expanded)}
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
  setIsExpanded: PropTypes.func,
  expanded: PropTypes.bool,
};

export default MoreComments;
