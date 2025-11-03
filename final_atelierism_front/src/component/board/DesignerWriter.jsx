import { useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import { useNavigate, useParams, Link } from "react-router-dom";
import TextEditor from "../utils/TextEditor";
import axios from "axios";
import Swal from "sweetalert2";
//import "./boardDesigner.css";
import "./designerWriter.css";
import DesignerFrm from "./DesignerFrm";

const catMap = [
  { key: "interiorLiving", label: "거실" },
  { key: "interiorKitchen", label: "부엌" },
  { key: "interiorBed", label: "침실" },
  { key: "interiorOneroom", label: "원룸" },
  { key: "interiorKidroom", label: "아이방" },
  { key: "interiorStudy", label: "서재" },
];

const DesignerWriter = () => {
  const { interiorNo } = useParams();
  const navigate = useNavigate();
  const [designerReviewWriter, setDesignerReviewWriter] =
    useRecoilState(loginIdState);
  const [prefill, setPrefill] = useState(null);
  const [designerReviewTitle, setDesignerReviewTitle] = useState(""); // 제목
  const [oneText, setOneText] = useState(""); // 한줄평
  const [beforeImg, setBeforeImg] = useState(null); // Before 이미지
  const [afterImg, setAfterImg] = useState(null); // After 이미지
  const [designerReviewContent, setDesignerReviewContent] = useState(""); // 본문
  const [interiorCustomer, setInteriorCustomer] = useState(); // 의뢰자
  const [interiorPrice, setInteriorPrice] = useState(); // 총 견적비
  const [categoryCsv, setCategoryCsv] = useState();

  // 상세 불러오기
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACK_SERVER
        }/designer/status/detail/${interiorNo}`
      )
      .then((res) => {
        console.log(res);
        setPrefill(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [interiorNo]);

  // prefill 기반 활성 카테고리 계산 (라벨 배열)
  const activeCats = useMemo(() => {
    if (!prefill) return [];
    return catMap.filter((c) => prefill[c.key] === 1).map((c) => c.label);
  }, [prefill]);

  const upload = () => {
    if (
      designerReviewTitle !== "" &&
      designerReviewContent !== "" &&
      beforeImg !== null &&
      afterImg !== null &&
      oneText !== ""
    ) {
      const form = new FormData();
      form.append("interiorNo", interiorNo);
      form.append("designerReviewTitle", designerReviewTitle);
      form.append("oneText", oneText);
      form.append("designerReviewContent", designerReviewContent);
      form.append("designerReviewWriter", designerReviewWriter);
      form.append("before", beforeImg);
      form.append("after", afterImg);
      form.append(
        "interiorCustomer",
        interiorCustomer ?? prefill?.customerName ?? prefill?.customerId ?? ""
      );
      form.append(
        "interiorPrice",
        String(interiorPrice ?? prefill?.interiorPrice ?? 0)
      );
      form.append(
        "categoryCsv",
        categoryCsv ?? (activeCats.length ? activeCats.join(",") : "미지정")
      );
      axios
        .post(`${import.meta.env.VITE_BACK_SERVER}/board/designer`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          if (res.data > 0) {
            Swal.fire({
              title: "등록 완료",
              text: "게시글이 정상적으로 등록되었습니다.",
              icon: "success",
              confirmButtonText: "확인",
              confirmButtonColor: " #8aa996",
            }).then(() => {
              navigate("/board/designer");
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Swal.fire({
        title: "필수 항목 입력",
        text: "필수 항목을 입력하세요.",
        icon: "warning",
        confirmButtonText: "확인",
        confirmButtonColor: " #8aa996",
      });
    }
  };

  return (
    <section className="section designer-writer-wrap">
      <div className="page-title">
        <h3>작업 후기 작성</h3>
      </div>
      <div className="designer-card">
        <DesignerFrm
          designerReviewTitle={designerReviewTitle}
          setDesignerReviewTitle={setDesignerReviewTitle}
          afterImg={afterImg}
          setAfterImg={setAfterImg}
          beforeImg={beforeImg}
          setBeforeImg={setBeforeImg}
          oneText={oneText}
          setOneText={setOneText}
          interiorCustomer={interiorCustomer}
          setInteriorCustomer={setInteriorCustomer}
          categoryCsv={categoryCsv}
          setCategoryCsv={setCategoryCsv}
          interiorPrice={interiorPrice}
          setInteriorPrice={setInteriorPrice}
          prefill={prefill}
          setPrefill={setPrefill}
          activeCats={activeCats}
        />

        {/* 본문 에디터 */}
        <div className="content-box">
          <TextEditor
            data={designerReviewContent}
            setData={setDesignerReviewContent}
            uploadBase="/board/designer"
            contentBase="/board/designerReview"
          />
        </div>

        {/* 하단 버튼 */}
        <div className="writer-btns">
          <Link to="/board/designer" className="btn ghost">
            취소
          </Link>
          <button type="button" className="btn solid" onClick={upload}>
            등록하기
          </button>
        </div>
      </div>
    </section>
  );
};

export default DesignerWriter;
