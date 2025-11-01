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

const InteriorApplication = ({ onClose, ani, setAni, setIsInterior }) => {
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
    interiorWhyType: "",
    interiorPrice: 0,
    interiorPayment: 0,
  });
  const [priceList, setPriceList] = useState({});
  const [step, setStep] = useState(1); // 현재 단계
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/interior`)
      .then((res) => {
        setPriceList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
        const price =
          interior.interiorBed * priceList.priceBed +
          interior.interiorLiving * priceList.priceLiving +
          interior.interiorKitchen * priceList.priceKitchen +
          interior.interiorOneroom * priceList.priceOneroom +
          interior.interiorKidroom * priceList.priceKidroom +
          interior.interiorStudy * priceList.priceStudy;
        const newInterior = { ...interior, interiorPrice: price };
        setInterior(newInterior);
        setStep(3);
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
        return <InteriorDesigner setInterior={setInterior} onClose={onClose} />;
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
    if (interior.interiorWhy !== "" || interior.interiorWhyType !== "") {
      axios
        .post(`${import.meta.env.VITE_BACK_SERVER}/interior`, interior)
        .then((res) => {
          Swal.fire({
            title: "설문 완료!",
            text: "설문 조사가 저장되었습니다!",
            icon: "success",
            reverseButtons: true,
            showCancelButton: true,
            cancelButtonText: "닫기",
            confirmButtonText: "결제하러 가기",
            confirmButtonColor: " #8aa996",
          }).then((select) => {
            if (select.isConfirmed) {
              navigate("/interior/payPage");
            } else {
              navigate("/");
            }
            onClose();
            document.body.style.overflow = "auto";
            setIsInterior(1);
          });
        })
        .catch((err) => {
          console.log(err);
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
    if (interior.interiorDesigner !== "") {
      Swal.fire({
        title: "설문 나가기",
        text: "창을 닫을 시 지금까지 한 설문은 저장되지 않습니다.",
        icon: "warning",
        reverseButtons: true,
        showCancelButton: true,
        cancelButtonText: "머무르기",
        confirmButtonText: "나가기",
        confirmButtonColor: " #8aa996",
      }).then((select) => {
        if (select.isConfirmed) {
          onClose();
          document.body.style.overflow = "auto";
        }
      });
    } else {
      onClose();
      document.body.style.overflow = "auto";
    }
  };

  const usePreventRefresh = () => {
// 1. custom hook으로 사용할 함수를 하나 생성한다.
  const preventClose = (e) => {
  // 2. 해당 함수 안에 새로운 함수를 생성하는데, 이때 이 함수는 자바스크립트의 이벤트를 감지하게된다.
    e.preventDefault();
    // 2-1. 특정 이벤트에 대한 사용자 에이전트 (브라우저)의 기본 동작이 실행되지 않도록 막는다.
    e.returnValue = ''; 
    // 2-2. e.preventDefault를 통해서 방지된 이벤트가 제대로 막혔는지 확인할 때 사용한다고 한다.
    // 2-3. 더 이상 쓰이지 않지만, chrome 설정상 필요하다고 하여 추가함.
    // 2-4. returnValue가 true일 경우 이벤트는 그대로 실행되고, false일 경우 실행되지 않는다고 한다.
  };

  // 브라우저에 렌더링 시 한 번만 실행하는 코드
  useEffect(() => {
    (() => {
      window.addEventListener('beforeunload', preventClose);
      // 4. beforeunload 이벤트는 리소스가 사라지기 전 window 자체에서 발행한다.
      // 4-2. window의 이벤트를 감지하여 beforunload 이벤트 발생 시 preventClose 함수가 실행된다.
    })();

    return () => {
      window.removeEventListener('beforeunload', preventClose);
      // 5. 해당 이벤트 실행 후, beforeunload를 감지하는 것을 제거한다.
    };
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
      {usePreventRefresh()}
    </section>
  );
};

export default InteriorApplication;
