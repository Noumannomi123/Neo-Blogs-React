import ImageUploading from "react-images-uploading";
import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/ImageUploader.css";
const ImageUploader = ({ setTitleImage, images, msg, canRemove }) => {
  const [image, setImage] = useState(images);
  const compressionQuality = 0.3;
  console.log(image);
  const onChange = (imageList) => {
    if (imageList.length === 0) return;

    const image = imageList[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set canvas dimensions to resize the image
        canvas.width = 250;
        canvas.height = 250;

        // Draw the resized image onto the canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Compress the resized image
        const compressedDataURL = canvas.toDataURL(
          "image/jpeg",
          compressionQuality
        );

        // Convert DataURL back to a Blob (optional)
        canvas.toBlob(
          (compressedBlob) => {
            // Update the state with the resized and compressed image
            setImage([
              { ...image, file: compressedBlob, data_url: compressedDataURL },
            ]);
            setTitleImage([
              { ...image, file: compressedBlob, data_url: compressedDataURL },
            ]);
          },
          "image/jpeg",
          compressionQuality
        );
      };

      // Set the source of the image
      img.src = fileReader.result;
    };

    // Read the image file as a DataURL
    fileReader.readAsDataURL(image.file);
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
                  onClick={() => onImageUpdate(0)}
                  {...dragProps}
                  className="fw-normal mx-5"
                >
                  {`Update Image. Click or Drop here.`}
                </button>
                {canRemove && (
                  <button
                    className="btn btn-light border-dark"
                    onClick={() => {
                      onImageRemove(0);
                      setImage([]);
                      setTitleImage([]);
                      console.log("Removed");
                      console.log(imageList);
                    }}
                  >
                    Remove
                  </button>
                )}
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
  canRemove: PropTypes.bool
};
export default ImageUploader;
