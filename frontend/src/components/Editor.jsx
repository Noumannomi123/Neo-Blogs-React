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
  // console.log(sanitizedHtml, "S");
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

  const handleSavePost = async () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    try {
      const data = [title, titleImage, sanitizedHtml];
      const file = data[1][0].file;
      console.log(file);
      setError("");
      const formData = new FormData();
      formData.append("image", file);
      formData.append("title",title );
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

/*
Introduction

The cosmos has always been a source of fascination and wonder for humanity. From the ancient civilizations that gazed up at the stars, to modern scientists probing the mysteries of the universe, our quest to understand the cosmos has been a fundamental part of our existence. This blog post will take you on a journey through some of the most intriguing aspects of our universe.



The Birth of Stars

Stars are born from vast clouds of gas and dust in space, known as nebulae. The process begins when regions within these clouds collapse under their own gravity, leading to the formation of protostars. As the protostar's core becomes hot and dense, nuclear fusion reactions start, and a new star is born. These newly formed stars often gather in clusters, contributing to the formation of galaxies.

Key Facts:

A star’s life cycle includes stages such as main sequence, red giant, and, eventually, supernova or white dwarf.
Our Sun is currently a middle-aged star, residing in the main sequence phase of its life cycle.
Galaxies and Their Structure



#include<iostream>
using namespace std;
int main(){
   cout << "HEllo world" << endl;
   return 0;
  }


Fun Facts:

There are estimated to be over 100 billion galaxies in the observable universe.
The Andromeda Galaxy, our nearest spiral galaxy neighbor, is on a collision course with the Milky Way, expected to merge in about 4.5 billion years.
The Expanding Universe

The concept of an expanding universe was first proposed by Edwin Hubble in the 1920s. Observations of distant galaxies reveal that they are moving away from us, indicating that the universe itself is expanding. This discovery led to the development of the Big Bang Theory, which describes the origin of the universe as a singularity that began expanding approximately 13.8 billion years ago.

Key Theories:

The Big Bang Theory explains the observed expansion and the cosmic microwave background radiation.
Dark energy is believed to be the force driving the accelerated expansion of the universe.
Conclusion

The universe is a vast and complex tapestry of cosmic phenomena. From the birth of stars to the expansive structure of galaxies and the ever-expanding universe, there is still much to discover and understand. As we continue to explore the cosmos, we gain insights into the origins of our existence and our place in the grand scheme of the universe.
 */
