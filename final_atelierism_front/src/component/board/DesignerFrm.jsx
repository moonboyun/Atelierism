import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";

const DesignerFrm = (props) => {
  const designerReviewTitle = props.designerReviewTitle;
  const setDesignerReviewTitle = props.setDesignerReviewTitle;
  const interiorCustomer = props.interiorCustomer;
  const setInteriorCustomer = props.setInteriorCustomer;
  const oneText = props.oneText;
  const setOneText = props.setOneText;
  const beforeImg = props.beforeImg;
  const setBeforeImg = props.setBeforeImg;
  const afterImg = props.afterImg;
  const setAfterImg = props.setAfterImg;
  const interiorKategorie = props.interiorKategorie;
  const setInteriorKategorie = props.setInteriorKategorie;
  const interiorPrice = props.interiorPrice;
  const setInteriorPrice = props.setInteriorPrice;
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  return (
    <div className="frm-wrap">
      <table className="tbl">
        <tbody>
          <tr>
            <th>
              <label htmlFor="designerReviewTitle">제목</label>
            </th>
            <td>
              <div className="title">
                <input
                  type="text"
                  id="designerReviewTitle"
                  name="designerReviewTitle"
                  placeholder="제목을 입력해주세요"
                  value={designerReviewTitle}
                  onChange={(e) => {
                    setDesignerReviewTitle(e.target.value);
                  }}
                />
              </div>
            </td>
          </tr>
          <tr>
            <th>
              <span className="writer">디자이너</span>
            </th>
            <td>
              <div className="writer-div">
                <span className="writer">{memberId}</span>
              </div>
            </td>
          </tr>
          <tr>
            <th>
              <span className="interiorCustomer">의뢰자</span>
            </th>
            <td>
              <div className="interiorCustomer-div">
                <span className="interiorCustomer">{interiorCustomer}</span>
              </div>
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="oneText">한줄평</label>
            </th>
            <td>
              <div className="oneText-div">
                <input
                  type="text"
                  id="oneText"
                  name="oneText"
                  placeholder="간단한 한줄평을 입력하세요."
                  value={oneText}
                  onChange={(e) => {
                    setOneText(e.target.value);
                  }}
                />
              </div>
            </td>
          </tr>
          <tr>
            <th>
              <span className="interiorKategorie">총 견적비</span>
            </th>
            <td>
              <div className="interiorPrice-div">
                <span className="interiorPrice">{interiorPrice}</span>
              </div>
            </td>
          </tr>
          <tr>
            <th>
              <span className="interiorKategorie"></span>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DesignerFrm;
