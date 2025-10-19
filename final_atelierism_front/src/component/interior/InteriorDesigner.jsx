import { useEffect, useState } from "react";
import "./interior.css";
import { useRecoilValue } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import axios from "axios";

const InteriorDesigner = () => {
  const [designerList, setDesignerList] = useState([]);
  const [memberList,setMemberList] = useState([]);
  const [checkedDesignerId, setCheckedDesignerId] = useState("");
  const loginId = useRecoilValue(loginIdState);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/designer`)
      .then((res) => {
        console.log(res)
        setDesignerList(res.data.designerList);
        setMemberList(res.data.memberList);
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
            memberList ={memberList}
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
  const memberList = props.memberList;
  return (
    <div className="interD-choice-items">
      {designerList.map((designer, index) => {
        const matchedMember = memberList.find(member => member.memberId === designer.memberId);
        console.log("Designer:", designer);
        console.log("Matched Member:", matchedMember);
          if (!matchedMember) return null;
          return (
            <DesignerItem
              key={"designer-member-" + index}
              designer={designer}
              member={matchedMember}
              setCheckedDesignerId={props.setCheckedDesignerId}
            />
          );
      })}
    </div>
  );
};
const DesignerItem = (props) => {
  const designer = props.designer;
  const member = props.member;
  console.log(member);
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
      <div className="interD-check-box">
        <img src="/image/default_image.png" />  
        <div className="interD-info-box">
          <div>{member.memberName}</div>
        </div>
      </div>
    </label>
  );
};
export default InteriorDesigner;
