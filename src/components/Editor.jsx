// // import "react-quill/dist/quill.snow.css";
// // import ReactQuill from "react-quill";
// // import { useState } from "react";
// // const Editor = () => {
// //   const [value, setValue] = useState("");
// //   const modules = {
// //     toolbar: {
// //       container: [
// //         ["bold", "italic", "underline", "strike"], // toggled buttons
// //         ["blockquote", "code-block"],
// //         [{ header: 1 }, { header: 2 }], // custom button values
// //         [{ list: "ordered" }, { list: "bullet" }],
// //         [{ script: "sub" }, { script: "super" }], // superscript/subscript
// //         [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
// //         [{ direction: "rtl" }], // text direction
// //         [{ size: ["small", false, "large", "huge"] }], // custom dropdown
// //         [{ header: [1, 2, 3, 4, 5, 6, false] }],
// //         ["link", "image", "video", "formula"], // add's image support
// //         [{ color: [] }, { background: [] }], // dropdown with defaults from theme
// //         [{ font: [] }],
// //         [{ align: [] }],
// //         ["clean"], // remove formatting button
// //       ],
// //     },
// //     imageResize: {
// //       displaySize: true,
// //     },
// //   };
// //   return (
// //     <div>
// //       <ReactQuill
// //         value={value}
// //         onChange={setValue}
// //         modules={modules}
// //         theme="snow"
// //       />
// //     </div>
// //   );
// // };

// // export default Editor;

// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { useState } from "react";
// import { Quill } from "react-quill";
// import { ImageActions } from "@xeger/quill-image-actions";
// import { ImageFormats } from "@xeger/quill-image-formats";

// Quill.register("modules/imageActions", ImageActions);
// Quill.register("modules/imageFormats", ImageFormats);
// const Editor = () => {
//   const [editorValue, setEditorValue] = useState("");

//   const modules = {
//     imageActions: {},
//     imageFormats: {},
//     toolbar: {
//       container: [
//         ["bold", "italic", "underline", "strike"], // toggled buttons
//         ["blockquote", "code-block"],
//         [{ header: 1 }, { header: 2 }], // custom button values
//         [{ list: "ordered" }, { list: "bullet" }],
//         [{ script: "sub" }, { script: "super" }], // superscript/subscript
//         [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
//         [{ direction: "rtl" }], // text direction
//         [{ size: ["small", false, "large", "huge"] }], // custom dropdown
//         [{ header: [1, 2, 3, 4, 5, 6, false] }],
//         ["link", "image", "video", "formula"], // add's image support
//         [{ color: [] }, { background: [] }], // dropdown with defaults from theme
//         [{ font: [] }],
//         [{ align: [] }],
//         ["clean"], // remove formatting button
//       ],
//     },
//     // imageResize: {
//     //   displaySize: true,
//     //   parchment: Quill.import("parchment"),
//     // },
//   };

//   return (
//     <ReactQuill
//       theme="snow"
//       value={editorValue}
//       onChange={setEditorValue}
//       modules={modules}
//     />
//   );
// };

// export default Editor;

import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Quill } from "react-quill";
import { ImageActions } from "@xeger/quill-image-actions";
import { ImageFormats } from "@xeger/quill-image-formats";

Quill.register("modules/imageActions", ImageActions);
Quill.register("modules/imageFormats", ImageFormats);
const QuillEditor = () => {
  const [editorValue, setEditorValue] = useState("");
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
    imageActions: {},
    imageFormats: {},
    // align: {}, HOW TO ALIGN
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
  ];

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        value={editorValue}
        onChange={setEditorValue}
        modules={modules}
        formats={formats}
        theme="snow"
      />
    </div>
  );
};

export default QuillEditor;
