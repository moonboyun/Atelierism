import { useState } from "react";
import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";

const DesignerWriter = () => {
  const [designerReviewTitle, setDesignerReviewTitle] = useState("");
  const [interiorCustomer, setInteriorCustomer] = useState("");
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  return (
    <div className="board-wrap">
      <section className="section-designer-writer"></section>
    </div>
  );
};

export default DesignerWriter;
