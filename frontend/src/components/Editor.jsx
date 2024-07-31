import { useState, useRef, useEffect, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Quill } from "react-quill";
import { ImageActions } from "@xeger/quill-image-actions";
import { ImageFormats } from "@xeger/quill-image-formats";
import DOMPurify from "dompurify";
import "../styles/Editor.css";
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
const QuillEditor = () => {
  const { user } = useContext(AuthContext);
  const [editorValue, setEditorValue] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [title, setTitle] = useState("");
  const [titleImage, setTitleImage] = useState([]);
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
  const [error, setError] = useState("");
  const [errorImage, setErrorImage] = useState("");
  const handleSavePost = async () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (titleImage.length == 0) {
      setErrorImage("Title image is required");
      return;
    }
    try {
      const data = [title, titleImage, sanitizedHtml];
      const file = data[1][0].file;
      console.log(file, "File by ");
      setError("");
      const formData = new FormData();
      formData.append("image", file);
      formData.append("title", title);
      formData.append("content", sanitizedHtml);
      const response = await axios.post(
        `${API_URL}/user/blog/new/${user.id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };
  return (
    <div className="vh-100 w-100" id="container">
      <div className="w-100 d-flex justify-content-center">
        <button onClick={togglePreview} className="btn btn-primary mb-3">
          {previewMode ? "Edit" : "Preview"}
        </button>
      </div>
      {previewMode ? (
        <div className="preview">
          <div className="w-100 fs-2 text-center mb-3">
            <h2 id="title">{title}</h2>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              minHeight: "200px",
            }}
          />{" "}
        </div>
      ) : (
        <div>
          {/* take title of the post as input */}
          <div className="w-100 fs-2 text-center mb-3" id="title-container">
            <input
              className={title ? "border-bottom fw-bold w-100 text-center" : ""}
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
            {error && <p className="text-danger text-center">{error}</p>}
            <ImageUploader setTitleImage={setTitleImage} />
            {errorImage && <p className="text-danger text-center">{errorImage}</p>}
          </div>

          <ReactQuill
            ref={quillRef}
            value={editorValue}
            onChange={setEditorValue}
            modules={modules}
            formats={formats}
            theme="snow"
          />
          <div className="w-100 d-flex flex-row-reverse mt-3">
            <button onClick={handleSavePost} className="px-4 btn btn-primary">
              Save
            </button>
            <button className="px-4 btn btn-light">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuillEditor;
