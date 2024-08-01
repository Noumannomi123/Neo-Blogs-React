import ImageUploading from "react-images-uploading";
import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/ImageUploader.css"
const ImageUploader = ({ setTitleImage }) => {
  const [image, setImage] = useState([]);
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
            <button
              style={isDragging ? { color: "red" } : null}
              onClick={onImageUpload}
              {...dragProps}
            >
              {image.length === 0 && `Title Image. Click or Drop here.`}
            </button>
            &nbsp;
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.data_url} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};
ImageUploader.propTypes = {
  setTitleImage: PropTypes.func.isRequired,
};
export default ImageUploader;
