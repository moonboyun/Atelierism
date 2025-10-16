import "./interior.css";

const InteriorApplication = ({ onClose }) => {
  return (
    <section className="inter-section">
      <div className="inter-content">
        <button onClick={onClose} style={{ float: "right" }}>
          X
        </button>
        <div className="main-title">인테리어 컨설팅</div>
        <p>ui 기능 넣기</p>
      </div>
    </section>
  );
};

export default InteriorApplication;
