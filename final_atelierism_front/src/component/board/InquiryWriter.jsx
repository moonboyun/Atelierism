import { useState } from "react";
import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import { Link, useNavigate } from "react-router-dom";
import InquiryFrm from "./InquiryFrm";
import "./inquiry.css";

const InquiryWriter = () => {
  const [memberId] = useRecoilState(loginIdState);

  // 페이지가 들고 있을 상태들
  const [title, setTitle] = useState("");
  const [option, setOption] = useState("public"); // "public" | "secret"
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");

  const nav = useNavigate();

  const submit = () => {
    if (!title.trim()) return alert("제목을 입력해주세요.");
    if (option === "secret" && !password.trim())
      return alert("비밀글 비밀번호를 입력해주세요.");
    if (!content.trim()) return alert("내용을 입력해주세요.");

    // TODO: 서버 통신 위치(axios 등)
    alert("등록되었습니다. (더미)");
    nav("/board/inquiry");
  };

  return (
    <section className="section inquiry-writer-wrap">
      <div className="page-title">Writing</div>

      <div className="inquiry-card">
        {/* 폼은 컴포넌트로 분리 */}
        <InquiryFrm
          memberId={memberId}
          title={title}
          setTitle={setTitle}
          option={option}
          setOption={setOption}
          password={password}
          setPassword={setPassword}
          content={content}
          setContent={setContent}
        />

        {/* 버튼영역 */}
        <div className="writer-btns">
          <Link to="/board/inquiry" className="btn ghost">
            취소
          </Link>
          <button type="button" className="btn solid" onClick={submit}>
            Upload
          </button>
        </div>
      </div>
    </section>
  );
};

export default InquiryWriter;
