import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
              <Link to={designerLink}>
                <span class="material-symbols-outlined">alternate_email</span>
                {designerLink}카카오 프로필 링크
              </Link>
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
