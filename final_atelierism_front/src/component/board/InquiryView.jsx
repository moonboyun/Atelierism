import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import axios from "axios";
import "./inquiry.css";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Swal from "sweetalert2";
import { memberTypeState, loginIdState } from "../utils/RecoilData";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const InquiryView = () => {
  const params = useParams();
  const inquiryBoardNo = params.inquiryBoardNo;
  const [inquiry, setInquiry] = useState();
  const [adminComment, setAdminComment] = useState("");
  const [pw, setPw] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const memberId = useRecoilValue(loginIdState);

  // 게시글 비밀번호 확인
  const verifyPw = () => {
    if (pw === inquiry.inquiryPassword) {
      setUnlocked(true);
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };
  const handlePwEnter = (e) => {
    // Enter 키면 확인 실행
    if (e.key === "Enter") {
      e.preventDefault(); // 엔터 시 폼 새로고침 방지
      verifyPw();
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

  // 게시글 삭제
  const deleteBoard = () => {
    Swal.fire({
      title: "게시글 삭제",
      text: "게시글을 삭제하시겠습니까?",
      icon: "warning",
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: "닫기",
      confirmButtonText: "삭제하기",
      confirmButtonColor: " #8aa996",
    }).then((select) => {
      if (select.isConfirmed) {
        axios
          .delete(
            `${
              import.meta.env.VITE_BACK_SERVER
            }/board/inquiry/${inquiryBoardNo}`
          )
          .then((res) => {
            if (res.data > 0) {
              Swal.fire({
                icon: "success",
                title: "삭제 완료",
                timer: 1200,
                showConfirmButton: false,
              });
              navigate("/board/inquiry");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
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
      {inquiry && (
        <div className="inquiry-view-wrap">
          {/* 비밀번호 입력 */}
          {inquiry.inquiryBoardOption === 2 && memberType !== 1 && !unlocked ? (
            <div className="secret-gate">
              <p>
                <VpnKeyIcon />
                비밀글입니다. 비밀번호를 입력하세요.
              </p>
              <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                onKeyDown={handlePwEnter}
                placeholder="비밀번호를 입력해주세요"
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
              {/* 게시글 수정/삭제 버튼 */}
              {memberType === 1 || inquiry.inquiryBoardWriter === memberId ? (
                <div className="btn-zone">
                  {/* 수정 버튼 */}
                  <button
                    type="button"
                    className="btn ghost"
                    onClick={() =>
                      navigate(
                        `/board/inquiry/update/${inquiry.inquiryBoardNo}`
                      )
                    }
                  >
                    수정
                  </button>

                  {/* 삭제 버튼 */}
                  <button
                    type="button"
                    className="btn danger"
                    onClick={deleteBoard}
                  >
                    삭제
                  </button>
                </div>
              ) : null}

              {/* 관리자 답변 영역 */}
              {memberType === 1 || inquiry.adminComment ? (
                <div className="admin-comment-div">
                  <section className="admin-comment-section">
                    <div className="admin-card">
                      <div className="admin-card-head">
                        <div className="admin-card-title">
                          <AdminPanelSettingsIcon className="admin-title-icon" />
                          <span>관리자 답변</span>
                        </div>

                        {/* 배지: 답변이 있을 때만 표시 */}
                        {inquiry.adminComment && (
                          <span className="admin-badge success">답변완료</span>
                        )}
                      </div>

                      <div className="admin-card-body">
                        {memberType === 1 && !inquiry.adminComment ? (
                          <div className="admin-reply-form">
                            <input
                              type="text"
                              id="adminComment"
                              name="adminComment"
                              className="admin-input"
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
                          <div className="admin-reply-view">
                            <p className="admin-comment">
                              {inquiry.adminComment}
                            </p>
                            {inquiry.adminCommentDate && (
                              <span className="admin-comment-date">
                                {inquiry.adminCommentDate}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default InquiryView;
