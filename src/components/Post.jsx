import PropTypes from "prop-types";
import "../styles/Post.css";
import PostImage from "./PostImage";
const Post = ({ id, title, description, image, date, author }) => {
  return (
    // <div className="row">
    //   <div className="col">
    //     <PostImage src={image} alth="post-image" height={200} width={200} />
    //   </div>
    // </div>
    <div className={`row ${id % 2 !== 0 ? `blog-direction` : ``}`}>
      <div
        className={`col-lg-2 col-sm-12 col-md-5 img-container`}
      >
        <PostImage src={image} alth="post-image" height={200} width={200} />
      </div>
      <div className="col-lg-10 col-sm-12 col-md-7 details">
        <h2>{title}</h2>
        <small>{author}</small>
        <small className="px-3">{date}</small>
        <p className="mt-3">{description}</p>
      </div>
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
