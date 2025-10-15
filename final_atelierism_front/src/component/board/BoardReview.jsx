import { Link } from "react-router-dom";
import { useState } from "react";
import "./board.css";

const BoardReview = () => {
  const boardList = [
    {
      id: 1,
      thumb: "/image/image.thumbnail.png",
      title: "부엌 리폼 후기",
      author: "유저A",
      date: "2025.10.10",
      oneLine: "주방 동선이 정말 편해졌어요.",
    },
    {
      id: 2,
      thumb: "/image/image.thumbnail.png",
      title: "거실 포인트 컬러",
      author: "유저B",
      date: "2025.09.29",
      oneLine: "포인트 벽 하나로 분위기 확 바뀜!",
    },
    {
      id: 3,
      thumb: "/image/image.thumbnail.png",
      title: "작은방 북카페화",
      author: "유저C",
      date: "2025.09.20",
      oneLine: "아늑한 독서 공간 완성.",
    },
    {
      id: 4,
      thumb: "/image/image.thumbnail.png",
      title: "아이방 꾸미기",
      author: "유저D",
      date: "2025.09.18",
      oneLine: "수납+안전+컬러 모두 만족.",
    },
    {
      id: 5,
      thumb: "/image/image.thumbnail.png",
      title: "현관 수납장 교체",
      author: "유저E",
      date: "2025.09.12",
      oneLine: "깔끔하게 정리돼서 출근이 쾌적!",
    },
    {
      id: 6,
      thumb: "/image/image.thumbnail.png",
      title: "서재 조명 변경",
      author: "유저F",
      date: "2025.09.02",
      oneLine: "눈 피로가 줄었어요.",
    },
  ];

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
            <Link to="/board/review/writer" className="btn-primary sm">
              글 작성
            </Link>
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
          {boardList.map((board) => (
            <article key={board.id} className="review-card">
              <div className="thumb">
                <img src={board.thumb} />
              </div>
              <div className="card-meta">
                <div className="card-title">{board.title}</div>
                <div className="card-sub">
                  <span className="author">{board.author}</span>
                  <span className="dot">•</span>
                  <span className="date">{board.date}</span>
                </div>
                <p className="one-line">{board.oneLine}</p>
              </div>
            </article>
          ))}
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

export default BoardReview;
