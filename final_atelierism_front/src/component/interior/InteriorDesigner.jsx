import { useEffect, useState } from "react";
import "./interior.css";
import { useRecoilValue } from "recoil";
import { isLoginState } from "../utils/RecoilData";
import axios from "axios";

const InteriorDesigner = () => {
  const [designerList, setDesignerList] = useState([]);
  const [checkedDesignerId, setCheckedDesignerId] = useState("");
  const isLogin = useRecoilValue(isLoginState);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/designer`)
      .then((res) => {
        console.log(res);
        setDesignerList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="inter-title-box">
      <div className="inter-main-text">
        <div className="main-title">1 / 4 디자이너 선택</div>
        <p>나만의 공간을 완성할 맞춤형 디자이너를 선택하세요.</p>
      </div>
      <div className="inter-main-box">
        <div className="interD-component-box">
          <SelectDesigner
            designerList={designerList}
            checkedDesignerId={checkedDesignerId}
          />
          <ChoiceDesigner
            designerList={designerList}
            setCheckedDesignerId={setCheckedDesignerId}
          />
        </div>
      </div>
    </div>
  );
};

const SelectDesigner = (props) => {
  const designerList = props.designerList;
  const checkedDesignerId = props.checkedDesignerId;
  return (
    <div className="interD-select-box">
      <p>
        {checkedDesignerId == ""
          ? "디자이너를 선택하지 않았습니다."
          : checkedDesignerId}
      </p>
    </div>
  );
};
const ChoiceDesigner = (props) => {
  const designerList = props.designerList;
  return (
    <div className="interD-choice-items">
      {designerList.map((designer, index) => {
        return (
          <DesignerItem
            key={"designer=" + index}
            designer={designer}
            setCheckedDesignerId={props.setCheckedDesignerId}
          />
        );
      })}
    </div>
  );
};
const DesignerItem = (props) => {
  const designer = props.designer;
  const setCheckedDesignerId = props.setCheckedDesignerId;
  const checkedDesigner = (e) => {
    setCheckedDesignerId(e.target.value);
  };
  return (
    <label className="interD-choice-item">
      <input
        type="radio"
        id={`designer-${designer.memberId}`}
        name="designer"
        value={designer.memberId}
        onChange={checkedDesigner}
        style={{ display: "none" }}
      ></input>
      <div className="interD-check-img-box">
        {" "}
        <img src="/image/default_image.png" />{" "}
      </div>
    </label>
  );
};
export default InteriorDesigner;
