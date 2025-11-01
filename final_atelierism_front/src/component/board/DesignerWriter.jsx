import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import { useNavigate, useParams } from "react-router-dom";
import DesignerFrm from "./DesignerFrm";
import TextEditor from "../utils/TextEditor";
import axios from "axios";

const DesignerWriter = () => {
  const [designerReviewTitle, setDesignerReviewTitle] = useState(""); // 게시글 제목
  const [interiorCustomer, setInteriorCustomer] = useState(""); // 의뢰자 아이디
  const [memberId, setMemberId] = useRecoilState(loginIdState); // 게시글 작성자(디자이너)
  const [designerReviewContent, setDesignerReviewContent] = useState(""); // 게시글 상세내용
  const [beforeImg, setBeforeImg] = useState(""); // before 이미지
  const [afterImg, setAfterImg] = useState(""); // after 이미지
  const [oneText, setOneText] = useState(""); // 디자이너 한줄평
  const [interiorKategorie, setInteriorKategorie] = useState(); // 카테고리
  const [interiorPrice, setInteriorPrice] = useState();
  const [sponserList, setSponserList] = useState([]);
  const [customerId, setCustomerId] = useState("");

  const navigate = useNavigate();
  const [designerData, setDesignerData] = useState(null);
  const { interiorNo } = useParams();
  console.log(interiorNo);
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACK_SERVER
        }/board/designer/writer/${interiorNo}`
      )
      .then((res) => {
        console.log("interiorNo : " + res);
        setDesignerData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [interiorNo]);

  return (
    <div className="board-wrap">
      <section className="section-designer-writer"></section>
    </div>
  );
};

export default DesignerWriter;
