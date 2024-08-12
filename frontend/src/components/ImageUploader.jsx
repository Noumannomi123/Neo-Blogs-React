import ImageUploading from "react-images-uploading";
import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/ImageUploader.css";
const ImageUploader = ({ setTitleImage, images, msg }) => {
  const [image, setImage] = useState(images);
  const onChange = (imageList) => {
    setImage(imageList);
    setTitleImage(imageList);
  };
  return (
    <div>
      <ImageUploading
        single
        value={image}
        onChange={onChange}
        maxNumber={1}
        dataURLKey="data_url"
        acceptType={["jpg", "png", "gif"]}
        maxFileSize={5242880} // 5 MB
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            {image.length === 0 ? (
              <button
                style={isDragging ? { color: "red" } : null}
                onClick={onImageUpload}
                {...dragProps}
              >
                {msg || `Title Image. Click or Drop here.`}
              </button>
            ) : (
              <>
                <button
                  style={isDragging ? { color: "red" } : null}
                  onClick={() => onImageUpdate(imageList[0])}
                  {...dragProps}
                  className="fw-normal mx-5"
                >
                  {`Update Image. Click or Drop here.`}
                </button>
                <button
                  className="btn btn-light border-dark"
                  onClick={() => onImageRemove(imageList[0])}
                >
                  Remove
                </button>
              </>
            )}
            &nbsp;
          </div>
        )}
      </ImageUploading>
    </div>
  );
};
ImageUploader.propTypes = {
  setTitleImage: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  msg: PropTypes.string,
};
export default ImageUploader;
