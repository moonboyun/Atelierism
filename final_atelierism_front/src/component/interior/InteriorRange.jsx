const InteriorRange = (props) => {
  const interior = props.interior;
  const setInterior = props.setInterior;

  const rangeCheck = (e) => {
    const value = e.target.value;
    const newInterior = { ...interior, InteriorRange: value };
    setInterior(newInterior);
  };
  return (
    <div className="inter-title-box">
      <div className="inter-main-text">
        <div className="main-title">3 / 4 인테리어 범위 선택</div>
        <p>기존의 가구 사용 유무를 선택해주세요.</p>
      </div>
      <div className="interR-main-box">
        <div className="interR-choice-items">
          <label className="interR-choice-item">
            <input
              type="radio"
              id="interiorLiving"
              name="interiorLiving"
              value={1}
              onChange={rangeCheck}
              style={{ display: "none" }}
            ></input>
            <div
              className={
                interior.InteriorRange !== 1
                  ? "interR-check-box"
                  : "interR-check-box inter-checked"
              }
            >
              <div className="interR-info-box">
                <img src="/image/default_img2.png" />
                <div className="interR-text-box">
                  <span>공간을</span>
                  <span className="interR-point-text">
                    &nbsp;완전히 새롭게&nbsp;
                  </span>
                  <span>꾸미고 싶어요.</span>
                </div>
              </div>
            </div>
          </label>
          <label className="interR-choice-item">
            <input
              type="radio"
              id="interiorKitchen"
              name="interiorKitchen"
              value={2}
              onChange={rangeCheck}
              style={{ display: "none" }}
            ></input>
            <div
              className={
                interior.InteriorRange !== 2
                  ? "interR-check-box"
                  : "interR-check-box inter-checked"
              }
            >
              <div className="interR-info-box">
                <img src="/image/default_img2.png" />
                <div className="interR-text-box">
                  <span className="interR-point-text">몇가지 가구를 유지</span>
                  <span>하고 꾸미고 싶어요.</span>
                </div>
              </div>
            </div>
          </label>
          <label className="interR-choice-item">
            <input
              type="radio"
              id="interiorBed"
              name="interiorBed"
              value={3}
              onChange={rangeCheck}
              style={{ display: "none" }}
            ></input>
            <div
              className={
                interior.InteriorRange !== 3
                  ? "interR-check-box"
                  : "interR-check-box inter-checked"
              }
            >
              <div className="interR-info-box">
                <img src="/image/default_img2.png" />
                <div className="interR-text-box">
                  <span className="interR-point-text">가구는 다 유지</span>
                  <span>하고 배치와 소품 위주로 제안 받고 싶어요.</span>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default InteriorRange;
