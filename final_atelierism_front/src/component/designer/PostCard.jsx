import React, { useState } from "react";
import axios from "axios"; // 🚧 [미래용] 좋아요 서버 반영 시 사용
import "./designer.css";

/**
 * PostCard.jsx
 * props: image, title, initialLikes
 * 🚧 TODO: 좋아요 클릭 시 서버에 반영 예정
 */

function PostCard({ image, title, initialLikes }) {
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1));

    // 🚧 [나중에 서버 연결 시 사용]
    /*
    axios.post("/api/designer/like", {
      title: title,
      liked: newLikedState,
    })
    .then(() => {
      console.log("좋아요 상태 서버 반영 완료");
    })
    .catch((err) => {
      console.error("좋아요 반영 오류:", err);
    });
    */
  };

  return (
    <div className="post-card">
      <div className="card-image-wrapper">
        <img src={image} alt={title} />
      </div>
      <div className="card-content">
        <p className="card-title">{title}</p>
        <div className="card-likes">
          <span>{likeCount}</span>
          <span
            className={`like-icon ${isLiked ? "liked" : ""}`}
            onClick={handleLikeClick}
          >
            👍
          </span>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
