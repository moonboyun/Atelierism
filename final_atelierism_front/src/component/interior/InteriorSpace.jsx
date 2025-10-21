const InteriorSpace = (props) => {
  const setInterior = props.setInterior;
  const interior = props.interior;
  const spaceCheck = (e) => {
    const value = Number(e.target.value);
    const name = e.target.name;
    const newInterior = { ...interior, [name]: value };
    setInterior(newInterior);
  };
  return (
    <div className="inter-title-box">
      <div className="inter-main-text">
        <div className="main-title">2 / 4 인테리어 공간 선택</div>
        <p>전문가에게 인테리어 컨설팅을 맡길 공간을 선택해주세요.</p>
        <p>여러 공간일 경우 결제 창에서 갯수 선택이 가능합니다!</p>
      </div>
      <div className="interS-main-box">
        <div className="interS-choice-items">
          <label className="interS-choice-item">
            <input
              type="checkbox"
              id="interiorLiving"
              name="interiorLiving"
              value={interior.interiorLiving === 0 ? 1 : 0}
              onChange={spaceCheck}
              style={{ display: "none" }}
            ></input>
            <div
              className={
                interior.interiorLiving === 0
                  ? "interS-check-box"
                  : "interS-check-box interS-checked"
              }
            >
              <div className="interS-info-box">
                <span className="material-symbols-outlined">scene</span>
                <div>거실</div>
              </div>
            </div>
          </label>
          <label className="interS-choice-item">
            <input
              type="checkbox"
              id="interiorKitchen"
              name="interiorKitchen"
              value={interior.interiorKitchen === 0 ? 1 : 0}
              onChange={spaceCheck}
              style={{ display: "none" }}
            ></input>
            <div
              className={
                interior.interiorKitchen === 0
                  ? "interS-check-box"
                  : "interS-check-box interS-checked"
              }
            >
              <div className="interS-info-box">
                <span className="material-symbols-outlined">dine_lamp</span>
                <div>부엌</div>
              </div>
            </div>
          </label>
          <label className="interS-choice-item">
            <input
              type="checkbox"
              id="interiorBed"
              name="interiorBed"
              value={interior.interiorBed === 0 ? 1 : 0}
              onChange={spaceCheck}
              style={{ display: "none" }}
            ></input>
            <div
              className={
                interior.interiorBed === 0
                  ? "interS-check-box"
                  : "interS-check-box interS-checked"
              }
            >
              <div className="interS-info-box">
                <span className="material-symbols-outlined">bed</span>
                <div>안방</div>
              </div>
            </div>
          </label>
        </div>
        <div className="interS-choice-items">
          <label className="interS-choice-item">
            <input
              type="checkbox"
              id="interiorOneroom"
              name="interiorOneroom"
              value={interior.interiorOneroom === 0 ? 1 : 0}
              onChange={spaceCheck}
              style={{ display: "none" }}
            ></input>
            <div
              className={
                interior.interiorOneroom === 0
                  ? "interS-check-box"
                  : "interS-check-box interS-checked"
              }
            >
              <div className="interS-info-box">
                <span className="material-symbols-outlined">hotel</span>
                <div>원룸</div>
              </div>
            </div>
          </label>
          <label className="interS-choice-item">
            <input
              type="checkbox"
              id="interiorKidroom"
              name="interiorKidroom"
              value={interior.interiorKidroom === 0 ? 1 : 0}
              onChange={spaceCheck}
              style={{ display: "none" }}
            ></input>
            <div
              className={
                interior.interiorKidroom === 0
                  ? "interS-check-box"
                  : "interS-check-box interS-checked"
              }
            >
              <div className="interS-info-box">
                <span className="material-symbols-outlined">child_hat</span>
                <div>아이방</div>
              </div>
            </div>
          </label>
          <label className="interS-choice-item">
            <input
              type="checkbox"
              id="interiorStudy"
              name="interiorStudy"
              value={interior.interiorStudy === 0 ? 1 : 0}
              onChange={spaceCheck}
              style={{ display: "none" }}
            ></input>
            <div
              className={
                interior.interiorStudy === 0
                  ? "interS-check-box"
                  : "interS-check-box interS-checked"
              }
            >
              <div className="interS-info-box">
                <span className="material-symbols-outlined">menu_book</span>
                <div>서재</div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default InteriorSpace;
