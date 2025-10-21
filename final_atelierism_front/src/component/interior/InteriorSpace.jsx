import { useState } from "react";

const InteriorSpace = (props) => {
  const [living, setLiving] = useState(0);
  const [kitchen, setKitchen] = useState(0);
  const [bedroom, setBedroom] = useState(0);
  const [oneroom, setOneroom] = useState(0);
  const [kidroom, setKidroom] = useState(0);
  const [study, setStudy] = useState(0);
  const setInterior = props.setInterior;
  const spaceCheck = () => {
    setInterior((prev) => ({
      ...prev,
      living: living,
      kitchen: kitchen,
      bedroom: bedroom,
      oneroom: oneroom,
      kidroom: kidroom,
      study: study,
    }));
  };
  return (
    <div className="inter-title-box">
      <div className="inter-main-text">
        <div className="main-title">2 / 4 인테리어 공간 선택</div>
        <p>전문가에게 인테리어 컨설팅을 맡길 공간을 선택해주세요.</p>
        <p>여러 공간일 경우 결제 창에서 갯수 선택이 가능합니다!</p>
      </div>
      <div className="inter-main-box">
        <div className="interS-choice-items">
          <label className="interS-choice-item">
            <input
              type="checkbox"
              id="living"
              name="living"
              value={setLiving(1)}
              onChange={spaceCheck}
              style={{ display: "none" }}
            ></input>
            <div className="interS-check-box">
              <div className="interS-info-box">
                <div>거실</div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default InteriorSpace;
