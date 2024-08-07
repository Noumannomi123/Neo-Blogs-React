import PropTypes from "prop-types";
import lorem from "../assets/lorem.jpg";
const Image = ({ src, alt, height, width, className }) => {
  const handleError = (e) => {
    e.target.src = lorem;
  };
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
        className={`img-fluid ${className}`}
        src={src}
        alt={alt}
        onError={handleError}
      />
    </div>
  );
};

Image.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
};
export default Image;
