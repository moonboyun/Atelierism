//src / components / ReviewModalApp.jsx;
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import CloseIcon from "@mui/icons-material/Close";
import { useRecoilValue } from "recoil";
import { memberTypeState } from "../utils/RecoilData";

const ReviewModalApp = ({ onClose, board, memberId }) => {
  const memberType = useRecoilValue(memberTypeState);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const deleteButton = () => {
    Swal.fire({
      title: "게시글 삭제",
      text: "게시글을 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "삭제하기",
      cancelButtonText: "취소",
    }).then((select) => {
      if (select.isConfirmed) {
        axios
          .delete(
            `${import.meta.env.VITE_BACK_SERVER}/board/review/${
              board.reviewBoardNo
            }`
          )
          .then((res) => {
            if (res.data === 1) {
              onClose();
              Swal.fire("삭제 완료", "게시글이 삭제되었습니다.", "success");
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <section className="review-modal">
      <div className="modal-wrap">
        <div className="modal-page-title">
          <span className="close-icon" onClick={onClose}>
            <CloseIcon />
          </span>
          <h3>리뷰 상세보기</h3>
        </div>

        <div className="modal-page-content">
          <div className="user-main-title">
            <span className="user-title">{board.reviewBoardTitle}</span>
          </div>
          <div className="user-main-date">
            <span className="user-date">{board.reviewBoardDate}</span>
          </div>
          <div className="user-thumbnail">
            <img
              src={
                board.reviewBoardThumbnail
                  ? `${
                      import.meta.env.VITE_BACK_SERVER
                    }/board/review/thumbnail/${board.reviewBoardThumbnail}`
                  : "/image/default_image.png"
              }
            />
          </div>
        </div>

        <div className="user-data">
          <div className="writer-oneline-div">
            <span className="user-writer">{board.reviewBoardWriter}</span>
            <span className="user-oneline">{board.reviewBoardOneline}</span>
          </div>
        </div>

        <div
          className="board-content-wrap"
          dangerouslySetInnerHTML={{ __html: board.reviewBoardContent }}
        ></div>

        {(memberId === board.reviewBoardWriter || memberType === 1) && (
          <div className="button-box">
            <div className="button">
              <button type="button" className="delete" onClick={deleteButton}>
                삭제
              </button>
            </div>
          </div>
        )}
      </div>

      <div
        className="modal-backdrop"
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)" }}
      />
    </section>
  );
};

export default ReviewModalApp;
