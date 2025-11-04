import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import "./board.css";
import axios from "axios";
import { useRecoilValue, useRecoilState } from "recoil";
import { isLoginState, loginIdState } from "../utils/RecoilData";
import PageNaviGation from "../utils/PageNavigation";
import ReviewModalApp from "./ReviewModalApp";

const BoardReview = () => {
  const [boardList, setBoardList] = useState([]);
  const [reqPage, setReqPage] = useState(1); // 요청할 페이지 번호(기본값1)
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
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => window.scrollTo(0, 0), []);
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACK_SERVER}/board/review?reqPage=${reqPage}`
      )
      .then((res) => {
        setBoardList(res.data.boardList);
        setPi(res.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage]);

  const toDate = (s) => {
    if (!s) return new Date(0);
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
            </select>
          </div>
        </div>
        {/* 카드 그리드 */}
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
            <PageNaviGation pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
          )}
        </div>
      </section>
      <div className="top-btn-container">
        <button
          className="top-btn"
          onClick={handleTop} // 버튼 클릭시 함수 호출
        >
          <span className="material-symbols-outlined">vertical_align_top</span>
        </button>
      </div>
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

export default BoardReview;
