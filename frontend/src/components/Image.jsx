import PropTypes from "prop-types";
const Image = ({ src, alt, height, width }) => {
  return (
    <div
      style={{
        width: width  ,
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

Image.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string
};
export default Image;
