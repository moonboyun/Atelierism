import { ArrowForwardIos, Clear } from "@mui/icons-material";
import "./interior.css";
import InteriorDesigner from "./InteriorDesigner";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import InteriorSpace from "./InteriorSpace";
import InteriorRange from "./InteriorRange";
import InteriorWhy from "./InteriorWhy";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InteriorApplication = ({ onClose, ani, setAni }) => {
  const [interior, setInterior] = useState({
    interiorDesigner: "",
    interiorCustomer: "",
    interiorLiving: 0,
    interiorKitchen: 0,
    interiorBed: 0,
    interiorOneroom: 0,
    interiorKidroom: 0,
    interiorStudy: 0,
    interiorRange: 0,
    interiorWhy: "",
    interiorPrice: 0,
    interiorPayment: 0,
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
    if (interior.interiorDesigner !== "") {
      setStep(2);
      if (
        interior.interiorBed !== 0 ||
        interior.interiorLiving !== 0 ||
        interior.interiorKitchen !== 0 ||
        interior.interiorOneroom !== 0 ||
        interior.interiorKidroom !== 0 ||
        interior.interiorStudy !== 0
      ) {
        setStep(3);
        axios
          .get(`${import.meta.env.VITE_BACK_SERVER}/interior`)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        if (interior.interiorRange !== 0) {
          setStep(4);
        } else if (step === 3) {
          Swal.fire({
            title: "인테리어 범위 확인",
            text: "인테리어 범위를 확인해주세요.",
            icon: "info",
            confirmButtonText: "확인",
          });
        }
      } else if (step === 2) {
        Swal.fire({
          title: "인테리어 공간 확인",
          text: "인테리어 공간을 확인해주세요.",
          icon: "info",
          confirmButtonText: "확인",
        });
      }
    } else {
      Swal.fire({
        title: "디자이너 확인",
        text: "디자이너를 확인해주세요.",
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
        return <InteriorSpace setInterior={setInterior} interior={interior} />;
      case 3:
        return <InteriorRange setInterior={setInterior} interior={interior} />;
      case 4:
        return <InteriorWhy setInterior={setInterior} interior={interior} />;
      default:
        return <InteriorDesigner setInterior={setInterior} />;
    }
  };
  const navigate = useNavigate();
  const payPage = () => {
    if (interior.interiorWhy !== "") {
      Swal.fire({
        title: "설문 완료!",
        text: "설문 조사가 저장되었습니다!",
        icon: "success",
        reverseButtons: true,
        showCancelButton: true,
        cancelButtonText: "닫기",
        confirmButtonText: "결제하러 가기",
      }).then((select) => {
        if (select.isConfirmed) {
          navigate("/interior/payPage", {
            state: { interior },
          });
        } else {
          navigate("/");
        }
      });
    } else if (step === 4) {
      Swal.fire({
        title: "인테리어 이유 확인",
        text: "인테리어 이유를 확인해주세요.",
        icon: "info",
        confirmButtonText: "확인",
      });
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
          {step !== 4 ? (
            <button className="inter-next-btn" onClick={nextStep}>
              다음 <ArrowForwardIos />
            </button>
          ) : (
            <button className="inter-next-btn" onClick={payPage}>
              완료
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default InteriorApplication;
