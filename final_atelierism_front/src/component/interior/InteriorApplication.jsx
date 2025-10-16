import "./interior.css";

const InteriorApplication = ({ onClose }) => {
  return (
    <section className="inter-section">
      <div
        className="inter-content"
        style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 8,
          width: "80%",
          maxWidth: 600,
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
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
