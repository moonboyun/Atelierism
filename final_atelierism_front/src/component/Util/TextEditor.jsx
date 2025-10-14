import axios from "axios";
import { useMemo, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css"; //리엑트퀼 css 연결
import ImageResize from "quill-image-resize-module-react";
Quill.register("modules/ImageResize", ImageResize); //이미지 크기 설정

const TextEditor = (props) => {
  const data = props.data;
  const setData = props.setData;
  const editorRef = useRef(null);
  const imageHandler = () => {
    //input태그 생성
    const input = document.createElement("input"); //e.타겟
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const files = input.files;
      if (files.length !== 0) {
        const form = new FormData();
        form.append("image", files[0]);
        axios
          .post(`${import.meta.env.VITE_BACK_SERVER}/board/image`, form, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log(res);
            //에디터 사용법 이대로 사용하면된다
            const editor = editorRef.current.getEditor();
            const range = editor.getSelection(); //에디터 내부 이미지를 관리하는 객체
            editor.insertEmbed(
              range.index,
              "image",
              `${import.meta.env.VITE_BACK_SERVER}/editor/${res.data}`
            );
            editor.setSelection(range.index + 1);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
  };

  //useMemo : 동일한값을 반환하는경우 함수를 반복적으로 호출하는것이아니라 메모리에 저장해두고 바로 가져와서 사용할때
  //매번 함수를 받아오는게 아닌 최초의 한번만하면 다시로드해도 기존에 저장했던 값을 가져옴
  const modules = useMemo(() => {
    return {
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
        handlers: {
          image: imageHandler,
        },
      },
      ImageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize", "Toolbar"],
      },
    };
  }, []);
  //리엑트 퀼에 데이터값 전달
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
