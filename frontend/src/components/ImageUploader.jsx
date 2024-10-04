import ImageUploading from "react-images-uploading";
import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/ImageUploader.css";
import Compressor from "compressorjs";
import dummyProfile from "../assets/dummyProfile.png";
const ImageUploader = ({ setTitleImage, images, msg }) => {
  const [image, setImage] = useState(images);
  const compressionQuality = 0.5;

  const onChange = (imageList) => {
    // if (imageList.length === 0) return;
    const image = imageList[0];
    new Compressor(image.file, {
      quality: compressionQuality,
      success: (compressedResult) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const compressedDataURL = reader.result;
          setImage([
            { ...image, file: compressedResult, data_url: compressedDataURL },
          ]);
          setTitleImage([
            { ...image, file: compressedResult, data_url: compressedDataURL },
          ]);
        };
        reader.readAsDataURL(compressedResult);
      },
      error: (err) => {
        console.log("Error compressing image.", err.message);
      },
    });
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
        maxFileSize={1048576} // 1 MB
        resolutionType="ratio"
        imageCompressionQuality={compressionQuality}
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          // TO-FIX
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
                  onClick={() => setImage(dummyProfile)}
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
