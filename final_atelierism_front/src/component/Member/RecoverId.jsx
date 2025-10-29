import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import "./member.css";

const RecoverId = () => {
  const backServer = import.meta.env.VITE_BACK_SERVER;
  const navigate = useNavigate();

  const [memberName, setMemberName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberEmail, setMemberEmail] = useState("");

  // 전화번호 자동 하이픈 포맷 함수
  const formatPhoneNumber = (value) => {
    value = value.replace(/\D/g, ""); // 숫자만 추출
    if (value.length < 4) return value;
    if (value.length < 8) {
      return value.slice(0, 3) + "-" + value.slice(3);
    }
    return (
      value.slice(0, 3) + "-" + value.slice(3, 7) + "-" + value.slice(7, 11)
    );
  };

  // 전화번호 입력 시 하이픈 자동 추가
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = formatPhoneNumber(value);
    if (value.endsWith("-")) value = value.slice(0, -1);
    setMemberPhone(value);
  };

  // 이메일 인증 관련 상태
  const [mailCode, setMailCode] = useState(null);
  const [inputCode, setInputCode] = useState("");
  const [authMsg, setAuthMsg] = useState("");
  const [authColor, setAuthColor] = useState("black");
  const [isAuthVisible, setIsAuthVisible] = useState(false);
  const [time, setTime] = useState(180);
  const intervalRef = useRef(null);

  // Modal 관련 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [foundId, setFoundId] = useState("");

  // react-modal 설정
  Modal.setAppElement("#root");

  // 타이머
  useEffect(() => {
    if (!isAuthVisible) return;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setMailCode(null);
          setAuthMsg("인증시간이 만료되었습니다.");
          setAuthColor("#F67272");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isAuthVisible]);

  // 인증코드 전송
  const sendCode = async () => {
    if (!memberEmail) {
      setAuthMsg("이메일을 입력해주세요.");
      setAuthColor("#F67272");
      return;
    }

    try {
      clearInterval(intervalRef.current);
      setTime(180);
      setIsAuthVisible(true);
      setAuthMsg("");
      const res = await axios.get(
        `${backServer}/member/sendCode?memberEmail=${memberEmail}`
      );
      setMailCode(res.data);
      setAuthMsg("인증코드가 전송되었습니다.");
      setAuthColor("green");
    } catch (err) {
      setAuthMsg("인증코드 전송 실패");
      setAuthColor("#F67272");
    }
  };

  // 인증번호 확인
  const verifyCode = () => {
    if (inputCode === mailCode) {
      setAuthMsg("인증 완료");
      setAuthColor("#40C79C");
      clearInterval(intervalRef.current);
      setMailCode(null);
      setTime(0);
    } else {
      setAuthMsg("인증번호가 일치하지 않습니다.");
      setAuthColor("#F67272");
    }
  };

  // 시간 포맷
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  // 아이디 찾기 로직
  const findId = async (e) => {
    e.preventDefault();

    if (!memberName || !memberPhone || !memberEmail) {
      alert("모든 정보를 입력해주세요.");
      return;
    }

    if (authMsg !== "인증 완료") {
      alert("이메일 인증을 완료해주세요.");
      return;
    }

    try {
      const res = await axios.post(`${backServer}/member/findId`, {
        memberName,
        memberPhone,
        memberEmail,
      });

      if (res.data) {
        setFoundId(res.data);
        setIsModalOpen(true);
      } else {
        alert("입력하신 정보와 일치하는 계정이 없습니다.");
      }
    } catch (err) {
      alert("요청 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <section className="recover-id-wrap">
      <div className="page-title">아이디 찾기</div>
      <form onSubmit={findId}>
        <div className="input-wrap">
          <div className="input-title">
            <label htmlFor="memberName">이름</label>
          </div>
          <div className="input-item">
            <input
              type="text"
              id="memberName"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              placeholder="이름을 입력해주세요"
              required
              style={{ width: "400px" }}
            />
          </div>
        </div>

        <div className="input-wrap">
          <div className="input-title">
            <label htmlFor="memberPhone">전화번호</label>
          </div>
          <div className="input-item">
            <input
              type="text"
              id="memberPhone"
              value={memberPhone}
              onChange={handlePhoneChange}
              placeholder="전화번호를 입력해주세요"
              required
              maxLength={13}
              style={{ width: "400px" }}
            />
          </div>
        </div>

        <div className="input-wrap">
          <div className="input-title">
            <label htmlFor="memberEmail" style={{ maxWidth: "92px" }}>
              이메일
            </label>
          </div>
          <div className="input-item">
            {!isAuthVisible ? (
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <input
                  type="text"
                  id="memberEmail"
                  value={memberEmail}
                  onChange={(e) => setMemberEmail(e.target.value)}
                  placeholder="이메일을 입력해주세요"
                  required
                  style={{
                    width: "290px",
                    border: "none",
                    borderBottom: "1px solid #9a9a9a",
                    fontSize: "18px",
                  }}
                />
                <button
                  type="button"
                  onClick={sendCode}
                  style={{
                    border: "1px solid #8aa996",
                    backgroundColor: "#8aa996",
                    padding: "5px 15px",
                    borderRadius: "8px",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  인증코드 전송
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  maxWidth: "400px",
                  alignItems: "flex-end",
                }}
              >
                <input
                  type="text"
                  placeholder="인증번호를 입력해주세요"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  style={{
                    width: "310px",
                    border: "none",
                    borderBottom: "1px solid #9a9a9a",
                  }}
                />
                {time > 0 && (
                  <span style={{ color: "green", minWidth: "50px" }}>
                    {formatTime(time)}
                  </span>
                )}
                <button
                  type="button"
                  onClick={verifyCode}
                  style={{
                    border: "1px solid #8aa996",
                    backgroundColor: "#8aa996",
                    padding: "5px 15px",
                    borderRadius: "8px",
                    color: "#fff",
                    width: "100px",
                    cursor: "pointer",
                  }}
                >
                  인증하기
                </button>
              </div>
            )}
            {authMsg && <p style={{ color: authColor }}>{authMsg}</p>}
          </div>
        </div>

        <div className="sb-recover-id-btn">
          <button type="submit" style={{ cursor: "pointer" }}>
            아이디 찾기
          </button>
        </div>
      </form>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          content: {
            width: "400px",
            height: "220px",
            margin: "auto",
            borderRadius: "10px",
            textAlign: "center",
            paddingTop: "40px",
          },
          overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>아이디 찾기 결과</h2>
        <p style={{ fontSize: "18px" }}>
          회원님의 아이디는 <b style={{ color: "#40C79C" }}>{foundId}</b>{" "}
          입니다.
        </p>
        <button
          style={{
            marginTop: "50px",
            padding: "10px 20px",
            border: "none",
            backgroundColor: "#8aa996",
            color: "#fff",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={() => {
            setIsModalOpen(false);
            navigate("/member/login");
          }}
        >
          로그인하러 가기
        </button>
      </Modal>
    </section>
  );
};

export default RecoverId;
