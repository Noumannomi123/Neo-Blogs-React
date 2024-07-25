import PropTypes from "prop-types";
const PostImage = ({ height, width }) => {
  height = "300px";
  width = "300px";
  return (
    <div
      style={{
        width: width,
        height: height,
      }}
    >
      <img
        style={{
          width: width,
          height: height,
          objectFit: "cover",
        }}
        className="img-fluid"
        src="https://plus.unsplash.com/premium_photo-1680503587331-d8d4f8047393?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8QUl8ZW58MHx8MHx8fDA%3D"
        alt=""
      />
    </div>
  );
};

PostImage.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
};
export default PostImage;
