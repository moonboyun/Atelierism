import { ArrowForwardIos, Clear } from "@mui/icons-material";
import "./interior.css";
import { Route, Routes } from "react-router-dom";
import InteriorDesigner from "./InteriorDesigner";
import { useEffect, useState } from "react";

const InteriorApplication = ({ onClose, ani, setAni }) => {
  const [step, setStep] = useState(1); // 현재 단계
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
  return (
    <section className="inter-section">
      <div className={ani ? "inter-content active" : "inter-content"}>
        <button onClick={onClose} style={{ float: "right" }}>
          <Clear className="inter-del-btn" />
        </button>
        {renderStep()}
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
