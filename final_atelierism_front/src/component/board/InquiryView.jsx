import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";

const InquiryView = () => {
  const params = useParams();
  const inquiryBoardNo = params.inquiryBoardNo;
  const [inquiry, setInquiry] = useState();
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const navigate = useNavigate();
  return (
    <section className="section-view-page">
      <div className="head-title">
        <h3>Qna</h3>
      </div>
      {/* 게시글 상세 내용 */}
      <div className="user-data-div">
        <div className="writer-div">
          <span className="writer">{inquiry.inquiryBoardWriter}</span>
          <span className="date">{inquiry.inquiryBoardDate}</span>
        </div>
        <div className="title-div">
          <span className="title">{inquiry.inquiryBoardTitle}</span>
        </div>
        <div className="content-div">{inquiry.inquiryBoardContent}</div>
      </div>
      <div className="list-button">
        <Link to="/board/inquiry" className="btn-primary lg">
          목록으로
        </Link>
      </div>
      {/* 관리자 답변 */}
      <div className="admin-comment-div"></div>
    </section>
  );
};

export default InquiryView;
