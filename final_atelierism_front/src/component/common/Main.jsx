import {
  ArrowBackIosNew,
  ArrowForwardIos,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });

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
          <a>
            회사 소개 페이지로 <ArrowForwardIos className="arrow-icon" />
          </a>
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
              {designerBoard.map((desiger, index) => {
                return (
                  <div className="com-board-item" key={"desinger-" + index}>
                    <div className="com-board-img-box">
                      {desiger.memberThumb === null ? (
                        <img src="/image/designer-default.jpg" />
                      ) : (
                        <img
                          src={`${
                            import.meta.env.VITE_BACK_SERVER
                          }/memberProfile/${desiger.memberThumb}`}
                        />
                      )}
                    </div>
                    <div className="com-board-info">
                      <div className="com-board-info-top">
                        <p>{desiger.memberName}</p>
                      </div>
                      <p>{desiger.designerIntroduce}</p>
                      {console.log(desiger)}
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
              <div className="com-board-item">
                <div className="com-board-img-box">
                  <img src="/image/customer-default.jpg" />
                </div>
                <div className="com-board-info">
                  <p>이OO</p>
                  <p>
                    이OO님한테 인테리어 맡겼는데 너무 좋아요.. 제 집이 아닌것
                    같아요!
                  </p>
                </div>
              </div>
              <div className="com-board-item">
                <div className="com-board-img-box">
                  <img src="/image/customer-default.jpg" />
                </div>
                <div className="com-board-info">
                  <p>이OO</p>
                  <p>
                    이OO님한테 인테리어 맡겼는데 너무 좋아요.. 제 집이 아닌것
                    같아요!
                  </p>
                </div>
              </div>
              <div className="com-board-item">
                <div className="com-board-img-box">
                  <img src="/image/customer-default.jpg" />
                </div>
                <div className="com-board-info">
                  <p>이OO</p>
                  <p>
                    이OO님한테 인테리어 맡겼는데 너무 좋아요.. 제 집이 아닌것
                    같아요!
                  </p>
                </div>
              </div>
              <div className="com-board-item">
                <div className="com-board-img-box">
                  <img src="/image/customer-default.jpg" />
                </div>
                <div className="com-board-info">
                  <p>이OO</p>
                  <p>
                    이OO님한테 인테리어 맡겼는데 너무 좋아요.. 제 집이 아닌것
                    같아요!
                  </p>
                </div>
              </div>
              <div className="com-board-item">
                <div className="com-board-img-box">
                  <img src="/image/customer-default.jpg" />
                </div>
                <div className="com-board-info">
                  <p>이OO</p>
                  <p>
                    이OO님한테 인테리어 맡겼는데 너무 좋아요.. 제 집이 아닌것
                    같아요!
                  </p>
                </div>
              </div>
              <div className="com-board-item">
                <div className="com-board-img-box">
                  <img src="/image/customer-default.jpg" />
                </div>
                <div className="com-board-info">
                  <p>이OO</p>
                  <p>
                    이OO님한테 인테리어 맡겼는데 너무 좋아요.. 제 집이 아닌것
                    같아요!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
