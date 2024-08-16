import PropTypes from "prop-types";
const Image = ({ src, alt, height, width, className, styles }) => {
  return (
    <div
      style={{
        ...styles,
        width: width,
        height: height,
      }}
    >
      {src == null ? (
        <h3 className="w-100">No Pic</h3>
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
