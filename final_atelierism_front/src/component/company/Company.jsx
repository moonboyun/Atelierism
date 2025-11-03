import { useEffect, useState } from "react";
import "./company.css";
import axios from "axios";

const Company = () => {
  const [price, setPrice] = useState({});
  const [slide, setSlide] = useState(0); // 슬라이드 위치
  const [maxSlide, setMaxSlide] = useState(0); // 최대 슬라이드 한계

  useEffect(() => {
    const cardCount = 6; // 현재 카드 개수
    const visibleWidth = 1920; // 보여지는 영역 너비 (px)
    const cardWidth = 1060; // 카드 이미지 + 패딩
    const gap = 60;
    const totalCardWidth = cardWidth + gap;
    const max = -(totalCardWidth * cardCount - visibleWidth);
    setMaxSlide(max);
  }, []);

  useEffect(() => {
    console.log("slide:", slide, "maxSlide:", maxSlide);
  }, [slide, maxSlide]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/admin/price`)
      .then((res) => {
        setPrice(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //페이지 이동 시 맨 위로 유지하는 기능
  useEffect(() => window.scrollTo(0, 0), []);

  // 클릭하면 스크롤이 위로 올라가는 함수
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="section" style={{ overflowX: "hidden" }}>
      <img src="/image/company-main.png" />
      <div className="main-content">
        <div className="company-main-title">
          Atelierism | 공간을 예술로 만드는, 가장 정직한 선택.
        </div>
        <div className="company-service-box">
          <img src="/image/company-service1.png" />
          <div className="company-service-info-box">
            <div>
              <div className="company-service-title">
                짧은 설문으로 시작되는, 가장 쉬운 맞춤 인테리어
              </div>
              <div className="company-service-sub-title">
                Atelierism Service 01
              </div>
            </div>
            <div className="company-service-info">
              <div className="company-text">
                좋은 디자인은 복잡하지 않아야 합니다.
                <br />
                Atelierism은 고객이 느끼는 첫 진입의 문턱을 낮추기 위해,긴 상담
                절차 대신 짧고 정교한 설문 시스템을 마련했습니다.
                <br />
                <br />
                디자이너를 선택한 후 단 몇 분의 응답만으로도, 당신의 공간 · 범위
                · 이유가 디자이너에게 전달됩니다.
                <br />
                <br />
                “쉬움” 속에서도 “정확함”을 놓치지 않는 것 —그것이 Atelierism이
                추구하는 접근성의 품격입니다.
              </div>
            </div>
          </div>
        </div>
        <div className="company-service-box company-row">
          <img src="/image/company-service2.png" />
          <div className="company-service-info-box">
            <div>
              <div className="company-service-title">
                디자이너의 세계를 손끝에서 탐색하다
              </div>
              <div className="company-service-sub-title">
                Atelierism Service 02
              </div>
            </div>
            <div className="company-service-info">
              <div className="company-text">
                인테리어의 품질은 결국, 디자이너의 감각에서 비롯됩니다.
                <br />
                <br />
                Atelierism은 디자이너 각각의 포트폴리오, 이력, 작품 철학을
                한눈에 볼 수 있는 프로필 시스템을 제공합니다.
                <br />
                <br />
                디자이너의 개성과 디자인 세계를 투명하게 공개함으로써, 고객은
                자신과 취향이 맞는 전문가를 직접 선택할 수 있습니다.
                <br />
                <br />
                신뢰는 정보에서 시작되고, 아름다움은 그 만남에서 완성됩니다.
                <br />
                Atelierism이 그 연결의 가치를 세심하게 디자인합니다.
              </div>
            </div>
          </div>
        </div>
        <div className="company-service-box company-column">
          <img src="/image/company-service3.png" />
          <div className="company-service-info-box">
            <div>
              <div className="company-service-title">
                작품보기, 그 전후의 차이로 증명되는 디자인의 힘
              </div>
              <div className="company-service-sub-title">
                Atelierism Service 03
              </div>
            </div>
            <div className="company-service-info">
              <div className="company-text">
                공간이 바뀌면, 삶의 분위기도 달라집니다.
                <br />
                Atelierism의 ‘작품보기’ 서비스에서는
                <br />
                <br />
                디자이너들이 완성한 실제 인테리어의 Before & After를 한눈에 볼
                수 있습니다.
                <br />
                단순히 예쁜 사진이 아니라,
                <br />
                디자인이 어떻게 공간을 재구성하고,
                <br />
                생활의 품질을 어떻게 바꾸는지를 시각적으로 체감할 수 있습니다.
                <br />
                <br />
                변화의 설렘과 결과의 감동을 미리 경험하세요.
                <br />
                당신의 공간도, 다음 이야기를 기다리고 있습니다.
              </div>
            </div>
          </div>
        </div>
      </div>
      <img className="company-banner" src="/image/company-banner.png" />
      <div className="company-price-box">
        <div className="company-service-title">정찰제, 신뢰를 디자인하다.</div>
        <div className="company-text">
          Atelierism은 '합리적인 고정가'를 통해 디자인의 가치를 명확하게
          전합니다.
        </div>
        <div
          className="company-price-card-wrap"
          style={{
            transform: `translateX(${slide}px)`,
            transition: "transform 0.6s ease", // 부드럽게 이동
          }}
          onClick={(e) => {
            const clickX = e.clientX; // 클릭한 x좌표
            const screenCenter = window.innerWidth / 2; // 화면 중앙

            if (clickX > screenCenter) {
              // 👉 오른쪽 클릭 시
              setSlide((prev) =>
                prev - 1000 < maxSlide ? maxSlide : prev - 1000
              );
            } else {
              // 👈 왼쪽 클릭 시
              setSlide((prev) => (prev + 1000 > 0 ? 0 : prev + 1000));
            }
          }}
        >
          {[
            {
              img: "/image/company-living.png",
              title: "거실",
              desc: "가장 많은 시간을 보내는 공간, 가장 따듯하게 완성합니다.",
              price: price.priceLiving,
            },
            {
              img: "/image/company-kitchen.png",
              title: "부엌",
              desc: "기능과 동선, 감각이 공존하는 공간.",
              price: price.priceKitchen,
            },
            {
              img: "/image/company-bed.png",
              title: "침실",
              desc: "휴식과 안정감을 담은 프라이빗한 공간.",
              price: price.priceBed,
            },
            {
              img: "/image/company-oneroom.png",
              title: "원룸",
              desc: "감각적인 일상 속, 나를 위한 작은 안식처.",
              price: price.priceOneroom,
            },
            {
              img: "/image/company-kidroom.png",
              title: "아이방",
              desc: "성장과 상상이 함께 자라는 공간.",
              price: price.priceKidroom,
            },
            {
              img: "/image/company-study.png",
              title: "서재",
              desc: "집중과 영감이 머무는 조용한 공간.",
              price: price.priceStudy,
            },
          ].map((item, idx) => (
            <div key={idx} className="company-price-card">
              <img src={item.img} alt={item.title} />
              <div className="comapny-price-info">
                <div className="company-space">
                  <div className="company-service-title">{item.title}</div>
                  <div className="company-text">{item.desc}</div>
                </div>
                <div className="company-price-wrap">
                  <div className="company-price">
                    {Number(item.price).toLocaleString()}
                  </div>
                  <div>원</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="company-price-text">
          모든 가격은 부가세 포함이며, 디자인 컨설팅·시공까지 일괄 제공됩니다.
        </div>
      </div>
      <div className="top-btn-container">
        <button
          className="top-btn"
          onClick={handleTop} // 버튼 클릭시 함수 호출
        >
          <span className="material-symbols-outlined">vertical_align_top</span>
        </button>
      </div>
    </section>
  );
};
export default Company;
