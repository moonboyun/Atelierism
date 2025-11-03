import axios from "axios";
import { useMemo, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
Quill.register("modules/ImageResize", ImageResize);

const TextEditor = (props) => {
  const { data, setData, base, uploadBase, contentBase } = props;

  const finalUploadBase = uploadBase ?? base ?? "/board/review";
  const finalContentBase = contentBase ?? base ?? "/board/review";

  const editorRef = useRef(null);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = () => {
      const files = input.files;
      if (!files || files.length === 0) return;

      const form = new FormData();
      form.append("image", files[0]);

      axios
        .post(
          `${import.meta.env.VITE_BACK_SERVER}${finalUploadBase}/image`,
          form
        )
        .then((res) => {
          const filename = res.data;
          const editor = editorRef.current.getEditor();
          const range = editor.getSelection();
          const url = `${
            import.meta.env.VITE_BACK_SERVER
          }${finalContentBase}/content/${encodeURIComponent(filename)}`;
          editor.insertEmbed(range.index, "image", url);
          editor.setSelection(range.index + 1);
        })
        .catch(console.error);
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
          ["image"],
        ],
        handlers: { image: imageHandler },
      },
      ImageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize", "Toolbar"],
      },
    }),
    [] // base 분리해도 모듈은 고정 OK
  );

  return (
    <ReactQuill
      ref={editorRef}
      value={data}
      onChange={setData}
      theme="snow"
      modules={modules}
    />
  );
};

export default TextEditor;
