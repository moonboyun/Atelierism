import {
  ArrowBackIosNew,
  ArrowForwardIos,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReviewModalApp from "../board/ReviewModalApp";
import { useRecoilValue } from "recoil";
import { loginIdState } from "../utils/RecoilData";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container">
      <div
        className="slider"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        <img src="/image/slider/main-photo1.jpg" />
        <img src="/image/slider/main-photo2.jpg" />
        <img src="/image/slider/main-photo3.jpg" />
      </div>
      <button className="prev-btn" onClick={handlePrev}>
        <ArrowBackIosNew />
      </button>
      <button className="next-btn" onClick={handleNext}>
        <ArrowForwardIos />
      </button>
    </div>
  );
};

const Main = () => {
  const [designerBoard, setDesignerBoard] = useState([]); //디자이너 소개 게시물 리스트
  const [reviewList, setReviewList] = useState([]);
  const navigate = useNavigate();

  const [selectedReview, setSelectedReview] = useState(null);
  const [reviewModal, setReviewModal] = useState(false);
  const memberId = useRecoilValue(loginIdState);

  const openReviewModal = (review) => {
    setSelectedReview(review);
    setReviewModal(true);
  };

  const closeReviewModal = () => {
    setSelectedReview(null);
    setReviewModal(false);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/designer/board`)
      .then((res) => {
        setDesignerBoard(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/board/review/main`)
      .then((res) => {
        setReviewList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //페이지 이동 시 맨 위로 유지하는 기능
  useEffect(() =>
	window.scrollTo(0, 0)
   	, [])


    // 클릭하면 스크롤이 위로 올라가는 함수
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="section">
      <Slider />
      <div className="main-content">
        <div className="main-title">Q. 어떻게 진행하나요?</div>
        <div className="question">
          <p>로그인 후 상단 메뉴바에</p>
          <div className="btn-box">
            <p>인테리어 컨설팅</p>
          </div>
          <p>클릭 → 디자이너 매칭 → 간단한 설문 → 결제 진행</p>
        </div>
        <div className="img-box">
          <img src="/image/question-photo1.jpg" />
          <img src="/image/question-photo2.jpg" />
          <img src="/image/question-photo3.jpg" />
        </div>
        <div className="img-content">
          <div className="img-info">
            <p>First.</p>
            <p className="img-title">
              나의 공간에 최적화된 디자이너를 선택해보세요
            </p>
            <p>
              디자이너의 경력과 포트폴리오를 확인하고, 나만의 공간을 완성할
              맞춤형 전문가를 선택하세요.
            </p>
          </div>
          <div className="img-info">
            <p>Second.</p>
            <p className="img-title">
              간단한 설문으로 인테리어 컨설팅을 받아보세요
            </p>
            <p>
              보다 정확한 컨설팅을 위해 공간 정보와 예산, 가구 활용 등에 대한
              간단한 설문을 진행합니다.
            </p>
          </div>
          <div className="img-info">
            <p>Final.</p>
            <p className="img-title">
              상담을 통해 맞춤 인테리어를 시작하고, 진행 상황을 단계별로 확인할
              수 있어요
            </p>
            <p>
              마이페이지에서 현재 인테리어 컨설팅의 진행 상황을 자세하게 볼 수
              있습니다.
            </p>
          </div>
        </div>
        <div className="question column">
          <div className="main-title">Q. 금액은 어떻게 되나요?</div>
          <div className="img-box com-img-box">
            <img src="/image/question2.png" />
          </div>
          <p>
            Atelierism은 공간의 유형과 규모에 따라 사전에 책정된{" "}
            <span>'정찰제'</span>를 적용하여,
            <br />
            모든 고객에게 동일한 조건과 가격으로 서비스를 제공합니다. <br />
            별도의 추가 비용 없이, 처음 안내해드린 금액 그대로 인테리어를
            완성해드립니다.
          </p>
          <Link to={"/company"}>
            회사 소개 페이지로 <ArrowForwardIos className="arrow-icon" />
          </Link>
        </div>

        <div className="com-board">
          <div className="main-title">공간을 만드는 디자이너</div>
          <p>
            맞춤형 공간을 완성할 전문가들의 경력, 포트폴리오를 확인해보세요.
          </p>
          <div className="com-board-list">
            <div className="com-board-list-btn">
              <a
                onClick={() => {
                  navigate("/designer/intro");
                }}
              >
                전체보기
                <ArrowForwardIos className="arrow-icon" />
              </a>
            </div>
            <div className="com-board-items">
              {designerBoard.map((designer, index) => {
                const memberId = designer.memberId;
                return (
                  <div
                    className="com-board-item"
                    key={"desinger-" + index}
                    onClick={() => {
                      navigate(`/designer/detail/${memberId}`);
                    }}
                  >
                    <div className="com-board-img-box">
                      {designer.memberThumb === null ? (
                        <img src="/image/designer-default.jpg" />
                      ) : (
                        <img
                          src={`${
                            import.meta.env.VITE_BACK_SERVER
                          }/memberProfile/${designer.memberThumb}`}
                        />
                      )}
                    </div>
                    <div className="com-board-info">
                      <div className="com-board-info-top">
                        <p>{designer.memberName}</p>
                      </div>
                      <p>{designer.designerIntroduce}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="com-img-banner-box">
        <img src="/image/interior-banner.jpg" />
      </div>
      <div className="main-content">
        <div className="com-board">
          <div className="main-title">사용자 경험 스토리</div>
          <p>실제 고객 경험을 기반으로 한 리뷰를 확인해보세요.</p>
          <div className="com-board-list">
            <div className="com-board-list-btn">
              <a
                onClick={() => {
                  navigate("/board/review");
                }}
              >
                전체보기
                <ArrowForwardIos className="arrow-icon" />
              </a>
            </div>
            <div className="com-board-items">
              {reviewList.map((review, index) => {
                return (
                  <div
                    className="com-board-item"
                    key={"review-" + index}
                    onClick={() => openReviewModal(review)}
                  >
                    <div className="com-board-img-box">
                      {review.reviewBoardThumbnail === null ? (
                        <img src="/image/customer-default.jpg" />
                      ) : (
                        <img
                          src={`${
                            import.meta.env.VITE_BACK_SERVER
                          }/board/review/thumbnail/${
                            review.reviewBoardThumbnail
                          }`}
                        />
                      )}
                    </div>
                    <div className="com-board-info">
                      <div className="main-review-board-info">
                        <p>{review.memberName}</p>
                        <p>{review.reviewBoardDate}</p>
                      </div>
                      <p>{review.reviewBoardTitle}</p>
                    </div>
                  </div>
                );
              })}
              {reviewModal && selectedReview && (
                <ReviewModalApp
                  board={selectedReview}
                  memberId={memberId}
                  onClose={closeReviewModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="top-btn-container">
        <button
          className="top-btn"
          onClick={handleTop} // 버튼 클릭시 함수 호출
        >
          <span className="material-symbols-outlined">
            vertical_align_top
          </span>
        </button>
      </div>
    </section>
  );
};

export default Main;
