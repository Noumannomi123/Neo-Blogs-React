import { useState, useRef, useEffect } from "react";
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

const QuillEditor = () => {
  const [editorValue, setEditorValue] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const sanitizedHtml = DOMPurify.sanitize(editorValue);
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
        [{ font: [] }],
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
    "font",
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
  return (
    <div>
      <div className="w-100 d-flex justify-content-center">
        <button onClick={togglePreview} className="btn btn-primary mb-3">
          {previewMode ? "Edit" : "Preview"}
        </button>
      </div>
      {previewMode ? (
        <div
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            minHeight: "200px",
          }}
        />
      ) : (
        <ReactQuill
          ref={quillRef}
          value={editorValue}
          onChange={setEditorValue}
          modules={modules}
          formats={formats}
          theme="snow"
        />
      )}
    </div>
  );
};

export default QuillEditor;
