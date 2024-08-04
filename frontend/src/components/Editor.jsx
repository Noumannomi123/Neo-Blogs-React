import { useState, useRef, useEffect, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Quill } from "react-quill";
import { ImageActions } from "@xeger/quill-image-actions";
import { ImageFormats } from "@xeger/quill-image-formats";
import DOMPurify from "dompurify";
import Modal from "./Modal";
import alert from "../assets/danger.png";
// KaTeX dependency
import katex from "katex";
window.katex = katex;
import "katex/dist/katex.css";
// MathQuill dependency
import "../../node_modules/jquery";
import "@edtr-io/mathquill/build/mathquill.js";
import "@edtr-io/mathquill/build/mathquill.css";

// mathquill4quill include
import mathquill4quill from "mathquill4quill";
import "mathquill4quill/mathquill4quill.css";
Quill.register("modules/imageActions", ImageActions);
Quill.register("modules/imageFormats", ImageFormats);
Quill.register("modules/math", mathquill4quill({ Quill, katex }));

import ImageCompress from "quill-image-compress";
Quill.register("modules/imageCompress", ImageCompress);

import axios from "axios";
import API_URL from "../config";
import ImageUploader from "./ImageUploader";
import AuthContext from "./AuthContext";
import "../styles/Editor.css";
const QuillEditor = () => {
  const { user } = useContext(AuthContext);
  const [editorValue, setEditorValue] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [titleImage, setTitleImage] = useState([]);
  const [error, setError] = useState("");
  const [errorImage, setErrorImage] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [errorSummary, setErrorSummary] = useState(false);
  // TO-DO: Sanitizer needs fixing. Fix image height, width.
  const sanitizedHtml = DOMPurify.sanitize(editorValue, {
    ALLOWED_TAGS: [
      "b",
      "i",
      "em",
      "strong",
      "a",
      "img",
      "video",
      "p",
      "div",
      "span",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "blockquote",
      "code",
      "iframe",
      "pre",
      "br",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "caption",
      "figure",
      "figcaption",
      "hr",
      "font",
      "small",
      "mark",
      "del",
      "ins",
      "sub",
      "sup",
      "math",
    ],
    ALLOWED_ATTR: [
      "href",
      "src",
      "alt",
      "title",
      "width",
      "height",
      "style",
      "class",
      "frameborder",
      "allowfullscreen",
      "data-image-actions-unclickable-bound",
      "data-mathquill",
      "data-qa",
    ],
    ALLOWED_URI_REGEXP: /^(?:https?:\/\/|data:)/i,
  });
  const quillRef = useRef(null);
  // console.log(editorValue, "Original");
  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction
        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ align: [] }],
        ["link", "image", "video", "formula"],
        ["clean"], // remove formatting button
      ],
    },
    formula: true,
    imageActions: {},
    imageFormats: {},
    imageCompress: {
      quality: 0.7, // default
      maxWidth: 1000, // default
      maxHeight: 1000, // default
      imageType: "image/jpeg", // default
      debug: true, // default
      suppressErrorLogging: false, // default
      handleOnPaste: true, //default
      insertIntoEditor: undefined, // default
    },
  };
  useEffect(() => {
    setErrorImage("");
  }, [titleImage]);
  const formats = [
    "align",
    "background",
    "blockquote",
    "bold",
    "code-block",
    "color",
    "float",
    "header",
    "height",
    "image",
    "italic",
    "link",
    "script",
    "strike",
    "size",
    "underline",
    "width",
    "video",
    "list",
    "direction", // For RTL text direction
    "indent", // For outdent/indent
    "formula", // For math formulas
    "float", // For image floating
  ];
  // Toggle between preview and editor modes
  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };
  // Initialize mathquill4quill after component mounts
  useEffect(() => {
    if (quillRef.current) {
      const quillEditor = quillRef.current.getEditor();
      // Enable MathQuill formula authoring
      mathquill4quill({ Quill, katex })(quillEditor);
    }
  }, [quillRef]);
  const handleSavePost = async () => {
    try {
      const data = {
        title_image: titleImage[0].data_url,
        title: title,
        content: sanitizedHtml,
        summary: summary,
      };
      axios.post(`${API_URL}/user/blog/new/${user.id}`, data, {
        withCredentials: true,
      });
    } catch (error) {
      console.log("Error sending request");
    } finally {
      setModalVisible(false);
    }
  };
  const confirmSavePost = () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (titleImage.length == 0) {
      setErrorImage("Title image is required");
      return;
    }
    if (!summary.trim()) {
      setErrorSummary("Summary is required");
      return;
    }
    setModalVisible(true);
  };
  const handleConfirm = () => {
    handleSavePost();
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  return (
    <>
      <div className="vh-100 w-100 d-flex flex-column" id="container">
        {previewMode ? (
          <div className="preview d-flex flex-column">
            <div className="w-100 d-flex justify-content-center">
              <button onClick={togglePreview} className="btn btn-primary mb-3">
                Edit
              </button>
            </div>
            <div className="w-100 fs-2 text-center mb-3">
              <h2 id="title">{title}</h2>
            </div>
            {titleImage.length > 0 && (
              <img
                style={{ alignSelf: "center" }}
                width="200"
                height="200"
                src={titleImage[0].data_url}
                alt=""
              />
            )}
            <div
              dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                minHeight: "200px",
              }}
            />
          </div>
        ) : (
          <div>
            <div
              className="w-100 fs-2 text-center mb-3 d-flex flex-column"
              id="title-container"
            >
              <div className="d-flex flex-row-reverse">
                <div className="d-flex" style={{ width: "10%" }}>
                  <button onClick={togglePreview} className="btn btn-primary">
                    Preview
                  </button>
                </div>
                <input
                  className={
                    title
                      ? "border-bottom fw-bold w-100 text-center mb-3"
                      : "mb-3"
                  }
                  style={{ width: "90%" }}
                  id="title-input"
                  type="text"
                  placeholder="Add a new title"
                  value={title}
                  onChange={(e) => {
                    setError("");
                    setTitle(e.target.value);
                  }}
                  required
                />
              </div>
              {error && <p className="text-danger text-center">{error}</p>}
              {titleImage.length > 0 && (
                <img
                  style={{ alignSelf: "center" }}
                  width="200"
                  height="200"
                  src={titleImage[0].data_url}
                  alt=""
                />
              )}

              <ImageUploader
                setTitleImage={setTitleImage}
                images={titleImage}
              />
              {errorImage && (
                <p className="text-danger text-center">{errorImage}</p>
              )}
            </div>

            <ReactQuill
              ref={quillRef}
              value={editorValue}
              onChange={setEditorValue}
              modules={modules}
              formats={formats}
              theme="snow"
            />
            <div>
              {/* label and input for summary field */}
              <label className="fw-bold display-6" htmlFor="summary">
                Summary
              </label>
              <input
                className="w-100 mt-3 border rounded"
                type="text"
                id="summary"
                placeholder="Write down your summary here."
                value={summary}
                onChange={(e) => {
                  setErrorSummary("");
                  setSummary(e.target.value);
                }}
                required
              />
              {errorSummary && (
                <p className="text-danger text-center">{errorSummary}</p>
              )}
            </div>
            <div className="w-100 d-flex flex-row-reverse mt-3">
              <button
                onClick={confirmSavePost}
                className="px-4 btn btn-primary"
              >
                Save
              </button>
              <Modal
                isVisible={isModalVisible}
                message="Are you sure you want to save this post?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
              />
              <button className="px-4 btn btn-light">Cancel</button>
            </div>
          </div>
        )}
      </div>
      {(error || errorImage) && (
        <div className="alert-image">
          <img src={alert} alt="danger" width={50} />
        </div>
      )}
    </>
  );
};

export default QuillEditor;
