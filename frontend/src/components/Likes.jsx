import { useEffect, useState } from "react";
import like from "../assets/like.png";
import { HStack } from "@chakra-ui/react";
import axios from "axios";
import API_URL from "../config";
import PropTypes from "prop-types";
const Likes = ({ blog_id }) => {
  const [likes, setLikes] = useState(0);
  useEffect(() => {
    const getLikes = async () => {
      const res = await axios.get(`${API_URL}/user/blog/likes/${blog_id}`);
      setLikes(res.data);
    };
    getLikes();
  }, [blog_id]);
  const handleLike = async () => {
    const res = await axios.post(`${API_URL}/user/blog/like/${blog_id}`);
    if (res.status === 200) {
      setLikes(likes + 1);
    }
  };
  return (
    <div>
      <button
        onClick={() => handleLike}
        style={{
          border: "none",
          background: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        }}
      >
        <HStack padding={0} margin={0} spacing={1}>
          <small>
            <img height={20} width={20} src={like} alt="likes" />
          </small>
          <small className="mx-1">{likes}</small>
          <small className="fw-light">Likes </small>
        </HStack>
      </button>
    </div>
  );
};
Likes.propTypes = {
  blog_id: PropTypes.number,
};
export default Likes;
