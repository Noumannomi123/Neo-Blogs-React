import PropTypes from "prop-types";
import lorem from "../assets/lorem.jpg";
const Image = ({ src, alt, height, width, className, styles }) => {
  const handleError = (e) => {
    e.target.src = "https://picsum.photos/seed/picsum/200/300";
  };
  return (
    <div
      style={{
        ...styles,
        width: width,
        height: height,
      }}
    >
      {src == null ? (
        <h3 className="w-100">No Profile Pic</h3>
      ) : (
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
      )}
    </div>
  );
};

Image.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
  styles: PropTypes.object,
};
export default Image;
