import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import { Link, useNavigate } from "react-router-dom";
import InquiryFrm from "./InquiryFrm";
import "./inquiry.css";
import axios from "axios";
import TextEditor from "../utils/TextEditor";

const InquiryWriter = () => {
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const [boardTitle, setBoardTitle] = useState("");
  const [option, setOption] = useState(1); // 1 이면 공개글 | 2 이면 비밀글
  const [boardContent, setBoardContent] = useState("");
  const [inquiryPassword, setInquiryPassword] = useState(""); // 게시글 비밀번호(기본값: )

  const navigate = useNavigate();
  const Write = () => {
    if (boardTitle !== "" && boardContent !== "") {
      const form = new FormData();
      form.append("inquiryBoardTitle", boardTitle);
      form.append("inquiryBoardContent", boardContent);
      form.append("inquiryBoardWriter", memberId);
      form.append("inquiryBoardOption", option);

      if (option === 2) {
        form.append("inquiryPassword", inquiryPassword);
      }
      axios
        .post(`${import.meta.env.VITE_BACK_SERVER}/board/inquiry`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data > 0) {
            navigate("/board/inquiry");
            return alert("게시글이 등록되었습니다.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return alert("필수 항목을 입력해주세요.");
    }
  };

  useEffect(() => {
    if (!memberId) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/member/login");
    }
  }, [memberId]);

  return (
    <section className="section inquiry-writer-wrap">
      <div className="page-title">1:1 문의</div>
      <div className="inquiry-card">
        {/* 폼은 컴포넌트로 분리 */}
        <InquiryFrm
          memberId={memberId}
          boardTitle={boardTitle}
          setBoardTitle={setBoardTitle}
          option={option}
          setOption={setOption}
          inquiryPassword={inquiryPassword}
          setInquiryPassword={setInquiryPassword}
        />
        {/* TextEditor */}
        <div className="content-box">
          <TextEditor
            data={boardContent}
            setData={setBoardContent}
            base="/board/inquiry"
          />
        </div>
        {/* 버튼영역 */}
        <div className="writer-btns">
          <Link to="/board/inquiry" className="btn ghost">
            취소
          </Link>
          <button type="button" className="btn solid" onClick={Write}>
            등록하기
          </button>
        </div>
      </div>
    </section>
  );
};

export default InquiryWriter;
