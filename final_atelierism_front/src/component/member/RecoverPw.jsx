import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const RecoverPw = () => {
  const backServer = import.meta.env.VITE_BACK_SERVER;

  const [memberId, setMemberId] = useState("");
  const [idCheck, setIdCheck] = useState(0); // 0: 초기, 1: 존재, 2: 형식 오류, 3: 없음
  const [memberEmail, setMemberEmail] = useState("");
  const [mailCode, setMailCode] = useState(null);
  const [inputCode, setInputCode] = useState("");
  const [authMsg, setAuthMsg] = useState("");
  const [authColor, setAuthColor] = useState("black");
  const [isAuthVisible, setIsAuthVisible] = useState(false);
  const [time, setTime] = useState(180);
  const intervalRef = useRef(null);

  const [newPw, setNewPw] = useState("");
  const [newPwRe, setNewPwRe] = useState("");
  const pwRegMsgRef = useRef(null);
  const pwMatchMsgRef = useRef(null);

  const navigate = useNavigate();

  // 아이디 존재 여부 확인
  const checkId = () => {
    const idReg = /^[a-zA-Z0-9]{6,12}$/;
    if (!idReg.test(memberId)) {
      setIdCheck(2);
      return;
    }
    axios
      .get(`${backServer}/member/exists?memberId=${memberId}`)
      .then((res) => {
        if (res.data === 1) setIdCheck(1);
        else setIdCheck(3);
      })
      .catch((err) => console.log(err));
  };

  // 이메일 인증코드 전송
  const sendCode = async () => {
    try {
      clearInterval(intervalRef.current);
      setTime(180);
      setIsAuthVisible(true);
      setAuthMsg("");
      const res = await axios.get(
        `${backServer}/member/sendCode?memberEmail=${memberEmail}`
      );
      setMailCode(res.data);
    } catch (err) {
      setAuthMsg("인증코드 전송 실패");
      setAuthColor("#F67272");
    }
  };

  // 인증번호 검증
  const verifyCode = () => {
    if (inputCode === mailCode) {
      setAuthMsg("인증 완료");
      setAuthColor("#40C79C");
      clearInterval(intervalRef.current);
      setMailCode(null);
      setTime(0);
    } else {
      setAuthMsg("인증번호를 확인해주세요");
      setAuthColor("#F67272");
    }
  };

  // 타이머 작동
  useEffect(() => {
    if (!isAuthVisible) return;

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setMailCode(null);
          setAuthMsg("인증시간 만료");
          setAuthColor("red");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isAuthVisible]);

  // 비밀번호 정규식 검사
  const checkPwReg = () => {
    pwRegMsgRef.current.classList.remove("valid", "invalid");
    const pwReg =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    if (!pwReg.test(newPw)) {
      pwRegMsgRef.current.classList.add("invalid");
      pwRegMsgRef.current.innerText =
        "비밀번호는 영문, 숫자, 특수문자를 포함한 8~16자여야 합니다.";
    } else {
      pwRegMsgRef.current.classList.add("valid");
      pwRegMsgRef.current.innerText = "사용 가능한 비밀번호입니다.";
    }
  };

  // 비밀번호 일치 검사
  const checkPwMatch = () => {
    pwMatchMsgRef.current.classList.remove("valid", "invalid");
    if (newPw === "") return;
    if (newPw === newPwRe) {
      pwMatchMsgRef.current.classList.add("valid");
      pwMatchMsgRef.current.innerText = "비밀번호가 일치합니다.";
    } else {
      pwMatchMsgRef.current.classList.add("invalid");
      pwMatchMsgRef.current.innerText = "비밀번호가 일치하지 않습니다.";
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

  // 비밀번호 재설정 요청
  const resetPw = () => {
    if (
      idCheck !== 1 ||
      !pwRegMsgRef.current.classList.contains("valid") ||
      newPw !== newPwRe
    ) {
      Swal.fire("입력 오류", "입력 내용을 확인해주세요.", "warning");
      return;
    }

    if (authMsg !== "인증 완료") {
      Swal.fire("이메일 인증", "이메일 인증을 완료해주세요.", "warning");
      return;
    }
    axios
      .patch(`${backServer}/member/resetPw`, {
        memberId,
        memberPw: newPw,
      })
      .then((res) => {
        if (res.data === 1) {
          Swal.fire("완료", "비밀번호가 재설정되었습니다.", "success").then(
            () => {
              navigate("/member/login");
            }
          );
        } else {
          Swal.fire("실패", "비밀번호 재설정에 실패했습니다.", "error");
        }
      })
      .catch(() => {
        Swal.fire("오류", "서버 오류가 발생했습니다.", "error");
      });
  };

  return (
    <section className="recover-wrap">
      <div className="page-title">비밀번호 찾기</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          resetPw();
        }}
      >
        <div className="input-wrap">
          <div className="input-title">
            <label htmlFor="memberId">아이디</label>
          </div>
          <div
            className="input-item"
            style={{ flexDirection: "column", alignItems: "flex-start" }}
          >
            <input
              type="text"
              id="memberId"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              onBlur={checkId}
              placeholder="아이디를 입력해주세요"
              required
            />
            <p
              className={
                idCheck === 0
                  ? "input-msg"
                  : idCheck === 1
                  ? "input-msg valid"
                  : "input-msg invalid"
              }
            >
              {idCheck === 0
                ? ""
                : idCheck === 1
                ? "존재하는 아이디입니다."
                : idCheck === 2
                ? "아이디 형식을 확인해주세요."
                : "존재하지 않는 아이디입니다."}
            </p>
          </div>
        </div>

        <div className="input-wrap">
          <div className="input-title">
            <label htmlFor="memberEmail">이메일</label>
          </div>
          <div className="input-item">
            {!isAuthVisible && (
              <>
                <input
                  type="text"
                  id="memberEmail"
                  value={memberEmail}
                  onChange={(e) => setMemberEmail(e.target.value)}
                  placeholder="이메일을 입력해주세요"
                  required
                />
                <button type="button" onClick={sendCode}>
                  인증코드 전송
                </button>
              </>
            )}
            {isAuthVisible && (
              <div
                className="check-email"
                style={{ display: "flex", alignItems: "center", gap: "1px" }}
              >
                <input
                  type="text"
                  placeholder="인증번호를 입력해주세요"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                />
                {authMsg && (
                  <p style={{ color: authColor, clear: "both" }}>{authMsg}</p>
                )}
                {time > 0 && (
                  <p
                    style={{
                      color: "green",
                      marginTop: "5px",
                      marginLeft: "10px",
                    }}
                  >
                    {formatTime(time)}
                  </p>
                )}
                <button type="button" onClick={verifyCode} style={{}}>
                  인증하기
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="input-wrap">
          <div className="input-title">
            <label htmlFor="newPw">새 비밀번호</label>
          </div>
          <div
            className="input-item"
            style={{ flexDirection: "column", alignItems: "flex-start" }}
          >
            <input
              type="password"
              id="newPw"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              onBlur={checkPwReg}
              placeholder="새 비밀번호를 입력해주세요"
              required
            />
            <p className="input-msg" ref={pwRegMsgRef}></p>
          </div>
        </div>

        <div className="input-wrap">
          <div className="input-title">
            <label htmlFor="newPwRe">새 비밀번호 확인</label>
          </div>
          <div
            className="input-item"
            style={{ flexDirection: "column", alignItems: "flex-start" }}
          >
            <input
              type="password"
              id="newPwRe"
              value={newPwRe}
              onChange={(e) => setNewPwRe(e.target.value)}
              onBlur={checkPwMatch}
              placeholder="비밀번호를 다시 입력해주세요"
              required
            />
            <p className="input-msg" ref={pwMatchMsgRef}></p>
          </div>
        </div>

        <div className="recovery-btn">
          <button type="submit" className="btn-primary lg">
            비밀번호 재설정
          </button>
        </div>
      </form>
    </section>
  );
};

export default RecoverPw;
