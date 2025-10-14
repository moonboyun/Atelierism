import { useState } from "react";
import ReviewFrm from "./ReviewFrm";
//import TextEditor from "../utils/TextEditor";
import "./board.css";

const ReviewWriter = () => {
  const [boardTitle, setBoardTitle] = useState(""); // 제목
  const [oneLine, setOneLine] = useState(""); // 한줄평
  const [thumbnail, setThumbnail] = useState(null); // 썸네일
  const [boardContent, setBoardContent] = useState(""); // 본문

  const upload = () => {
    alert("등록완료"); // 실제 전송 X
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
          <TextEditor // ReactQuill 기반 에디터
            data={boardContent} // 본문 값
            setData={setBoardContent} // 본문 변경 함수
          />
        </div>
        {/* 하단: 버튼 영역 */}
        <div className="button-zone">
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
