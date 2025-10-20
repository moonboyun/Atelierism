import React, { useState, useEffect } from "react";
import axios from "axios"; // 🚧 [미래용] 서버 연동 시 사용
import PostCard from "./PostCard";
import "./designer.css";

/**
 * Intro.jsx
 * 디자이너 소개 페이지
 * 현재는 더미 데이터만 표시
 * 🚧 TODO: Spring Boot API 연결 시 axios 부분 주석 해제 예정
 */

const Intro = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    /**
     * 🚧 [임시 더미 데이터]
     * 나중에 서버에서 데이터 가져올 때 아래 주석된 axios 코드로 교체 예정
     */

    const dummyPosts = [
      {
        id: 1,
        image: "https://via.placeholder.com/300",
        title: "아기방은 자신 있습니다!!!",
        likes: 51,
      },
      {
        id: 2,
        image: "https://via.placeholder.com/300",
        title: "모던한 거실 인테리어",
        likes: 31,
      },
      {
        id: 3,
        image: "https://via.placeholder.com/300",
        title: "따뜻한 느낌의 침실",
        likes: 22,
      },
      {
        id: 4,
        image: "https://via.placeholder.com/300",
        title: "재택근무를 위한 서재",
        likes: 18,
      },
      {
        id: 5,
        image: "https://via.placeholder.com/300",
        title: "효율적인 주방 동선",
        likes: 14,
      },
      {
        id: 6,
        image: "https://via.placeholder.com/300",
        title: "플랜테리어, 식물과 함께",
        likes: 17,
      },
    ];

    setPosts(dummyPosts);

    // [나중에 서버 연결 시 사용]
    /*
    axios.get("/api/designer/list") // 백엔드에서 데이터 가져오기
      .then((res) => {
        setPosts(res.data); // 서버에서 받은 데이터로 상태 갱신
      })
      .catch((err) => {
        console.error("디자이너 데이터를 불러오는 중 오류:", err);
      });
    */
  }, []);

  return (
    <div className="intro-container">
      <div className="sub-menu">
        <span>디자이너 소개</span>
      </div>

      <div className="post-card-grid">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            image={post.image}
            title={post.title}
            initialLikes={post.likes}
          />
        ))}
      </div>
    </div>
  );
};

export default Intro;
