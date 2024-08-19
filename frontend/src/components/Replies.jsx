import { VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import AllComments from "./AllComments";
import PropTypes from "prop-types";
import axios from "axios";
import API_URL from "../config";
const Replies = ({ id }) => {
  const [replies, setReplies] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/blog/comments/${id}`);
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
    <div>
      <VStack width={"95%"} marginTop={2} alignSelf={"end"}>
        {replies.length > 0 && (
          <AllComments expanded={false} comments={replies} />
        )}
      </VStack>
    </div>
  );
};
Replies.propTypes = {
  id: PropTypes.number,
};
export default Replies;
