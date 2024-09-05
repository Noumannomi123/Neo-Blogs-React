import TextareaAutosize from "react-textarea-autosize";
import Loader from "./Loader";
import { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Quill } from "react-quill";
import Modal from "./Modal";
import alert from "../assets/danger.png";
// KaTeX dependency
import katex from "katex";
window.katex = katex;
import "katex/dist/katex.css";
// MathQuill dependency
// import "../../node_modules/jquery";
import "@edtr-io/mathquill/build/mathquill.js";
import "@edtr-io/mathquill/build/mathquill.css";

// mathquill4quill include
import mathquill4quill from "mathquill4quill";
import "mathquill4quill/mathquill4quill.css";

import axios from "axios";
import API_URL from "../config";
import ImageUploader from "./ImageUploader";
import "../styles/Editor.css";
import { useParams } from "react-router-dom";
const BlogEditor = () => {
  const user = {
    id: localStorage.getItem("id"),
    email: localStorage.getItem("email"),
  };
  const [previewMode, setPreviewMode] = useState(false);
  const [blog, setBlog] = useState({
    title: "",
    editorValue: "",
    summary: "",
    titleImage: [],
  });
  const [error, setError] = useState("");
  const [errorImage, setErrorImage] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [errorSummary, setErrorSummary] = useState(false);
  const quillRef = useRef(null);
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
    // imageActions: {},
    // imageFormats: {},
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
  }, [blog.titleImage]); //----
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
    /////--------
    try {
      const data = {
        title_image: blog.titleImage[0].data_url,
        title: blog.title,
        summary: blog.summary,
        content: blog.editorValue,
      };
      axios.put(
        `${API_URL}/user/blog/new/${user.id}?blog_id=${blog_id}`,
        data,
        {
          withCredentials: true, // TO-DO, check if required
        }
      );
    } catch (error) {
      console.log("Error sending request");
    } finally {
      setModalVisible(false);
    }
  };
  const confirmSavePost = () => {
    if (!blog.title.trim()) {
      setError("Title is required");
      return;
    }
    if (blog.titleImage.length == 0) {
      setErrorImage("Title image is required");
      return;
    }
    if (!blog.summary.trim()) {
      setErrorSummary("Summary is required");
      return;
    }
    setModalVisible(true);
  }; //----------
  const handleConfirm = () => {
    handleSavePost();
  };
  const handleCancel = () => {
    setModalVisible(false);
  };
  const { blog_id } = useParams();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadBlog = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/blog/${blog_id}`);
        const data = response.data;
        setBlog({
          ...data,
          editorValue: data.content,
          summary: data.summary,
          titleImage: [{ data_url: data.title_picture }],
        });
        setLoading(false);
      } catch (error) {
        console.log("Error loading blog", error);
      }
    };
    loadBlog();
  }, [blog_id]);
  if (loading) return <Loader />;
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
              <h2 id="title">{blog.title}</h2>
            </div>
            {blog.titleImage.length > 0 && (
              <img
                style={{ alignSelf: "center" }}
                width="200"
                height="200"
                src={blog.titleImage[0].data_url}
                alt=""
              />
            )}
            <div
              dangerouslySetInnerHTML={{ __html: blog.editorValue }}
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
                    blog.title
                      ? "border-bottom fw-bold w-100 text-center mb-3"
                      : "mb-3"
                  }
                  style={{ width: "90%" }}
                  id="title-input"
                  type="text"
                  placeholder="Add a new title"
                  value={blog.title}
                  onChange={(e) =>
                    setBlog((prevState) => ({
                      ...prevState,
                      title: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              {error && <p className="text-danger text-center">{error}</p>}
              {blog.titleImage.length > 0 && (
                <img
                  style={{ alignSelf: "center" }}
                  width="200"
                  height="200"
                  src={blog.titleImage[0].data_url}
                  alt=""
                />
              )}

              <ImageUploader
                setTitleImage={(images) =>
                  setBlog((prevState) => ({ ...prevState, titleImage: images }))
                }
                images={blog.titleImage}
              />
              {errorImage && (
                <p className="text-danger text-center">{errorImage}</p>
              )}
            </div>

            <ReactQuill
              ref={quillRef}
              value={blog.editorValue}
              onChange={(content) =>
                setBlog((prevState) => ({ ...prevState, editorValue: content }))
              }
              modules={modules}
              formats={formats}
              theme="snow"
            />
            <div>
              {/* label and input for summary field */}
              <label className="fw-bold fs-2" htmlFor="summary">
                Summary
              </label>
              <div className="border mt-3" style={{ padding: "0.8%" }}>
                <TextareaAutosize
                  className="w-100 summary"
                  id="summary"
                  placeholder="Write down your summary here."
                  value={blog.summary}
                  onChange={(e) => {
                    setErrorSummary("");
                    setBlog((prevState) => ({
                      ...prevState,
                      summary: e.target.value,
                    }));
                  }}
                  required
                />
              </div>
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
              <button
                onClick={() => window.location.reload(false)}
                className="px-4 btn btn-light"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      {(error || errorImage || errorSummary) && (
        <div className="alert-image">
          <img src={alert} alt="danger" width={50} />
        </div>
      )}
    </>
  );
};

export default BlogEditor;
