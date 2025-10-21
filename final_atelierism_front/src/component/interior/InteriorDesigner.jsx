import { useEffect, useState } from "react";
import "./interior.css";
import { useRecoilValue } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowForwardIos } from "@mui/icons-material";

const InteriorDesigner = () => {
  const [designerList, setDesignerList] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [checkedDesigner, setCheckedDesigner] = useState({
    memberThumb: null,
    memberId: "",
    memberName: "",
    memberCareer: 0,
    memberIntroduce: "",
  });
  console.log(checkedDesigner.memberName);
  const loginId = useRecoilValue(loginIdState);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/designer`)
      .then((res) => {
        console.log(res);
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
            checkedDesigner={checkedDesigner}
          />
          <ChoiceDesigner
            designerList={designerList}
            memberList={memberList}
            setCheckedDesigner={setCheckedDesigner}
            checkedDesigner={checkedDesigner}
          />
        </div>
      </div>
    </div>
  );
};

const SelectDesigner = (props) => {
  const designerList = props.designerList;
  const checkedDesigner = props.checkedDesigner;
  return (
    <div
      className={
        checkedDesigner.memberId == ""
          ? "interD-select-box"
          : "interD-select-box interD-checked"
      }
    >
      <div>
        {checkedDesigner.memberId == "" ? (
          "디자이너를 선택하지 않았습니다."
        ) : (
          <div className="interD-checked-info-box">
            <div className="interD-checked-img-box">
              {checkedDesigner.memberThumb == null ? (
                <img src="/image/default_image.png" />
              ) : (
                <img src={`/image/${checkedDesigner.memberThumb}`} />
              )}
            </div>
            <div className="interD-checked-Designer-info">
              <div>{checkedDesigner.memberName}</div>
              <div>경력 | {checkedDesigner.memberCareer}년</div>
              <div>한줄 소개 | {checkedDesigner.memberIntroduce}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const ChoiceDesigner = (props) => {
  const designerList = props.designerList;
  const memberList = props.memberList;
  const [moreDesigner, setMoreDesigner] = useState(3);
  return (
    <div className="interD-choice-items">
      {designerList.slice(0, moreDesigner).map((designer, index) => {
        const matchedMember = memberList.find(
          (member) => member.memberId === designer.memberId
        );
        if (!matchedMember) return null;
        return (
          <DesignerItem
            key={"designer-member-" + index}
            designer={designer}
            member={matchedMember}
            setCheckedDesigner={props.setCheckedDesigner}
            checkedDesigner={props.checkedDesigner}
          />
        );
      })}
      {moreDesigner < designerList.length && (
        <div className="interD-more-btn">
          <button
            type="button"
            onClick={() => setMoreDesigner(moreDesigner + 3)}
          >
            더보기
          </button>
        </div>
      )}
    </div>
  );
};
const DesignerItem = (props) => {
  const designer = props.designer;
  const member = props.member;
  const setCheckedDesigner = props.setCheckedDesigner;
  const checkedDesigner = props.checkedDesigner;
  const designerInfo = () => {
    setCheckedDesigner({
      memberThumb: member.memberThumb || null, // 썸네일 이미지가 있으면 사용
      memberId: member.memberId,
      memberName: member.memberName,
      memberCareer: designer.designerCareer,
      memberIntroduce: designer.designerIntroduce,
    });
  };
  return (
    <label className="interD-choice-item">
      <input
        type="radio"
        id={`designer-${designer.memberId}`}
        name="designer"
        value={designer.memberId}
        onChange={designerInfo}
        style={{ display: "none" }}
      ></input>
      <div
        className={
          designer.memberId === checkedDesigner.memberId
            ? "interD-check-box interD-checked"
            : "interD-check-box"
        }
      >
        {member.memberThumb == null ? (
          <img src="/image/default_image.png" />
        ) : (
          <img src={`/image/${member.memberThumb}`} />
        )}
        <div className="interD-info-box">
          <div>{member.memberName}</div>
          <div>경력 | {designer.designerCareer}년</div>
          <div>한줄 소개 | {designer.designerIntroduce}</div>
        </div>
        <div className="interD-introduction">
          <Link to="#">디자이너 소개 보러가기</Link>
          <ArrowForwardIos />
        </div>
      </div>
    </label>
  );
};
export default InteriorDesigner;
