import { ArrowForwardIos, Clear } from "@mui/icons-material";
import "./interior.css";
import InteriorDesigner from "./InteriorDesigner";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import InteriorSpace from "./InteriorSpace";

const InteriorApplication = ({ onClose, ani, setAni }) => {
  const [interior, setInterior] = useState({
    designerId: "",
    customerId: "",
    living: 0,
    kitchen: 0,
    bedroom: 0,
    oneroom: 0,
    kidroom: 0,
    study: 0,
    range: 0,
    why: "",
    price: 0,
    paymentCheck: 0,
  });
  console.log(interior);
  const [step, setStep] = useState(1); // 현재 단계
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const nextStep = () => {
    if (interior.designerId !== "") {
      setStep(2);
    } else {
      Swal.fire({
        title: "디자이너 선택 확인",
        text: "디자이너 선택을 확인해주세요.",
        icon: "info",
        confirmButtonText: "확인",
      });
    }
  };
  const renderStep = () => {
    switch (step) {
      case 1:
        return <InteriorDesigner setInterior={setInterior} />;
      case 2:
        return <InteriorSpace setInterior={setInterior} />;
      // case 3:
      //   return <AnotherComponent />;
      default:
        return <InteriorDesigner setInterior={setInterior} />;
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
