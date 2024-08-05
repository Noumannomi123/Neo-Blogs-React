import PropTypes from "prop-types";
import "../styles/Post.css";
import PostImage from "./Image";
import { useContext } from "react";
import AuthContext from "./AuthContext";
import { Link } from "react-router-dom";
const Post = ({ id, title, description, image, date, author }) => {
  const { user } = useContext(AuthContext);
  
  return (
    <div className={`row blog-row ${id % 2 !== 0 ? `blog-direction` : ``}`}>
      <div className={`col-lg-2 col-sm-12 col-md-5 img-container`}>
        <PostImage
          src={
            image
              ? image
              : `https://fastly.picsum.photos/id/8/5000/3333.jpg?hmac=OeG5ufhPYQBd6Rx1TAldAuF92lhCzAhKQKttGfawWuA`
          }
          alt={`post-image`}
          height={`150px`}
          width={`200px`}
        />
      </div>

      <Link
        className="col-lg-10 col-sm-12 col-md-7"
        to={`/users/${user.id}/posts/${id}`}
      >
        <h2 className="fs-4">{title}</h2>
        <small>{author}</small>
        <small className="px-3 text-start">
          {new Date(date).toDateString()}
        </small>
        <p className="mt-3">{description}</p>
      </Link>
    </div>
  );
};

Post.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  date: PropTypes.string,
  author: PropTypes.string,
  likes: PropTypes.number,
  comments: PropTypes.arrayOf(PropTypes.string),
};
export default Post;
