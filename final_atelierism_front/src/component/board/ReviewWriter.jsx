import { useState } from "react";
import ReviewFrm from "./ReviewFrm";
import TextEditor from "../utils/TextEditor";
import "./board.css";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import axios from "axios";
import Swal from "sweetalert2";

const ReviewWriter = () => {
  const [boardTitle, setBoardTitle] = useState(""); // 제목
  const [oneLine, setOneLine] = useState(""); // 한줄평
  const [thumbnail, setThumbnail] = useState(null); // 썸네일
  const [boardContent, setBoardContent] = useState(""); // 본문
  const [memberId, setMemberId] = useRecoilState(loginIdState); // 회원 아이디를 가져옴

  const navigate = useNavigate();
  const upload = () => {
    if (boardTitle !== "" && boardContent !== "") {
      const form = new FormData();
      form.append("reviewBoardTitle", boardTitle);
      form.append("reviewBoardOneline", oneLine);
      form.append("reviewBoardWriter", memberId);
      form.append("reviewBoardContent", boardContent);
      if (thumbnail !== null) {
        form.append("thumbnail", thumbnail);
      }
      // 유효성 체크 알림
      if (boardTitle === "" || boardContent === "") {
        Swal.fire({
          title: "입력 확인",
          text: "제목과 내용을 입력해주세요.",
          icon: "warning",
          confirmButtonText: "확인",
        });
        return;
      }
      axios
        .post(`${import.meta.env.VITE_BACK_SERVER}/board`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data > 0) {
            Swal.fire({
              title: "등록 완료",
              text: "게시글이 정상적으로 등록되었습니다.",
              icon: "success",
              confirmButtonText: "확인",
            }).then(() => {
              navigate("/board/review");
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <section className="section board-content-wrap">
      <div className="page-title">후기 게시글 작성</div>
      <div className="board-frm">
        {/* 상단: 썸네일 + 우측 정보(제목/작성자/한줄평) */}
        <ReviewFrm
          boardTitle={boardTitle} // 제목 값
          setBoardTitle={setBoardTitle} // 제목 변경 함수
          oneLine={oneLine} // 한줄평 값
          setOneLine={setOneLine} // 한줄평 변경
          thumbnail={thumbnail} // 썸네일 파일 객체
          setThumbnail={setThumbnail} // 썸네일 변경
        />
        {/* 중단: 본문 */}
        <div className="board-content-wrap">
          <TextEditor
            data={boardContent}
            setData={setBoardContent}
            base="/board/review"
          />
        </div>
        {/* 하단: 버튼 영역 */}
        <div className="button-zone">
          <Link to="/board/review" className="btn-primary lg cancel">
            취소
          </Link>
          <button
            type="button" // form submit 방지
            className="btn-primary lg" // 기본 스타일 클래스(프로젝트 CSS 사용)
            onClick={upload} // 지금은 알림만
          >
            등록하기
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReviewWriter;
