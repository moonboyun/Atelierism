import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import axios from "axios";

const InteriorPayPage = () => {
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const [member, setMember] = useState({});
  const [interior, setInterior] = useState({});
  const [price, setPrice] = useState({});
  const backServer = import.meta.env.VITE_BACK_SERVER;
  useEffect(() => {
    axios
      .post(`${backServer}/interior/${memberId}`)
      .then((res) => {
        setInterior(res.data.interior);
        setMember(res.data.member);
        setPrice(res.data.price);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [memberId]);
  console.log("interior : ", interior);
  console.log("member : ", member);
  console.log("price : ", price);
  return (
    <section className="section">
      <div className="payP-main-content">
        <div className="payP-order-box">
          <OrderInfo
            member={member}
            interior={interior}
            setInterior={setInterior}
            price={price}
          />
          <div className="payP-Designer-pay-box">
            <DesignerInfo />
            <PayInfo />
          </div>
        </div>
      </div>
    </section>
  );
};
const OrderInfo = (props) => {
  const member = props.member;
  const interior = props.interior;
  const setInterior = props.setInterior;
  const price = props.price;
  const spacePlus = (e) => {
    const value = Number(e.target.value);
    const name = e.target.name;
    setInterior((prev) => ({ ...interior, [name]: prev[name] + value }));
  };

  const spaceMinus = (e) => {
    const value = Number(e.target.value);
    const name = e.target.name;
    setInterior((prev) => ({ ...interior, [name]: prev[name] - value }));
  };

  const spaceCheck = () => {};
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
          style={interior.interiorLiving === 0 ? { display: "none" } : {}}
        >
          <div className="orderI-group-box">
            <span className="material-symbols-outlined">scene</span>
            <span>거실</span>
          </div>
          <div className="orderI-group-box">
            <button className="interiorLiving" value={1} onClick={spaceMinus}>
              <span className="material-symbols-outlined">remove</span>
            </button>
            <span>{interior.interiorLiving}</span>
            <button className="interiorLiving" value={1} onClick={spacePlus}>
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
          <div className="orderI-group-box">
            <span>
              {Number(
                price.priceLiving * interior.interiorLiving
              ).toLocaleString()}{" "}
              원
            </span>
          </div>
        </div>

        <div
          className="orderI-interior-space-price-box"
          style={interior.interiorKitchen === 0 ? { display: "none" } : {}}
        >
          <div className="orderI-group-box">
            <span className="material-symbols-outlined">dine_lamp</span>
            <span>부엌</span>
          </div>
          <div className="orderI-group-box">
            <button className="interiorKitchen" value={1} onClick={spaceMinus}>
              <span className="material-symbols-outlined">remove</span>
            </button>
            <span>{interior.interiorKitchen}</span>
            <button className="interiorKitchen" value={1} onClick={spacePlus}>
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
          <div className="orderI-group-box">
            <span>
              {Number(
                price.priceKitchen * interior.interiorKitchen
              ).toLocaleString()}{" "}
              원
            </span>
          </div>
        </div>

        <div
          className="orderI-interior-space-price-box"
          style={interior.interiorBed === 0 ? { display: "none" } : {}}
        >
          <div className="orderI-group-box">
            <span className="material-symbols-outlined">bed</span>
            <span>안방</span>
          </div>
          <div className="orderI-group-box">
            <button className="interiorBed" value={1} onClick={spaceMinus}>
              <span className="material-symbols-outlined">remove</span>
            </button>
            <span>{interior.interiorBed}</span>
            <button className="interiorBed" value={1} onClick={spacePlus}>
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
          <div className="orderI-group-box">
            <span>
              {Number(price.priceBed * interior.interiorBed).toLocaleString()}{" "}
              원
            </span>
          </div>
        </div>

        <div
          className="orderI-interior-space-price-box"
          style={interior.interiorOneroom === 0 ? { display: "none" } : {}}
        >
          <div className="orderI-group-box">
            <span className="material-symbols-outlined">hotel</span>
            <span>원룸</span>
          </div>
          <div className="orderI-group-box">
            <button className="interiorOneroom" value={1} onClick={spaceMinus}>
              <span className="material-symbols-outlined">remove</span>
            </button>
            <span>{interior.interiorOneroom}</span>
            <button className="interiorOneroom" value={1} onClick={spacePlus}>
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
          <div className="orderI-group-box">
            <span>
              {Number(
                price.priceOneroom * interior.interiorOneroom
              ).toLocaleString()}{" "}
              원
            </span>
          </div>
        </div>

        <div
          className="orderI-interior-space-price-box"
          style={interior.interiorKidroom === 0 ? { display: "none" } : {}}
        >
          <div className="orderI-group-box">
            <span className="material-symbols-outlined">child_hat</span>
            <span>아이방</span>
          </div>
          <div className="orderI-group-box">
            <button className="interiorKidroom" value={1} onClick={spaceMinus}>
              <span className="material-symbols-outlined">remove</span>
            </button>
            <span>{interior.interiorKidroom}</span>
            <button className="interiorKidroom" value={1} onClick={spacePlus}>
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
          <div className="orderI-group-box">
            <span>
              {Number(
                price.priceKidroom * interior.interiorKidroom
              ).toLocaleString()}{" "}
              원
            </span>
          </div>
        </div>

        <div
          className="orderI-interior-space-price-box"
          style={interior.interiorStudy === 0 ? { display: "none" } : {}}
        >
          <div className="orderI-group-box">
            <span className="material-symbols-outlined">menu_book</span>
            <span>서재</span>
          </div>
          <div className="orderI-group-box">
            <button className="interiorStudy" value={1} onClick={spaceMinus}>
              <span className="material-symbols-outlined">remove</span>
            </button>
            <span>{interior.interiorStudy}</span>
            <button className="interiorStudy" value={1} onClick={spacePlus}>
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
          <div className="orderI-group-box">
            <span>
              {Number(
                price.priceStudy * interior.interiorStudy
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
            <div className="orderI-interior-item">
              <span className="material-symbols-outlined">scene</span>
              <input
                type="checkbox"
                id="interiorLiving"
                name="interiorLiving"
                value={interior.interiorLiving >= 1 ? 0 : 1}
                onChange={spaceCheck}
                style={{ display: "none" }}
              ></input>
              <span>거실</span>
            </div>
          </label>
          <label>
            <div className="orderI-interior-item">
              <span className="material-symbols-outlined">dine_lamp</span>
              <input
                type="checkbox"
                id="interiorKitchen"
                name="interiorKitchen"
                value={1}
                onChange={spaceCheck}
                style={{ display: "none" }}
              ></input>
              <span>부엌</span>
            </div>
          </label>
          <label>
            <div className="orderI-interior-item">
              <span className="material-symbols-outlined">bed</span>
              <input
                type="checkbox"
                id="interiorBed"
                name="interiorBed"
                value={1}
                onChange={spaceCheck}
                style={{ display: "none" }}
              ></input>
              <span>안방</span>
            </div>
          </label>
        </div>

        <div className="orderI-interior-items">
          <label>
            <div className="orderI-interior-item">
              <span className="material-symbols-outlined">hotel</span>
              <input
                type="checkbox"
                id="interiorOneroom"
                name="interiorOneroom"
                value={1}
                onChange={spaceCheck}
                style={{ display: "none" }}
              ></input>
              <span>원룸</span>
            </div>
          </label>
          <label>
            <div className="orderI-interior-item">
              <span className="material-symbols-outlined">child_hat</span>
              <input
                type="checkbox"
                id="interiorKidroom"
                name="interiorKidroom"
                value={1}
                onChange={spaceCheck}
                style={{ display: "none" }}
              ></input>
              <span>아이방</span>
            </div>
          </label>
          <label>
            <div className="orderI-interior-item">
              <span className="material-symbols-outlined">menu_book</span>
              <input
                type="checkbox"
                id="interiorStudy"
                name="interiorStudy"
                value={1}
                onChange={spaceCheck}
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
            <div className="orderI-interior-item orderI-center">
              <input
                type="radio"
                id="interiorRange1"
                name="interiorRange"
                value={1}
                onChange={spaceCheck}
                style={{ display: "none" }}
              ></input>
              <span>완전히 새롭게</span>
            </div>
          </label>
          <label>
            <div className="orderI-interior-item orderI-center">
              <input
                type="radio"
                id="interiorRange2"
                name="interiorRange"
                value={1}
                onChange={spaceCheck}
                style={{ display: "none" }}
              ></input>
              <span>몇 가지 가구 유지</span>
            </div>
          </label>
          <label>
            <div className="orderI-interior-item orderI-center">
              <input
                type="radio"
                id="interiorRange3"
                name="interiorRange"
                value={1}
                onChange={spaceCheck}
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
            <div className="orderI-interior-item orderI-center">
              <input
                type="radio"
                id="interiorWhy1"
                name="interiorWhy"
                value={1}
                onChange={spaceCheck}
                style={{ display: "none" }}
              ></input>
              <span>이사준비</span>
            </div>
          </label>
          <label>
            <div className="orderI-interior-item orderI-center">
              <input
                type="radio"
                id="interiorWhy2"
                name="interiorWhy"
                value={1}
                onChange={spaceCheck}
                style={{ display: "none" }}
              ></input>
              <span>신혼집</span>
            </div>
          </label>
          <label>
            <div className="orderI-interior-item orderI-center">
              <input
                type="radio"
                id="interiorWhy3"
                name="interiorWhy"
                value={1}
                onChange={spaceCheck}
                style={{ display: "none" }}
              ></input>
              <span>리모델링</span>
            </div>
          </label>
        </div>

        <div className="orderI-interior-items orderI-evenly">
          <label>
            <div className="orderI-interior-item orderI-center">
              <input
                type="radio"
                id="interiorWhy4"
                name="interiorWhy"
                value={1}
                onChange={spaceCheck}
                style={{ display: "none" }}
              ></input>
              <span>전문가의 도움</span>
            </div>
          </label>
          <label>
            <div className="orderI-interior-item orderI-center">
              <input
                type="radio"
                id="interiorWhy5"
                name="interiorWhy"
                value={1}
                onChange={spaceCheck}
                style={{ display: "none" }}
              ></input>
              <span>다른 이유</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

const DesignerInfo = () => {
  const designerCheck = () => {};
  return (
    <div className="designerI-info-box">
      <div className="designerI-title">디자이너 선택</div>
      <div className="designerI-items">
        <label>
          <input
            type="radio"
            id="interiorDesigner-1"
            name="interiorDesigner"
            value={1}
            onChange={designerCheck}
            style={{ display: "none" }}
          ></input>
          <div className="designerI-item">
            <img src="/image/default_image.png" />
            <div className="designerI-info">
              <div className="designerI-name-career">
                <span>디자이너 이름</span>
                <span>경력 | 1년</span>
              </div>
              <span className="designerI-introduce">
                30자 테스트~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
              </span>
            </div>
          </div>
        </label>

        <label>
          <input
            type="radio"
            id="interiorDesigner-1"
            name="interiorDesigner"
            value={1}
            onChange={designerCheck}
            style={{ display: "none" }}
          ></input>
          <div className="designerI-item">
            <img src="/image/default_image.png" />
            <div className="designerI-info">
              <div className="designerI-name-career">
                <span>디자이너 이름</span>
                <span>경력 | 1년</span>
              </div>
              <span className="designerI-introduce">
                30자 테스트~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
              </span>
            </div>
          </div>
        </label>

        <label>
          <input
            type="radio"
            id="interiorDesigner-1"
            name="interiorDesigner"
            value={1}
            onChange={designerCheck}
            style={{ display: "none" }}
          ></input>
          <div className="designerI-item">
            <img src="/image/default_image.png" />
            <div className="designerI-info">
              <div className="designerI-name-career">
                <span>디자이너 이름</span>
                <span>경력 | 1년</span>
              </div>
              <span className="designerI-introduce">
                30자 테스트~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
              </span>
            </div>
          </div>
        </label>
      </div>
      {
        <div className="designerI-more-btn">
          <button>더보기</button>
        </div>
      }
    </div>
  );
};

const PayInfo = () => {
  return (
    <div className="payI-info-box">
      <div className="payI-title">결제</div>
      <div className="payI-price-box">
        <div className="payI-price-all">
          <span>총 가격</span>
          <div className="payI-price">
            <span>600,000</span>
            <span>원</span>
          </div>
        </div>
        <div className="payI-consent">
          <input type="checkbox" id="payConsent"></input>
          <label htmlFor="payConsent">
            주문 내용을 확인했으며, 정보 제공 등에 동의합니다.
          </label>
        </div>
        <button>결제하기</button>
      </div>
    </div>
  );
};
export default InteriorPayPage;
