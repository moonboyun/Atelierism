import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./member.css";

const RecoverId = () => {
  const backServer = import.meta.env.VITE_BACK_SERVER;
  const navigate = useNavigate();

  const [memberName, setMemberName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberEmail, setMemberEmail] = useState("");

  // 이메일 인증 관련 상태
  const [mailCode, setMailCode] = useState(null);
  const [inputCode, setInputCode] = useState("");
  const [authMsg, setAuthMsg] = useState("");
  const [authColor, setAuthColor] = useState("black");
  const [isAuthVisible, setIsAuthVisible] = useState(false);
  const [time, setTime] = useState(180);
  const intervalRef = useRef(null);

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
          setAuthColor("red");
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
      setAuthColor("red");
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
      setAuthColor("red");
    }
  };

  // 인증번호 확인
  const verifyCode = () => {
    if (inputCode === mailCode) {
      setAuthMsg("인증 완료");
      setAuthColor("blue");
      clearInterval(intervalRef.current);
      setMailCode(null);
      setTime(0);
    } else {
      setAuthMsg("인증번호가 일치하지 않습니다.");
      setAuthColor("red");
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
      Swal.fire("입력 오류", "모든 정보를 입력해주세요.", "warning");
      return;
    }

    if (authMsg !== "인증 완료") {
      Swal.fire("인증 필요", "이메일 인증을 완료해주세요.", "warning");
      return;
    }

    try {
      const res = await axios.post(`${backServer}/member/findId`, {
        memberName,
        memberPhone,
        memberEmail,
      });

      if (res.data) {
        Swal.fire({
          title: "아이디 찾기 성공",
          html: `회원님의 아이디는 <b>${res.data}</b> 입니다.`,
          icon: "success",
        }).then(() => {
          navigate("/member/login"); // 아이디 확인 후 로그인 페이지로 이동
        });
      } else {
        Swal.fire("실패", "입력하신 정보와 일치하는 계정이 없습니다.", "error");
      }
    } catch (err) {
      Swal.fire("서버 오류", "요청 처리 중 오류가 발생했습니다.", "error");
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
              onChange={(e) => setMemberPhone(e.target.value)}
              placeholder="전화번호를 입력해주세요"
              required
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
          <button type="submit">아이디 찾기</button>
        </div>
      </form>
    </section>
  );
};

export default RecoverId;
