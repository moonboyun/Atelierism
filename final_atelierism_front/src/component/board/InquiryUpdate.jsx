import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./inquiry.css";
import Swal from "sweetalert2";

const InquiryUpdate = () => {
  const { inquiryBoardNo } = useParams();
  const navigate = useNavigate();

  const [boardTitle, setBoardTitle] = useState("");
  const [boardContent, setBoardContent] = useState("");
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACK_SERVER
        }/board/inquiry/view/${inquiryBoardNo}`
      )
      .then((res) => {
        const d = res.data;
        setBoardTitle(d.inquiryBoardTitle || "");
        setBoardContent(d.inquiryBoardContent || "");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [inquiryBoardNo]);

  const updateInquiry = () => {
    if (!boardTitle.trim() || !boardContent.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
    const form = new FormData();
    form.append("inquiryBoardNo", inquiryBoardNo);
    form.append("inquiryBoardTitle", boardTitle);
    form.append("inquiryBoardContent", boardContent);

    axios
      .patch(`${import.meta.env.VITE_BACK_SERVER}/board/inquiry`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.data > 0) {
          Swal.fire({
            title: "게시글 수정",
            text: "수정 완료",
            icon: "success",
            cancelButtonText: "닫기",
            confirmButtonColor: " #8aa996",
          });
          navigate(`/board/inquiry/view/${inquiryBoardNo}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="section-update-page">
      <div className="page-title">문의글 수정</div>

      <div className="inquiry-update-wrap inquiry-card">
        <table className="inquiry-tbl">
          <tbody>
            <tr>
              <th>제목</th>
              <td>
                <input
                  type="text"
                  value={boardTitle}
                  onChange={(e) => setBoardTitle(e.target.value)}
                  placeholder="수정 할 제목을 입력하세요"
                />
              </td>
            </tr>

            <tr>
              <th>내용</th>
              <td>
                <textarea
                  value={boardContent}
                  onChange={(e) => setBoardContent(e.target.value)}
                  placeholder="수정 할 내용을 입력하세요"
                  rows={10}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="writer-btns">
          <button
            type="button"
            className="btn ghost"
            onClick={() => navigate(`/board/inquiry/view/${inquiryBoardNo}`)}
          >
            취소
          </button>
          <button type="button" className="btn solid" onClick={updateInquiry}>
            수정하기
          </button>
        </div>
      </div>
    </section>
  );
};

export default InquiryUpdate;
