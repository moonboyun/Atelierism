import { ArrowForwardIos, Clear } from "@mui/icons-material";
import "./interior.css";

const InteriorApplication = ({ onClose }) => {
  return (
    <section className="inter-section">
      <div className="inter-content">
        <button onClick={onClose} style={{ float: "right" }}>
          <Clear className="inter-del-btn" />
        </button>
        <DesignerCheck />
        <div className="inter-next-box">
          <button className="inter-next-btn">
            다음 <ArrowForwardIos />
          </button>
        </div>
      </div>
    </section>
  );
};
const DesignerCheck = () => {
  return (
    <div className="inter-title-box">
      <div className="main-title">1 / 4 디자이너 선택</div>
      <p>나만의 공간을 완성할 맞춤형 디자이너를 선택하세요.</p>
    </div>
  );
};
export default InteriorApplication;
