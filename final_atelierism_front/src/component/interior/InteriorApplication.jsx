import { ArrowForwardIos, Clear } from "@mui/icons-material";
import "./interior.css";
import { Route, Routes } from "react-router-dom";
import InteriorDesigner from "./InteriorDesigner";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const InteriorApplication = ({ onClose, ani, setAni }) => {
  const [step, setStep] = useState(1); // 현재 단계
  document.body.style.overflow = "hidden";
  const nextStep = () => {
    setStep((prev) => prev + 1);
  };
  const renderStep = () => {
    switch (step) {
      case 1:
        return <InteriorDesigner />;
      // case 2:
      //   return <NextComponent />;
      // case 3:
      //   return <AnotherComponent />;
      default:
        return <InteriorDesigner />;
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAni(true);
    }, 10); // 아주 짧게 딜레이

    return () => clearTimeout(timeout);
  }, []);
  const closedModal = () => {
    Swal.fire({
      title: "설문 나가기",
      text: "창을 닫을 시 지금까지 한 설문은 저장되지 않습니다.",
      icon: "warning",
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: "닫기",
      confirmButtonText: "나가기",
    }).then((select) => {
      if (select.isConfirmed) {
        onClose();
        document.body.style.overflow = "auto";
      }
    });
  };
  return (
    <section className="inter-section">
      <div className={ani ? "inter-content active" : "inter-content"}>
        <button onClick={closedModal} style={{ float: "right" }}>
          <Clear className="inter-del-btn" />
        </button>
        <div
          className={ani ? "inter-content-info appear" : "inter-content-info"}
        >
          {renderStep()}
        </div>
        <div className="inter-next-box">
          <button className="inter-next-btn" onClick={nextStep}>
            다음 <ArrowForwardIos />
          </button>
        </div>
      </div>
    </section>
  );
};

export default InteriorApplication;
