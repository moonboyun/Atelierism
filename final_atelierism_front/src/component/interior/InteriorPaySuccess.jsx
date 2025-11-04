import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

const InteriorPaySuccess = () => {
  const designerId = localStorage.getItem("interiorDesigner");
  const [designerLink, setDesignerLink] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const designerId = localStorage.getItem("interiorDesigner");
    return () => {
      localStorage.removeItem("interiorDesigner");
    };
  }, []);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/designer/${designerId}`)
      .then((res) => {
        setDesignerLink(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => window.scrollTo(0, 0), []);
  // 🎉 폭죽 효과 함수
  const handleConfetti = () => {
    const duration = 1500;
    const animationEnd = Date.now() + duration;

    const base = {
      particleCount: 100,
      spread: 100,
      startVelocity: 45,
      colors: ["#8aa996", "#f3d250"],
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...base,
        particleCount,
        origin: { x: 0.1, y: Math.random() - 0.2 },
        angle: 60, // 오른쪽 위로 쏨
      });

      confetti({
        ...base,
        particleCount,
        origin: { x: 0.9, y: Math.random() - 0.2 },
        angle: 120, // 왼쪽 위로 쏨
      });
    }, 250);
  };
  useEffect(() => {
    handleConfetti();
  }, []);

  return (
    <section className="section">
      <div className="payP-main-content">
        <div className="payP-order-box">
          <div className="orderI-info-box suc-box">
            <div>
              <div className="suc-title">결제가 완료되었습니다!</div>
              <div className="suc-sub-msg">
                디자이너의 카카오톡 프로필 링크를 보내드립니다.
              </div>
            </div>
            <div className="suc-link-box">
              <a href={designerLink} target="_blank">
                <span class="material-symbols-outlined">alternate_email</span>
                {designerLink}
              </a>
            </div>
            <div>
              <div className="suc-hidden-msg">
                마이페이지에서 다시 확인할 수 있습니다.
              </div>
              <div className="suc-btn-box">
                <button
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  메인페이지 가기
                </button>
                <button
                  onClick={() => {
                    navigate("/member/payment");
                  }}
                >
                  마이페이지 가기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteriorPaySuccess;
