import { VStack, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import AllComments from "./AllComments";
import PropTypes from "prop-types";
import axios from "axios";
import API_URL from "../config";
const Replies = ({ id }) => {
  const [replies, setReplies] = useState([]);
  const [loader, setLoader] = useState(true);
  const [expanded, setIsExpanded] = useState(false);
  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/blog/replies/${id}`);
        setReplies(response.data);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching comments:");
      }
    };
    getComments();
  }, [id]);
  if (loader) return <></>;
  return (
    <>
      {replies.length > 0 && (
        <VStack width={"95%"} marginTop={2} alignSelf={"end"}>
          <Button
            position={'relative'}
            variant={"link"}
            onClick={() => setIsExpanded(!expanded)}
            fontWeight={"normal"}
            alignSelf={"center"}
            marginBottom={2}
            _hover={{
              textDecoration: "underline",
            }}
            style={{ backgroundColor: "inherit" }}
            backgroundColor={"inherit"}
          >
            {expanded ? "Hide" : "View"} Replies
          </Button>
          {expanded && <AllComments expanded={false} comments={replies} />}
        </VStack>
      )}
    </>
  );
};
Replies.propTypes = {
  id: PropTypes.number,
};
export default Replies;
