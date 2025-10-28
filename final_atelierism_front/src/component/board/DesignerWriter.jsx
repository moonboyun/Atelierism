import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import { useNavigate } from "react-router-dom";
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
  const [interiorNo, setInteriorNo] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (!interiorNo) return;
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/interior/${interiorNo}`)
      .then((res) => {
        setInteriorPrice(res.data.interiorPrice);
        setInteriorKategorie(res.data.interiorKategorie);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [interiorNo]);

  const clickSponser = (sponser) => {
    setInteriorNo(String(sponser.interiorNo));
    setInteriorCustomer(String(sponser.customerId));
  };

  return (
    <div className="board-wrap">
      <section className="section-designer-writer">
        <div className="page-title">
          <h3 className="title-text">게시글 작성</h3>
        </div>
        <section className="sponser-list-section">
          <div className="sponser-list-box">
            <h3>고객 리스트</h3>
            {sponserList.map((sponser, i) => {
              return (
                <div key={"sponser-" + i} sponser={sponser}>
                  <span
                    className="sponser-list"
                    onClick={() => clickSponser(sponser)}
                  >
                    {sponser.customerId}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
        <div className="data-content-box">
          <DesignerFrm
            designerReviewTitle={designerReviewTitle}
            setDesignerReviewTitle={setDesignerReviewTitle}
            interiorCustomer={interiorCustomer}
            setInteriorCustomer={setInteriorCustomer}
            oneText={oneText}
            setOneText={setOneText}
            beforeImg={beforeImg}
            setBeforeImg={setBeforeImg}
            afterImg={afterImg}
            setAfterImg={setAfterImg}
            interiorKategorie={interiorKategorie}
            setInteriorKategorie={setInteriorKategorie}
            interiorPrice={interiorPrice}
            setInteriorPrice={setInteriorPrice}
          />
        </div>
        {/* Content(TextEditor) */}
        <div className="board-content-wrap">
          <TextEditor
            data={designerReviewContent}
            setData={setDesignerReviewContent}
            base="/board/designer/review"
          />
        </div>
        {/* 하단 버튼 영역 */}
        <div className="button-zone">
          <Link to="/board/designer/review" className="btn-primary lg cancel">
            취소
          </Link>
          <button type="button" className="btn-primary lg" onClick={upload}>
            등록하기
          </button>
        </div>
      </section>
    </div>
  );
};

export default DesignerWriter;
