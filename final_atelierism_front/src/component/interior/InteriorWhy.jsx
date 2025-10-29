const InteriorWhy = (props) => {
  const interior = props.interior;
  const setInterior = props.setInterior;
  const whyCheck = (e) => {
    const value = e.target.value;
    const newInterior = {
      ...interior,
      interiorWhy: value,
      interiorWhyType: "",
    };
    setInterior(newInterior);
  };
  return (
    <div className="inter-title-box">
      <div className="inter-main-text">
        <div className="main-title">4 / 4 인테리어 이유 선택</div>
        <p>인테리어 컨설팅을 하는 이유를 알려주세요!</p>
      </div>
      <div className="interW-main-box">
        <div className="interW-choice-items">
          <label className="interW-choice-item">
            <input
              type="radio"
              id="interiorWhy"
              name="interiorWhy1"
              value={"이사를 준비하고 있어요."}
              onClick={whyCheck}
              style={{ display: "none" }}
            ></input>
            <div
              className={
                interior.interiorWhy !== "이사를 준비하고 있어요."
                  ? "interW-check-box"
                  : "interW-check-box inter-checked"
              }
            >
              <div className="interW-info-box">
                {interior.interiorWhy === "이사를 준비하고 있어요." ? (
                  <span className="material-symbols-outlined inter-checked-icon">
                    check
                  </span>
                ) : (
                  <span className="material-symbols-outlined">
                    done_outline
                  </span>
                )}
                <span>이사를 준비하고 있어요.</span>
              </div>
            </div>
          </label>
          <label className="interW-choice-item">
            <input
              type="radio"
              id="interiorWhy"
              name="interiorWhy2"
              value={"신혼집을 구해 인테리어를 준비하고 있어요."}
              onClick={whyCheck}
              style={{ display: "none" }}
            ></input>
            <div
              className={
                interior.interiorWhy !==
                "신혼집을 구해 인테리어를 준비하고 있어요."
                  ? "interW-check-box"
                  : "interW-check-box inter-checked"
              }
            >
              <div className="interW-info-box">
                {interior.interiorWhy ===
                "신혼집을 구해 인테리어를 준비하고 있어요." ? (
                  <span className="material-symbols-outlined inter-checked-icon">
                    check
                  </span>
                ) : (
                  <span className="material-symbols-outlined">
                    done_outline
                  </span>
                )}
                <span>신혼집을 구해 인테리어를 준비하고 있어요.</span>
              </div>
            </div>
          </label>
          <label className="interW-choice-item">
            <input
              type="radio"
              id="interiorWhy"
              name="interiorWhy3"
              value={"살고 있는 집을 새롭게 인테리어하고 싶어요."}
              onClick={whyCheck}
              style={{ display: "none" }}
            ></input>
            <div
              className={
                interior.interiorWhy !==
                "살고 있는 집을 새롭게 인테리어하고 싶어요."
                  ? "interW-check-box"
                  : "interW-check-box inter-checked"
              }
            >
              <div className="interW-info-box">
                {interior.interiorWhy ===
                "살고 있는 집을 새롭게 인테리어하고 싶어요." ? (
                  <span className="material-symbols-outlined inter-checked-icon">
                    check
                  </span>
                ) : (
                  <span className="material-symbols-outlined">
                    done_outline
                  </span>
                )}
                <span>살고 있는 집을 새롭게 인테리어하고 싶어요.</span>
              </div>
            </div>
          </label>
          <label className="interW-choice-item">
            <input
              type="radio"
              id="interiorWhy"
              name="interiorWhy3"
              value={"전문가의 인테리어 감각에 도움을 받고 싶어요."}
              onClick={whyCheck}
              style={{ display: "none" }}
            ></input>
            <div
              className={
                interior.interiorWhy !==
                "전문가의 인테리어 감각에 도움을 받고 싶어요."
                  ? "interW-check-box"
                  : "interW-check-box inter-checked"
              }
            >
              <div className="interW-info-box">
                {interior.interiorWhy ===
                "전문가의 인테리어 감각에 도움을 받고 싶어요." ? (
                  <span className="material-symbols-outlined inter-checked-icon">
                    check
                  </span>
                ) : (
                  <span className="material-symbols-outlined">
                    done_outline
                  </span>
                )}
                <span>전문가의 인테리어 감각에 도움을 받고 싶어요.</span>
              </div>
            </div>
          </label>
          <label className="interW-choice-item">
            <input
              type="radio"
              id="interiorWhy"
              name="interiorWhy3"
              value={"다른 이유가 있어요.(기타)"}
              onClick={(e) => {
                setInterior((prev) => ({
                  ...prev,
                  interiorWhyType: e.target.value,
                  interiorWhy: "다른 이유가 있어요.(기타)",
                }));
              }}
              style={{ display: "none" }}
            ></input>
            <div
              className={
                interior.interiorWhyType !== "다른 이유가 있어요.(기타)"
                  ? "interW-check-box"
                  : "interW-check-box inter-checked"
              }
            >
              <div className="interW-info-box">
                {interior.interiorWhyType === "다른 이유가 있어요.(기타)" ? (
                  <span className="material-symbols-outlined inter-checked-icon">
                    check
                  </span>
                ) : (
                  <span className="material-symbols-outlined">
                    done_outline
                  </span>
                )}
                <span>다른 이유가 있어요.{"(기타)"}</span>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default InteriorWhy;
