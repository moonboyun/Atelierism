import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import "./board.css";
import axios from "axios";
import { useRecoilValue, useRecoilState } from "recoil";
import { isLoginState, loginIdState } from "../utils/RecoilData";
import PageNaviGation from "../utils/PageNavigation";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { memberTypeState } from "../utils/RecoilData";

const BoardReview = () => {
  const [boardList, setBoardList] = useState([]);
  const [reqPqge, setReqPage] = useState(1); // 요청할 페이지 번호(기본값1)
  const [pi, setPi] = useState(null); // 페이징 된 번호 응답상태
  const isLogin = useRecoilValue(isLoginState);
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const [sort, setSort] = useState("latest"); // 정렬(기본값 최신순)

  // modal
  const [reviewModal, setReviewModal] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const openModal = (board) => {
    setReviewModal(true);
    setSelectedBoard(board);
  };

  const [heart, setHeart] = useState(0);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACK_SERVER}/board/review?reqPage=${reqPqge}`
      )
      .then((res) => {
        setBoardList(res.data.boardList);
        setPi(res.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPqge]);

  const toDate = (s) => {
    if (!s) return new Date(0);
    // 동일 포맷이라면 new Date(s)로도 됨. (yyyy-mm-dd)
    return new Date(s);
  };

  const sortedBoards = useMemo(() => {
    const arr = [...boardList];
    arr.sort((a, b) => {
      const da = toDate(a.reviewBoardDate);
      const db = toDate(b.reviewBoardDate);
      if (sort === "latest") {
        // 최신순: 날짜 내림차순
        if (db - da !== 0) return db - da;
      } else if (sort === "oldest") {
        // 오래된순: 날짜 오름차순
        if (da - db !== 0) return da - db;
      }
      // 날짜 같을 때 보조 키(번호)로 안정성 확보
      return (b.reviewBoardNo ?? 0) - (a.reviewBoardNo ?? 0);
    });
    return arr;
  }, [boardList, sort]);

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
            <select
              className="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="latest">최신순</option>
              <option value="oldest">오래된순</option>
              <option value="popular" disabled>
                인기순
              </option>
            </select>
          </div>
        </div>
        {/* 카드 그리드 */}
        {/* 정렬된 배열로 렌더링 */}
        <div className="review-grid">
          {sortedBoards.map((board, i) => (
            <BoardItem key={"board-" + i} board={board} onClick={openModal} />
          ))}
        </div>
        {/* modal 랜더링 */}
        {reviewModal && selectedBoard && (
          <ReviewModalApp
            board={selectedBoard}
            memberId={memberId}
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

const ReviewModalApp = ({ onClose, board, memberId }) => {
  // Esc로 닫기
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
        console.log("삭제");
        axios
          .delete(
            `${import.meta.env.VITE_BACK_SERVER}/board/review/${
              board.reviewBoardNo
            }`
          )
          .then((res) => {
            console.log(res);
            if (res.data === 1) {
              onClose();
              return alert("게시글이 삭제되었습니다.");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const heartOn = () => {};
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
                board.reviewBoardThumbnail !== null
                  ? `${
                      import.meta.env.VITE_BACK_SERVER
                    }/board/review/thumbnail/${board.reviewBoardThumbnail}`
                  : "/image/default_image.png"
              }
            />
          </div>
        </div>
        <div className="user-data">
          <div className="side-div">
            <FavoriteBorderIcon className="heart-icon" onClick={heartOn} />
          </div>
          <div className="writer-oneline-div">
            <span className="user-writer">{board.reviewBoardWriter}</span>
            <span className="user-oneline">{board.reviewBoardOneline}</span>
          </div>
        </div>
        <div
          className="board-content-wrap"
          dangerouslySetInnerHTML={{ __html: board.reviewBoardContent }}
        ></div>
        {memberId === board.reviewBoardWriter ||
        useRecoilValue(memberTypeState) === 1 ? (
          <div className="button-box">
            <div className="button">
              <button type="button" className="delete" onClick={deleteButton}>
                삭제
              </button>
            </div>
          </div>
        ) : null}
      </div>
      <div
        className="modal-backdrop"
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)" }}
      />
    </section>
  );
};

export default BoardReview;
