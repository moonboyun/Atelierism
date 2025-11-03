import { useRef, useState } from "react";
//import "./boardDesigner.css";
import "./designerWriter.css";
import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";

const DesignerFrm = (props) => {
  const designerReviewTitle = props.designerReviewTitle;
  const setDesignerReviewTitle = props.setDesignerReviewTitle;
  const designerReviewContent = props.designerReviewContent;
  const setDesignerReviewContent = props.setDesignerReviewContent;
  const oneText = props.oneText;
  const setOneText = props.setOneText;
  const beforeImg = props.beforeImg;
  const setBeforeImg = props.setBeforeImg;
  const afterImg = props.afterImg;
  const setAfterImg = props.setAfterImg;
  const interiorCustomer = props.interiorCustomer;
  const setInteriorCustomer = props.setInteriorCustomer;
  const categoryCsv = props.categoryCsv;
  const setCategoryCsv = props.setCategoryCsv;
  const interiorPrice = props.interiorPrice;
  const setInteriorPrice = props.setInteriorPrice;
  const prefill = props.prefill;
  const setPrefill = props.setPrefill;
  const activeCats = props.activeCats;
  const [designerReviewWriter, setDesignerReviewWriter] =
    useRecoilState(loginIdState);
  const [showBefore, setShowBefore] = useState(null);
  const [showAfter, setShowAfter] = useState(null);
  const beforeRef = useRef(null);
  const afterRef = useRef(null);

  // Before 변경 핸들러
  const changeBefore = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      setBeforeImg(null);
      setShowBefore(null);
      return;
    }
    setBeforeImg(files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => setShowBefore(reader.result);
  };
  // After 변경 핸들러
  const changeAfter = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      setAfterImg(null);
      setShowAfter(null);
      return;
    }
    setAfterImg(files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => setShowAfter(reader.result);
  };

  return (
    <div className="designer-top">
      <div className="board-thumb-wrap">
        {/* Before */}
        <div
          className="thumb-box"
          onClick={() => beforeRef.current.click()}
          role="button"
          aria-label="before-uploader"
        >
          {showBefore ? (
            <img src={showBefore} alt="Before" />
          ) : (
            <div className="thumb-placeholder">Before 이미지 추가</div>
          )}
        </div>
        <input
          ref={beforeRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={changeBefore}
        />

        {/* After */}
        <div
          className="thumb-box"
          onClick={() => afterRef.current.click()}
          role="button"
          aria-label="after-uploader"
        >
          {showAfter ? (
            <img src={showAfter} alt="After" />
          ) : (
            <div className="thumb-placeholder">After 이미지 추가</div>
          )}
        </div>
        <input
          ref={afterRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={changeAfter}
        />
      </div>

      {/* 우측 정보(제목/작성자/의뢰자/가격/카테고리/한줄평) */}
      <div className="board-info-wrap">
        <table className="tbl designer-tbl">
          <tbody>
            {/* 제목 */}
            <tr>
              <th>
                <label htmlFor="designerReviewTitle">
                  제목 <span className="red">*</span>
                </label>
              </th>
              <td>
                <div className="input-item">
                  <input
                    type="text"
                    id="designerReviewTitle"
                    name="designerReviewTitle"
                    value={designerReviewTitle}
                    onChange={(e) => setDesignerReviewTitle(e.target.value)}
                    placeholder="제목을 입력하세요."
                  />
                </div>
              </td>
            </tr>

            {/* 작성자 */}
            <tr>
              <th>작성자</th>
              <td className="readonly">
                {designerReviewWriter || "로그인 필요"}
              </td>
            </tr>

            {/* 의뢰자 */}
            <tr>
              <th>의뢰자</th>
              <td className="readonly">
                {prefill?.interiorCustomer ??
                  prefill?.customerName ??
                  prefill?.customerId ??
                  ""}
              </td>
            </tr>

            {/* 견적비 */}
            <tr>
              <th>견적비</th>
              <td className="readonly">{prefill?.interiorPrice ?? ""}</td>
            </tr>

            {/* 카테고리 */}
            <tr>
              <th>카테고리</th>
              <td className="dw-cats">
                {activeCats?.length
                  ? activeCats.map((c) => (
                      <span key={c} className="pill">
                        {c}
                      </span>
                    ))
                  : "선택된 공간 없음"}
              </td>
            </tr>

            {/* 한줄평 */}
            <tr>
              <th>
                <label htmlFor="oneText">
                  한줄평 <span className="red">*</span>
                </label>
              </th>
              <td>
                <div className="input-item">
                  <input
                    type="text"
                    id="oneText"
                    name="oneText"
                    value={oneText}
                    onChange={(e) => setOneText(e.target.value)}
                    placeholder="한줄 요약을 입력해주세요."
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DesignerFrm;
