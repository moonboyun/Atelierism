import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./board.css";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { isLoginState } from "../utils/RecoilData";
import PageNaviGation from "../utils/PageNavigation";
import CloseIcon from "@mui/icons-material/Close";

const BoardReview = () => {
  const [boardList, setBoardList] = useState([]);
  const [reqPqge, setReqPage] = useState(1); // 요청할 페이지 번호(기본값1)
  const [pi, setPi] = useState(null); // 페이징 된 번호 응답상태
  const isLogin = useRecoilValue(isLoginState);

  // modal
  const [reviewModal, setReviewModal] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const openModal = (board) => {
    setReviewModal(true);
    setSelectedBoard(board);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/board?reqPage=${reqPqge}`)
      .then((res) => {
        setBoardList(res.data.boardList);
        setPi(res.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPqge]);

  return (
    <div className="board-wrap">
      {/* 배경이미지 */}
      <div className="review-hero">
        <div className="hero-inner">
          <img className="title-img" src="/image/image (review).png" />
          <h3 className="hero-title">Home styling</h3>
          <p className="hero-desc">
            “Atelierism에서 보다 예쁜 집, 우리 집에 될 순 없을까?”
            <br />
            아이와 성장하는 우리 집, <br />
            Atelierism이 제안하는 셀프 인테리어 팁과 레이아웃을 미리 보고
            결정해보세요.
          </p>
        </div>
      </div>

      {/* 배너 */}
      <div className="review-banner">
        <div className="banner-inner">
          <div className="banner-title">Untact online interior consulting</div>
          <div className="banner-sub">
            공간과 나만의 감성, 내 취향이 담긴 공간을 디자인해보세요.
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="section board-review-page">
        <div className="review-header">
          <div className="right-tools">
            {isLogin && (
              <Link to="/board/review/writer" className="btn-primary sm">
                글 작성
              </Link>
            )}
            <select className="sort-select" defaultValue="latest">
              <option value="latest">최신순</option>
              <option value="oldest">오래된순</option>
              <option value="popular">인기순</option>
            </select>
          </div>
        </div>
        {/* 카드 그리드 */}
        <div className="review-grid">
          {boardList.map((board, i) => {
            return (
              <BoardItem key={"board-" + i} board={board} onClick={openModal} />
            );
          })}
        </div>
        {/* modal 랜더링 */}
        {reviewModal && selectedBoard && (
          <ReviewModalApp
            board={selectedBoard}
            onClose={() => {
              setReviewModal(false);
              setSelectedBoard(null);
            }}
          />
        )}
        {/* 페이징 */}
        <div className="board-paging-wrap">
          {pi !== null && (
            <PageNaviGation pi={pi} reqPqge={reqPqge} setReqPage={setReqPage} />
          )}
        </div>
      </section>
    </div>
  );
};

const BoardItem = (props) => {
  const board = props.board;
  return (
    <div className="posting-item" onClick={() => props.onClick(board)}>
      <article key={board.reviewBoardNo} className="review-card">
        <div className="thumb">
          <img
            src={
              board.reviewBoardThumbnail !== null
                ? `${import.meta.env.VITE_BACK_SERVER}/board/review/thumbnail/${
                    board.reviewBoardThumbnail
                  }`
                : "/image/default_image.png"
            }
          ></img>
        </div>
        <div className="card-meta">
          <div className="card-title">{board.reviewBoardTitle}</div>
          <div className="card-sub">
            <span className="author">{board.reviewBoardWriter}</span>
            <span className="date">{board.reviewBoardDate}</span>
          </div>
          <p className="one-line">{board.reviewBoardOneline}</p>
        </div>
      </article>
    </div>
  );
};

const ReviewModalApp = ({ onClose, board }) => {
  // Esc로 닫기
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <section className="review-modal">
      <div className="modal-wrap">
        <div className="modal-page-title">
          <h3>리뷰 상세보기</h3>
          <span className="close-icon" onClick={onClose}>
            <CloseIcon />
          </span>
        </div>
        <div className="modal-page-content">
          <div className="user-thumbnail">
            <img
              src={
                board.reviewBoardThumbnail !== null
                  ? `${
                      import.meta.env.VITE_BACK_SERVER
                    }/board/review/thumbnail/${board.reviewBoardThumbnail}`
                  : "/image/default_image.png"
              }
            />
          </div>
          <div className="user-data">
            <span className="user-title">{board.reviewBoardTitle}</span>
            <span className="user-writer">{board.reviewBoardWriter}</span>
            <span className="user-oneline">{board.reviewBoardOneline}</span>
          </div>
        </div>
        <div
          className="board-content-wrap"
          dangerouslySetInnerHTML={{ __html: board.reviewBoardContent }}
        ></div>
      </div>
      <div
        className="modal-backdrop"
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
        }}
      />
    </section>
  );
};

export default BoardReview;
