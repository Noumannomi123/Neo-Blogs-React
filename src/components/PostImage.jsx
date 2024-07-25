import PropTypes from "prop-types";
const PostImage = ({ src, alt, height, width }) => {
  return (
    <div
      style={{
        width: width,
        height: height,
      }}
    >
      <img
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        className="img-fluid"
        src={src}
        alt={alt}
      />
    </div>
  );
};

PostImage.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
export default PostImage;
