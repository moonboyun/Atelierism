import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isInteriorState, loginIdState } from "../utils/RecoilData";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const InteriorPayPage = () => {
  const backServer = import.meta.env.VITE_BACK_SERVER;
  const [memberId, setMemberId] = useRecoilState(loginIdState); //로그인 한 회원 아이디
  const [isInterior, setIsInterior] = useRecoilState(isInteriorState); //인테리어 정보 있는 지 체크
  const [member, setMember] = useState({}); //로그인한 회원의 정보
  const [interior, setInterior] = useState({}); //db에 저장된 인테리어 정보
  const [updateInterior, setUpdateInterior] = useState({}); //db에 업데이트할 인테리어 정보
  const [price, setPrice] = useState({}); //현재 정찰제 가격표
  const [designerList, setDesignerList] = useState([]); //디자이너 리스트
  const [memberList, setMemberList] = useState([]); //디자이너의 회원 정보 리스트
  useEffect(() => {
    if (!memberId || updateInterior.interiorNo) return;
    axios
      .post(`${backServer}/interior/${memberId}`)
      .then((res) => {
        setInterior(res.data.interior);
        setMember(res.data.member);
        setPrice(res.data.price);
        setUpdateInterior(res.data.interior);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [memberId, updateInterior.interiorNo]);
  useEffect(() => {
    if (
      updateInterior.interiorWhy !== "이사를 준비하고 있어요." &&
      updateInterior.interiorWhy !==
        "신혼집을 구해 인테리어를 준비하고 있어요." &&
      updateInterior.interiorWhy !==
        "살고 있는 집을 새롭게 인테리어하고 싶어요." &&
      updateInterior.interiorWhy !==
        "전문가의 인테리어 감각에 도움을 받고 싶어요."
    ) {
      setUpdateInterior((prev) => ({
        ...prev,
        interiorWhyType: "다른 이유가 있어요.(기타)",
      }));
    }
  }, [updateInterior.interiorWhy]);
  useEffect(() => {
    if (
      interior.interiorNo && // 데이터 로드가 완료되었는지 확인
      interior.interiorWhy === "다른 이유가 있어요.(기타)" &&
      updateInterior.interiorWhyType !== "다른 이유가 있어요.(기타)"
    ) {
      setUpdateInterior((prev) => ({
        ...prev,
        interiorWhy: "",
        interiorWhyType: "다른 이유가 있어요.(기타)",
      }));
    }
  }, [interior.interiorNo, interior.interiorWhy, updateInterior.interiorNo]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/designer`)
      .then((res) => {
        setDesignerList(res.data.designerList);
        setMemberList(res.data.memberList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log("interior : ", interior);
  console.log("updateInterior : ", updateInterior);
  return (
    <section className="section">
      <div className="payP-main-content">
        <div className="payP-order-box">
          <OrderInfo
            member={member}
            updateInterior={updateInterior}
            setUpdateInterior={setUpdateInterior}
            price={price}
          />
          <div className="payP-Designer-pay-box">
            <DesignerInfo
              designerList={designerList}
              memberList={memberList}
              updateInterior={updateInterior}
              setUpdateInterior={setUpdateInterior}
            />
            <PayInfo
              interior={interior}
              setIsInterior={setIsInterior}
              updateInterior={updateInterior}
              setUpdateInterior={setUpdateInterior}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
const OrderInfo = (props) => {
  const member = props.member;
  const updateInterior = props.updateInterior;
  const setUpdateInterior = props.setUpdateInterior;
  const price = props.price;
  const spacePlus = (e) => {
    const button = e.currentTarget; // 클릭된 버튼 자체
    const value = Number(button.value);
    const name = button.name;
    setUpdateInterior((prev) => ({ ...prev, [name]: prev[name] + value }));
  };

  const spaceMinus = (e) => {
    const button = e.currentTarget; // 클릭된 버튼 자체
    const value = Number(button.value);
    const name = button.name;
    setUpdateInterior((prev) => ({ ...prev, [name]: prev[name] - value }));
  };

  const interiorInfoCheck = (e) => {
    const name = e.target.name;
    const rawValue = e.target.value;
    if (rawValue === "") {
      setUpdateInterior((prev) => ({ ...prev, [name]: "" }));
    } else if (isNaN(Number(rawValue))) {
      setUpdateInterior((prev) => ({ ...prev, [name]: rawValue }));
    } else {
      const value = Number(rawValue);
      setUpdateInterior((prev) => ({ ...prev, [name]: value }));
    }
  };
  const interiorWhyCheck = (e) => {
    setUpdateInterior((prev) => ({
      ...prev,
      interiorWhyType: "",
      interiorWhy: e.target.value,
    }));
  };

  const interiorWhyTypeCheck = (e) => {
    setUpdateInterior((prev) => ({
      ...prev,
      interiorWhyType: e.target.value, // "다른 이유가 있어요.(기타)"
      interiorWhy: "", // 텍스트 input에 값을 받기 위해 빈 문자열로 초기화
    }));
  };

  useEffect(() => {
    if (!updateInterior || !price) return;

    const total =
      (price.priceLiving || 0) * (updateInterior.interiorLiving || 0) +
      (price.priceKitchen || 0) * (updateInterior.interiorKitchen || 0) +
      (price.priceBed || 0) * (updateInterior.interiorBed || 0) +
      (price.priceOneroom || 0) * (updateInterior.interiorOneroom || 0) +
      (price.priceKidroom || 0) * (updateInterior.interiorKidroom || 0) +
      (price.priceStudy || 0) * (updateInterior.interiorStudy || 0);

    setUpdateInterior((prev) => ({ ...prev, interiorPrice: total }));
  }, [
    updateInterior.interiorLiving,
    updateInterior.interiorKitchen,
    updateInterior.interiorBed,
    updateInterior.interiorOneroom,
    updateInterior.interiorKidroom,
    updateInterior.interiorStudy,
    price,
  ]);

  return (
    <div className="orderI-info-box">
      <div className="orderI-member-box">
        <span className="pay-title">주문</span>
        <span>{member.memberName}</span>
      </div>
      <div className="orderI-interior-space-box">
        <span>공간</span>
        <span>갯수</span>
        <span>가격</span>
      </div>
      <div className="orderI-interior-space-price-all">
        <div
          className="orderI-interior-space-price-box"
          style={updateInterior.interiorLiving === 0 ? { display: "none" } : {}}
        >
          <div className="orderI-group-box">
            <span className="material-symbols-outlined">scene</span>
            <span>거실</span>
          </div>
          <div className="orderI-group-box">
            <button name="interiorLiving" value={1} onClick={spaceMinus}>
              <span className="material-symbols-outlined">remove</span>
            </button>
            <span>{updateInterior.interiorLiving}</span>
            <button name="interiorLiving" value={1} onClick={spacePlus}>
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
          <div className="orderI-group-box">
            <span>
              {Number(
                price.priceLiving * updateInterior.interiorLiving
              ).toLocaleString()}{" "}
              원
            </span>
          </div>
        </div>

        <div
          className="orderI-interior-space-price-box"
          style={
            updateInterior.interiorKitchen === 0 ? { display: "none" } : {}
          }
        >
          <div className="orderI-group-box">
            <span className="material-symbols-outlined">dine_lamp</span>
            <span>부엌</span>
          </div>
          <div className="orderI-group-box">
            <button name="interiorKitchen" value={1} onClick={spaceMinus}>
              <span className="material-symbols-outlined">remove</span>
            </button>
            <span>{updateInterior.interiorKitchen}</span>
            <button name="interiorKitchen" value={1} onClick={spacePlus}>
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
          <div className="orderI-group-box">
            <span>
              {Number(
                price.priceKitchen * updateInterior.interiorKitchen
              ).toLocaleString()}{" "}
              원
            </span>
          </div>
        </div>

        <div
          className="orderI-interior-space-price-box"
          style={updateInterior.interiorBed === 0 ? { display: "none" } : {}}
        >
          <div className="orderI-group-box">
            <span className="material-symbols-outlined">bed</span>
            <span>안방</span>
          </div>
          <div className="orderI-group-box">
            <button name="interiorBed" value={1} onClick={spaceMinus}>
              <span className="material-symbols-outlined">remove</span>
            </button>
            <span>{updateInterior.interiorBed}</span>
            <button name="interiorBed" value={1} onClick={spacePlus}>
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
          <div className="orderI-group-box">
            <span>
              {Number(
                price.priceBed * updateInterior.interiorBed
              ).toLocaleString()}{" "}
              원
            </span>
          </div>
        </div>

        <div
          className="orderI-interior-space-price-box"
          style={
            updateInterior.interiorOneroom === 0 ? { display: "none" } : {}
          }
        >
          <div className="orderI-group-box">
            <span className="material-symbols-outlined">hotel</span>
            <span>원룸</span>
          </div>
          <div className="orderI-group-box">
            <button name="interiorOneroom" value={1} onClick={spaceMinus}>
              <span className="material-symbols-outlined">remove</span>
            </button>
            <span>{updateInterior.interiorOneroom}</span>
            <button name="interiorOneroom" value={1} onClick={spacePlus}>
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
          <div className="orderI-group-box">
            <span>
              {Number(
                price.priceOneroom * updateInterior.interiorOneroom
              ).toLocaleString()}{" "}
              원
            </span>
          </div>
        </div>

        <div
          className="orderI-interior-space-price-box"
          style={
            updateInterior.interiorKidroom === 0 ? { display: "none" } : {}
          }
        >
          <div className="orderI-group-box">
            <span className="material-symbols-outlined">child_hat</span>
            <span>아이방</span>
          </div>
          <div className="orderI-group-box">
            <button name="interiorKidroom" value={1} onClick={spaceMinus}>
              <span className="material-symbols-outlined">remove</span>
            </button>
            <span>{updateInterior.interiorKidroom}</span>
            <button name="interiorKidroom" value={1} onClick={spacePlus}>
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
          <div className="orderI-group-box">
            <span>
              {Number(
                price.priceKidroom * updateInterior.interiorKidroom
              ).toLocaleString()}{" "}
              원
            </span>
          </div>
        </div>

        <div
          className="orderI-interior-space-price-box"
          style={updateInterior.interiorStudy === 0 ? { display: "none" } : {}}
        >
          <div className="orderI-group-box">
            <span className="material-symbols-outlined">menu_book</span>
            <span>서재</span>
          </div>
          <div className="orderI-group-box">
            <button name="interiorStudy" value={1} onClick={spaceMinus}>
              <span className="material-symbols-outlined">remove</span>
            </button>
            <span>{updateInterior.interiorStudy}</span>
            <button name="interiorStudy" value={1} onClick={spacePlus}>
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
          <div className="orderI-group-box">
            <span>
              {Number(
                price.priceStudy * updateInterior.interiorStudy
              ).toLocaleString()}{" "}
              원
            </span>
          </div>
        </div>
      </div>
      <div className="orderI-sub-title">인테리어 공간</div>
      <div className="orderI-interior-check-box">
        <div className="orderI-interior-items">
          <label>
            <div
              className={
                updateInterior.interiorLiving >= 1
                  ? "orderI-interior-item payI-checked"
                  : "orderI-interior-item"
              }
            >
              <span className="material-symbols-outlined">scene</span>
              <input
                type="checkbox"
                id="interiorLiving"
                name="interiorLiving"
                value={updateInterior.interiorLiving >= 1 ? 0 : 1}
                onChange={interiorInfoCheck}
                style={{ display: "none" }}
              ></input>
              <span>거실</span>
            </div>
          </label>
          <label>
            <div
              className={
                updateInterior.interiorKitchen >= 1
                  ? "orderI-interior-item payI-checked"
                  : "orderI-interior-item"
              }
            >
              <span className="material-symbols-outlined">dine_lamp</span>
              <input
                type="checkbox"
                id="interiorKitchen"
                name="interiorKitchen"
                value={updateInterior.interiorKitchen >= 1 ? 0 : 1}
                onChange={interiorInfoCheck}
                style={{ display: "none" }}
              ></input>
              <span>부엌</span>
            </div>
          </label>
          <label>
            <div
              className={
                updateInterior.interiorBed >= 1
                  ? "orderI-interior-item payI-checked"
                  : "orderI-interior-item"
              }
            >
              <span className="material-symbols-outlined">bed</span>
              <input
                type="checkbox"
                id="interiorBed"
                name="interiorBed"
                value={updateInterior.interiorBed >= 1 ? 0 : 1}
                onChange={interiorInfoCheck}
                style={{ display: "none" }}
              ></input>
              <span>안방</span>
            </div>
          </label>
        </div>

        <div className="orderI-interior-items">
          <label>
            <div
              className={
                updateInterior.interiorOneroom >= 1
                  ? "orderI-interior-item payI-checked"
                  : "orderI-interior-item"
              }
            >
              <span className="material-symbols-outlined">hotel</span>
              <input
                type="checkbox"
                id="interiorOneroom"
                name="interiorOneroom"
                value={updateInterior.interiorOneroom >= 1 ? 0 : 1}
                onChange={interiorInfoCheck}
                style={{ display: "none" }}
              ></input>
              <span>원룸</span>
            </div>
          </label>
          <label>
            <div
              className={
                updateInterior.interiorKidroom >= 1
                  ? "orderI-interior-item payI-checked"
                  : "orderI-interior-item"
              }
            >
              <span className="material-symbols-outlined">child_hat</span>
              <input
                type="checkbox"
                id="interiorKidroom"
                name="interiorKidroom"
                value={updateInterior.interiorKidroom >= 1 ? 0 : 1}
                onChange={interiorInfoCheck}
                style={{ display: "none" }}
              ></input>
              <span>아이방</span>
            </div>
          </label>
          <label>
            <div
              className={
                updateInterior.interiorStudy >= 1
                  ? "orderI-interior-item payI-checked"
                  : "orderI-interior-item"
              }
            >
              <span className="material-symbols-outlined">menu_book</span>
              <input
                type="checkbox"
                id="interiorStudy"
                name="interiorStudy"
                value={updateInterior.interiorStudy >= 1 ? 0 : 1}
                onChange={interiorInfoCheck}
                style={{ display: "none" }}
              ></input>
              <span>서재</span>
            </div>
          </label>
        </div>
      </div>

      <div className="orderI-sub-title">인테리어 범위</div>
      <div className="orderI-interior-check-box">
        <div className="orderI-interior-items">
          <label>
            <div
              className={
                updateInterior.interiorRange === 1
                  ? "orderI-interior-item orderI-center payI-checked"
                  : "orderI-interior-item orderI-center"
              }
            >
              <input
                type="radio"
                id="interiorRange1"
                name="interiorRange"
                value={1}
                onChange={interiorInfoCheck}
                style={{ display: "none" }}
              ></input>
              <span>완전히 새롭게</span>
            </div>
          </label>
          <label>
            <div
              className={
                updateInterior.interiorRange === 2
                  ? "orderI-interior-item orderI-center payI-checked"
                  : "orderI-interior-item orderI-center"
              }
            >
              <input
                type="radio"
                id="interiorRange2"
                name="interiorRange"
                value={2}
                onChange={interiorInfoCheck}
                style={{ display: "none" }}
              ></input>
              <span>몇 가지 가구 유지</span>
            </div>
          </label>
          <label>
            <div
              className={
                updateInterior.interiorRange === 3
                  ? "orderI-interior-item orderI-center payI-checked"
                  : "orderI-interior-item orderI-center"
              }
            >
              <input
                type="radio"
                id="interiorRange3"
                name="interiorRange"
                value={3}
                onChange={interiorInfoCheck}
                style={{ display: "none" }}
              ></input>
              <span>가구 다 유지</span>
            </div>
          </label>
        </div>
      </div>

      <div className="orderI-sub-title">인테리어 컨설팅 하는 이유</div>
      <div className="orderI-interior-check-box border-none">
        <div className="orderI-interior-items">
          <label>
            <div
              className={
                updateInterior.interiorWhy === "이사를 준비하고 있어요."
                  ? "orderI-interior-item orderI-center payI-checked"
                  : "orderI-interior-item orderI-center"
              }
            >
              <input
                type="radio"
                id="interiorWhy1"
                name="interiorWhy"
                value={"이사를 준비하고 있어요."}
                onChange={interiorWhyCheck}
                style={{ display: "none" }}
              ></input>
              <span>이사준비</span>
            </div>
          </label>
          <label>
            <div
              className={
                updateInterior.interiorWhy ===
                "신혼집을 구해 인테리어를 준비하고 있어요."
                  ? "orderI-interior-item orderI-center payI-checked"
                  : "orderI-interior-item orderI-center"
              }
            >
              <input
                type="radio"
                id="interiorWhy2"
                name="interiorWhy"
                value={"신혼집을 구해 인테리어를 준비하고 있어요."}
                onChange={interiorWhyCheck}
                style={{ display: "none" }}
              ></input>
              <span>신혼집</span>
            </div>
          </label>
          <label>
            <div
              className={
                updateInterior.interiorWhy ===
                "살고 있는 집을 새롭게 인테리어하고 싶어요."
                  ? "orderI-interior-item orderI-center payI-checked"
                  : "orderI-interior-item orderI-center"
              }
            >
              <input
                type="radio"
                id="interiorWhy3"
                name="interiorWhy"
                value={"살고 있는 집을 새롭게 인테리어하고 싶어요."}
                onChange={interiorWhyCheck}
                style={{ display: "none" }}
              ></input>
              <span>리모델링</span>
            </div>
          </label>
        </div>

        <div className="orderI-interior-items orderI-evenly">
          <label>
            <div
              className={
                updateInterior.interiorWhy ===
                "전문가의 인테리어 감각에 도움을 받고 싶어요."
                  ? "orderI-interior-item orderI-center payI-checked"
                  : "orderI-interior-item orderI-center"
              }
            >
              <input
                type="radio"
                id="interiorWhy4"
                name="interiorWhy"
                value={"전문가의 인테리어 감각에 도움을 받고 싶어요."}
                onChange={interiorWhyCheck}
                style={{ display: "none" }}
              ></input>
              <span>전문가의 도움</span>
            </div>
          </label>
          <label>
            <div
              className={
                updateInterior.interiorWhyType === "다른 이유가 있어요.(기타)"
                  ? "orderI-interior-item orderI-center payI-checked"
                  : "orderI-interior-item orderI-center"
              }
            >
              <input
                type="radio"
                id="interiorWhy5"
                name="interiorWhy"
                value={"다른 이유가 있어요.(기타)"}
                onChange={interiorWhyTypeCheck}
                style={{ display: "none" }}
              ></input>
              <span>다른 이유</span>
            </div>
          </label>
        </div>
        {updateInterior.interiorWhyType === "다른 이유가 있어요.(기타)" && (
          <div className="orderI-interior-Why">
            <label htmlFor="interiorWhy">이유</label>
            <input
              type="text"
              name="interiorWhy"
              value={updateInterior.interiorWhy}
              onChange={interiorInfoCheck}
              placeholder="이유를 입력해주세요.(100자 이내)"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const DesignerInfo = (props) => {
  const designerList = props.designerList;
  const memberList = props.memberList;
  const updateInterior = props.updateInterior;
  const setUpdateInterior = props.setUpdateInterior;
  const [moreDesigner, setMoreDesigner] = useState(3);
  const designerCheck = (e) => {
    const value = e.target.value;
    setUpdateInterior((prev) => ({ ...prev, interiorDesigner: value }));
  };
  return (
    <div className="designerI-info-box">
      <div className="designerI-title">디자이너 선택</div>
      <div className="designerI-items">
        {designerList.slice(0, moreDesigner).map((designer, index) => {
          const matchedMember = memberList.find(
            (member) => member.memberId === designer.memberId
          );
          if (!matchedMember) return null;
          return (
            <label key={"designer-" + index}>
              <div
                className={
                  designer.memberId === updateInterior.interiorDesigner
                    ? "designerI-item payI-checked"
                    : "designerI-item"
                }
              >
                <input
                  type="radio"
                  id="interiorDesigner-1"
                  name="interiorDesigner"
                  value={designer.memberId}
                  onChange={designerCheck}
                  style={{ display: "none" }}
                ></input>
                <img src="/image/default_image.png" />
                <div className="designerI-info">
                  <div className="designerI-name-career">
                    <span>{matchedMember.memberName}</span>
                    <span>경력 | {designer.designerCareer}년</span>
                  </div>
                  <span className="designerI-introduce">
                    {designer.designerIntroduce}
                  </span>
                </div>
              </div>
            </label>
          );
        })}
      </div>
      {
        <div className="designerI-more-btn">
          <button onClick={() => setMoreDesigner(moreDesigner + 3)}>
            더보기
          </button>
        </div>
      }
    </div>
  );
};

const PayInfo = (props) => {
  const interior = props.interior;
  const setIsInterior = props.setIsInterior;
  const updateInterior = props.updateInterior;
  const setUpdateInterior = props.setUpdateInterior;
  const [payConsent, setPayConsent] = useState(false);
  const navigate = useNavigate();
  const delInterior = () => {
    Swal.fire({
      title: "장바구니 삭제",
      text: "장바구니 삭제하시겠습니까?",
      icon: "warning",
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: "닫기",
      confirmButtonText: "삭제하기",
      confirmButtonColor: " #8aa996",
    }).then((select) => {
      if (select.isConfirmed) {
        axios
          .delete(
            `${import.meta.env.VITE_BACK_SERVER}/interior/${
              interior.interiorNo
            }`
          )
          .then((res) => {
            Swal.fire({
              title: "삭제 완료!",
              text: "장바구니 삭제가 완료되었습니다.",
              icon: "success",
              timer: 1500,
              confirmButtonText: "닫기",
              confirmButtonColor: " #8aa996",
            });
            setIsInterior(false);
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  const isSame =
    interior.interiorDesigner === updateInterior.interiorDesigner &&
    interior.interiorLiving === updateInterior.interiorLiving &&
    interior.interiorKitchen === updateInterior.interiorKitchen &&
    interior.interiorBed === updateInterior.interiorBed &&
    interior.interiorOneroom === updateInterior.interiorOneroom &&
    interior.interiorKidroom === updateInterior.interiorKidroom &&
    interior.interiorStudy === updateInterior.interiorStudy &&
    interior.interiorRange === updateInterior.interiorRange &&
    interior.interiorWhy === updateInterior.interiorWhy &&
    // 💡 '다른 이유' 타입 비교 추가
    (interior.interiorWhyType || "") ===
      (updateInterior.interiorWhyType || "") &&
    interior.interiorPrice === updateInterior.interiorPrice;
  const delUpdate = () => {
    setUpdateInterior(interior);
  };
  const updateInter = () => {
    axios
      .patch(`${import.meta.env.VITE_BACK_SERVER}/interior`, updateInterior)
      .then((res) => {
        Swal.fire({
          title: "저장 완료!",
          text: "장바구니 저장 완료되었습니다.",
          icon: "success",
          confirmButtonText: "닫기",
          confirmButtonColor: " #8aa996",
        });
        setUpdateInterior({});
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const payConsentCheck = (e) => {};
  const payInterior = () => {};
  console.log(payConsent);
  return (
    <div className="payI-info-box">
      <div className="payI-title">결제</div>
      <div className="payI-price-box">
        <div className="payI-price-all">
          <span>총 가격</span>
          <div className="payI-price">
            <span>{Number(updateInterior.interiorPrice).toLocaleString()}</span>
            <span>원</span>
          </div>
        </div>
        <div className="payI-consent">
          <input
            type="checkbox"
            id="payConsent"
            name="payConsent"
            value={payConsent ? false : true}
            onChange={payConsentCheck}
          ></input>
          <label htmlFor="payConsent">
            주문 내용을 확인했으며, 정보 제공 등에 동의합니다.
          </label>
        </div>
        <div className="payI-btn-group">
          {isSame ? (
            <button className="payI-pay-btn" onClick={payInterior}>
              결제하기
            </button>
          ) : (
            <div className="payI-save-btn">
              <button onClick={delUpdate}>취소하기</button>
              <button onClick={updateInter}>저장하기</button>
            </div>
          )}
          <button onClick={delInterior}>삭제하기</button>
        </div>
      </div>
    </div>
  );
};
export default InteriorPayPage;
