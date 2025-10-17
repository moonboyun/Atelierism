import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./board.css";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { isLoginState } from "../utils/RecoilData";

const BoardReview = () => {
  const [boardList, setBoardList] = useState([]);
  const [reqPqge, setReqPage] = useState(1); // 요청할 페이지 번호(기본값1)
  const [pi, setPi] = useState(null); // 페이징 된 번호 응답상태
  const isLogin = useRecoilValue(isLoginState);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/board?reqPage=${reqPqge}`)
      .then((res) => {
        console.log(res);
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
              {/* 기본값(최신순)으로 설정 */}
              <option value="latest">최신순</option>
              <option value="oldest">오래된순</option>
              <option value="popular">인기순</option>
            </select>
          </div>
        </div>

        {/* 카드 그리드 */}
        <div className="review-grid">
          {boardList.map((board, i) => {
            return <BoardItem key={"board-" + i} board={board} />;
          })}
        </div>

        {/* 페이징 */}
        <div className="review-pagination">
          <button type="button" className="page-btn" disabled>
            ‹
          </button>
          <button type="button" className="page-btn active">
            1
          </button>
          <button type="button" className="page-btn">
            2
          </button>
          <button type="button" className="page-btn">
            3
          </button>
          <button type="button" className="page-btn">
            ›
          </button>
        </div>
      </section>
    </div>
  );
};

const BoardItem = (props) => {
  const board = props.board;
  const navigate = useNavigate();
  return (
    <div
      className="posting-item"
      onClick={() => {
        navigate(`/board/view${board.boardNo}`);
      }}
    >
      <article key={board.boardNo} className="review-card">
        <div className="thumb">
          <img src={board.thumbnail} />
        </div>
        <div className="card-meta">
          <div className="card-title">{board.boardtitle}</div>
          <div className="card-sub">
            <span className="author">{board.boardWriter}</span>
            <span className="dot">•</span>
            <span className="date">{board.date}</span>
          </div>
          <p className="one-line">{board.oneLine}</p>
        </div>
      </article>
    </div>
  );
};

export default BoardReview;
