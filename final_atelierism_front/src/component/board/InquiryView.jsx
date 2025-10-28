import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { memberTypeState } from "../utils/RecoilData";
import axios from "axios";
import "./inquiry.css";

const InquiryView = () => {
  const params = useParams();
  const inquiryBoardNo = params.inquiryBoardNo;
  const [inquiry, setInquiry] = useState();
  const [adminComment, setAdminComment] = useState("");
  const [pw, setPw] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  const verifyPw = () => {
    if (pw === inquiry.inquiryPassword) {
      setUnlocked(true);
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  const navigate = useNavigate();
  const memberType = useRecoilValue(memberTypeState);
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACK_SERVER
        }/board/inquiry/view/${inquiryBoardNo}`
      )
      .then((res) => {
        console.log(res);
        setInquiry(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const saveAdminComment = () => {
    const form = new FormData();
    form.append("adminComment", adminComment);
    form.append("inquiryBoardNo", inquiryBoardNo);
    axios
      .post(`${import.meta.env.VITE_BACK_SERVER}/board/inquiry/view`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data > 0) {
          navigate("/board/inquiry");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <section className="section-view-page">
      <div className="head-title">
        <h3>Qna</h3>
      </div>
      {inquiry && (
        <div className="inquiry-view-wrap">
          {/* 비밀번호 입력 */}
          {inquiry.inquiryBoardOption === 2 && memberType !== 1 && !unlocked ? (
            <div className="secret-gate">
              <p>비밀글입니다. 비밀번호를 입력하세요.</p>
              <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="비밀번호"
              />
              <button
                type="button"
                className="btn-primary lg"
                onClick={verifyPw}
              >
                확인
              </button>
            </div>
          ) : (
            <div className="inquiry-view-div">
              <div className="user-data-div">
                <div className="writer-div">
                  <span className="writer">{inquiry.inquiryBoardWriter}</span>
                  <span className="date">{inquiry.inquiryBoardDate}</span>
                </div>
                <div className="title-div">
                  <span className="title">{inquiry.inquiryBoardTitle}</span>
                </div>
                <div
                  className="inquiry-content-wrap"
                  dangerouslySetInnerHTML={{
                    __html: inquiry.inquiryBoardContent,
                  }}
                ></div>
              </div>
              <div className="list-button">
                <Link to="/board/inquiry" className="btn-primary lg">
                  목록으로
                </Link>
              </div>

              {/* 관리자 답변 영역 */}
              <div className="admin-comment-div">
                <section className="admin-comment-section">
                  {memberType === 1 && !inquiry.adminComment ? (
                    <div className="admin-comment-div">
                      <input
                        type="text"
                        id="adminComment"
                        name="adminComment"
                        placeholder="관리자 답변을 입력하세요"
                        value={adminComment}
                        onChange={(e) => setAdminComment(e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn-primary lg"
                        onClick={saveAdminComment}
                        disabled={!adminComment.trim()}
                      >
                        답변 등록
                      </button>
                    </div>
                  ) : (
                    <div className="admin-comment-div">
                      <span className="admin-comment">
                        {inquiry.adminComment || "등록된 답변이 없습니다."}
                      </span>
                    </div>
                  )}
                </section>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default InquiryView;
