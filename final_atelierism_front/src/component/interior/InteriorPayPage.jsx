import { useState } from "react";

const InteriorPayPage = () => {
  const [interior, setInterior] = useState({});

  return (
    <section className="section">
      <div className="payP-main-content">
        <div className="payP-order-box">
          <OrderInfo />
          <div className="payP-Designer-pay-box">
            <DesignerInfo />
            <PayInfo />
          </div>
        </div>
      </div>
    </section>
  );
};
const OrderInfo = () => {
  const spaceNum = () => {};
  return (
    <div className="orderI-info-box">
      <div className="orderI-member-box">
        <span className="pay-title">주문</span>
        <span>유저 이름</span>
      </div>
      <div className="orderI-interior-space-box">
        <span>공간</span>
        <span>갯수</span>
        <span>가격</span>
      </div>
      <div className="orderI-interior-space-price-all">
        <div className="orderI-interior-space-price-box">
          <div className="orderI-group-box">
            <span className="material-symbols-outlined">scene</span>
            <span>거실</span>
          </div>
          <div className="orderI-group-box">
            <button value={1} onClick={spaceNum}>
              <span className="material-symbols-outlined">add</span>
            </button>
            <span>1</span>
            <button value={1} onClick={spaceNum}>
              <span className="material-symbols-outlined">remove</span>
            </button>
          </div>
          <div className="orderI-group-box">
            <span>100,000 원</span>
          </div>
        </div>

        <div className="orderI-interior-space-price-box">
          <div className="orderI-group-box">
            <span className="material-symbols-outlined">dine_lamp</span>
            <span>부엌</span>
          </div>
          <div className="orderI-group-box">
            <button value={1} onClick={spaceNum}>
              <span className="material-symbols-outlined">add</span>
            </button>
            <span>1</span>
            <button value={1} onClick={spaceNum}>
              <span className="material-symbols-outlined">remove</span>
            </button>
          </div>
          <div className="orderI-group-box">
            <span>100,000 원</span>
          </div>
        </div>

        <div className="orderI-interior-space-price-box">
          <div className="orderI-group-box">
            <span className="material-symbols-outlined">bed</span>
            <span>안방</span>
          </div>
          <div className="orderI-group-box">
            <button value={1} onClick={spaceNum}>
              <span className="material-symbols-outlined">add</span>
            </button>
            <span>1</span>
            <button value={1} onClick={spaceNum}>
              <span className="material-symbols-outlined">remove</span>
            </button>
          </div>
          <div className="orderI-group-box">
            <span>100,000 원</span>
          </div>
        </div>

        <div className="orderI-interior-space-price-box">
          <div className="orderI-group-box">
            <span className="material-symbols-outlined">hotel</span>
            <span>원룸</span>
          </div>
          <div className="orderI-group-box">
            <button value={1} onClick={spaceNum}>
              <span className="material-symbols-outlined">add</span>
            </button>
            <span>1</span>
            <button value={1} onClick={spaceNum}>
              <span className="material-symbols-outlined">remove</span>
            </button>
          </div>
          <div className="orderI-group-box">
            <span>100,000 원</span>
          </div>
        </div>

        <div className="orderI-interior-space-price-box">
          <div className="orderI-group-box">
            <span className="material-symbols-outlined">child_hat</span>
            <span>아이방</span>
          </div>
          <div className="orderI-group-box">
            <button value={1} onClick={spaceNum}>
              <span className="material-symbols-outlined">add</span>
            </button>
            <span>1</span>
            <button value={1} onClick={spaceNum}>
              <span className="material-symbols-outlined">remove</span>
            </button>
          </div>
          <div className="orderI-group-box">
            <span>100,000 원</span>
          </div>
        </div>

        <div className="orderI-interior-space-price-box">
          <div className="orderI-group-box">
            <span className="material-symbols-outlined">menu_book</span>
            <span>서재</span>
          </div>
          <div className="orderI-group-box">
            <button value={1} onClick={spaceNum}>
              <span className="material-symbols-outlined">add</span>
            </button>
            <span>1</span>
            <button value={1} onClick={spaceNum}>
              <span className="material-symbols-outlined">remove</span>
            </button>
          </div>
          <div className="orderI-group-box">
            <span>100,000 원</span>
          </div>
        </div>
      </div>
      <div className="orderI-sub-title">인테리어 공간</div>
      <div className="orderI-interior-check-box">
        <div className="orderI-interior-items">
          <div className="orderI-interior-item">
            <span className="material-symbols-outlined">scene</span>
            <label>
              <input
                type="checkbox"
                id="interiorLiving"
                name="interiorLiving"
                value={1}
                onChange={spaceNum}
                style={{ display: "none" }}
              ></input>
            </label>
            <span>거실</span>
          </div>
          <div className="orderI-interior-item">
            <span className="material-symbols-outlined">dine_lamp</span>
            <label>
              <input
                type="checkbox"
                id="interiorKitchen"
                name="interiorKitchen"
                value={1}
                onChange={spaceNum}
                style={{ display: "none" }}
              ></input>
            </label>
            <span>부엌</span>
          </div>
          <div className="orderI-interior-item">
            <span className="material-symbols-outlined">bed</span>
            <label>
              <input
                type="checkbox"
                id="interiorBed"
                name="interiorBed"
                value={1}
                onChange={spaceNum}
                style={{ display: "none" }}
              ></input>
            </label>
            <span>안방</span>
          </div>
        </div>

        <div className="orderI-interior-items">
          <div className="orderI-interior-item">
            <span className="material-symbols-outlined">hotel</span>
            <label>
              <input
                type="checkbox"
                id="interiorOneroom"
                name="interiorOneroom"
                value={1}
                onChange={spaceNum}
                style={{ display: "none" }}
              ></input>
            </label>
            <span>원룸</span>
          </div>
          <div className="orderI-interior-item">
            <span className="material-symbols-outlined">child_hat</span>
            <label>
              <input
                type="checkbox"
                id="interiorKidroom"
                name="interiorKidroom"
                value={1}
                onChange={spaceNum}
                style={{ display: "none" }}
              ></input>
            </label>
            <span>아이방</span>
          </div>
          <div className="orderI-interior-item">
            <span className="material-symbols-outlined">menu_book</span>
            <label>
              <input
                type="checkbox"
                id="interiorStudy"
                name="interiorStudy"
                value={1}
                onChange={spaceNum}
                style={{ display: "none" }}
              ></input>
            </label>
            <span>서재</span>
          </div>
        </div>
      </div>

      <div className="orderI-sub-title">인테리어 범위</div>
      <div className="orderI-interior-check-box">
        <div className="orderI-interior-items">
          <div className="orderI-interior-item orderI-center">
            <label>
              <input
                type="radio"
                id="interiorRange1"
                name="interiorRange"
                value={1}
                onChange={spaceNum}
                style={{ display: "none" }}
              ></input>
            </label>
            <span>완전히 새롭게</span>
          </div>
          <div className="orderI-interior-item orderI-center">
            <label>
              <input
                type="radio"
                id="interiorRange2"
                name="interiorRange"
                value={1}
                onChange={spaceNum}
                style={{ display: "none" }}
              ></input>
            </label>
            <span>몇 가지 가구 유지</span>
          </div>
          <div className="orderI-interior-item orderI-center">
            <label>
              <input
                type="radio"
                id="interiorRange3"
                name="interiorRange"
                value={1}
                onChange={spaceNum}
                style={{ display: "none" }}
              ></input>
            </label>
            <span>가구 다 유지</span>
          </div>
        </div>
      </div>

      <div className="orderI-sub-title">인테리어 컨설팅 하는 이유</div>
      <div className="orderI-interior-check-box border-none">
        <div className="orderI-interior-items">
          <div className="orderI-interior-item orderI-center">
            <label>
              <input
                type="radio"
                id="interiorWhy1"
                name="interiorWhy"
                value={1}
                onChange={spaceNum}
                style={{ display: "none" }}
              ></input>
            </label>
            <span>이사준비</span>
          </div>
          <div className="orderI-interior-item orderI-center">
            <label>
              <input
                type="radio"
                id="interiorWhy2"
                name="interiorWhy"
                value={1}
                onChange={spaceNum}
                style={{ display: "none" }}
              ></input>
            </label>
            <span>신혼집</span>
          </div>
          <div className="orderI-interior-item orderI-center">
            <label>
              <input
                type="radio"
                id="interiorWhy3"
                name="interiorWhy"
                value={1}
                onChange={spaceNum}
                style={{ display: "none" }}
              ></input>
            </label>
            <span>리모델링</span>
          </div>
        </div>

        <div className="orderI-interior-items orderI-evenly">
          <div className="orderI-interior-item orderI-center">
            <label>
              <input
                type="radio"
                id="interiorWhy4"
                name="interiorWhy"
                value={1}
                onChange={spaceNum}
                style={{ display: "none" }}
              ></input>
            </label>
            <span>전문가의 도움</span>
          </div>
          <div className="orderI-interior-item orderI-center">
            <label>
              <input
                type="radio"
                id="interiorWhy5"
                name="interiorWhy"
                value={1}
                onChange={spaceNum}
                style={{ display: "none" }}
              ></input>
            </label>
            <span>다른 이유</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const DesignerInfo = () => {
  return (
    <div className="designerI-info-box">
      <div className="designerI-title">디자이너 선택</div>
    </div>
  );
};

const PayInfo = () => {
  return (
    <div className="payI-info-box">
      <div className="payI-title">결제</div>
    </div>
  );
};
export default InteriorPayPage;
