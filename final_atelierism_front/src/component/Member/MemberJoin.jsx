import { Link, useNavigate } from "react-router-dom";
import "./member.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";
import Swal from "sweetalert2";

const MemberJoin = () => {
  const [member, setMember] = useState({
    memberId: "",
    memberPw: "",
    memberName: "",
    memberPhone: "",
    memberEmail: "",
    memberAddr: "",
    memberAddrDetail: "",
  });

  const formatPhoneNumber = (value) => {
    value = value.replace(/\D/g, "");
    if (value.length < 4) return value;
    if (value.length < 8) {
      return value.slice(0, 3) + "-" + value.slice(3);
    }
    return (
      value.slice(0, 3) + "-" + value.slice(3, 7) + "-" + value.slice(7, 11)
    );
  };

  const inputMemberData = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "memberPhone") {
      value = value.replace(/\D/g, "");
      value = formatPhoneNumber(value, 3, "-");
      if (value.endsWith("-")) {
        value = value.slice(0, -1);
      }
    }
    const newMember = { ...member, [name]: value };
    setMember(newMember);
  };

  const backServer = import.meta.env.VITE_BACK_SERVER;

  const [idCheck, setIdCheck] = useState(0);
  const checkId = () => {
    const idReg = /^[a-zA-Z0-9]{6,12}$/;
    if (idReg.test(member.memberId)) {
      axios
        .get(`${backServer}/member/exists?memberId=${member.memberId}`)
        .then((res) => {
          if (res.data === 1) {
            setIdCheck(3);
          } else {
            setIdCheck(1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setIdCheck(2);
    }
  };

  const [memberPwRe, setMemberPwRe] = useState("");
  const pwRegMsgRef = useRef(null);

  const checkPwReg = () => {
    pwRegMsgRef.current.classList.remove("valid", "invalid");
    const pwReg =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    if (!pwReg.test(member.memberPw)) {
      pwRegMsgRef.current.classList.add("invalid");
      pwRegMsgRef.current.innerText =
        "비밀번호는 영문, 숫자, 특수문자를 포함한 8~16자여야 합니다.";
    } else {
      pwRegMsgRef.current.classList.add("valid");
      pwRegMsgRef.current.innerText = "사용 가능한 비밀번호입니다.";
    }
  };

  const pwMatchMsgRef = useRef(null);
  const checkPw = () => {
    pwMatchMsgRef.current.classList.remove("valid", "invalid");
    if (memberPwRe === "") return;
    if (member.memberPw === memberPwRe) {
      pwMatchMsgRef.current.classList.add("valid");
      pwMatchMsgRef.current.innerText = "비밀번호가 일치합니다.";
    } else {
      pwMatchMsgRef.current.classList.add("invalid");
      pwMatchMsgRef.current.innerText = "비밀번호가 일치하지 않습니다.";
    }
  };

  const navigate = useNavigate();

  // 회원가입 함수 수정
  const joinMember = () => {
    if (
      member.memberName !== "" &&
      member.memberPhone !== "" &&
      member.memberEmail !== "" &&
      member.memberAddr !== "" &&
      member.memberAddrDetail !== "" &&
      idCheck === 1 &&
      pwRegMsgRef.current.classList.contains("valid")
    ) {
      if (authColor !== "#40C79C") {
        Swal.fire("이메일 인증을 완료해주세요");
        return;
      }

      const sendMember = { ...member, memberAddr: memberAddr.address };

      axios
        .post(`${backServer}/member`, sendMember)
        .then((res) => {
          if (res.data === 1) {
            // 회원가입 성공 시 alert 띄우기
            Swal.fire({
              title: "회원가입 완료 🎉",
              text: "회원가입이 성공적으로 완료되었습니다!",
              icon: "success",
              confirmButtonText: "확인",
            }).then(() => {
              navigate("/"); // 확인 누르면 메인으로 이동
            });
          }
        })
        .catch((err) => {
          console.error(err);
          Swal.fire("회원가입 중 오류가 발생했습니다.");
        });
    } else {
      Swal.fire("모든 필수 정보를 입력해주세요.");
    }
  };

  const [isModal, setIsModal] = useState(false);
  const [memberAddr, setMemberAddr] = useState({
    zonecode: "",
    address: "",
  });

  const openModal = () => setIsModal(true);
  const closeModal = () => setIsModal(false);

  const onComplete = (data) => {
    setMemberAddr({ zonecode: data.zonecode, address: data.address });
    closeModal();
    setMember({ ...member, memberAddr: data.address });
  };

  const [mailCode, setMailCode] = useState(null);
  const [inputCode, setInputCode] = useState("");
  const [authMsg, setAuthMsg] = useState("");
  const [authColor, setAuthColor] = useState("black");
  const [isAuthVisible, setIsAuthVisible] = useState(false);
  const [time, setTime] = useState(180);
  const intervalRef = useRef(null);

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

  const sendCode = async () => {
    try {
      clearInterval(intervalRef.current);
      setTime(180);
      setIsAuthVisible(true);
      setAuthMsg("");
      const res = await axios.get(
        `${backServer}/member/sendCode?memberEmail=${member.memberEmail}`
      );
      setMailCode(res.data);
    } catch (error) {
      setAuthMsg("인증코드 전송에 실패했습니다.");
      setAuthColor("#F67272");
    }
  };

  const verifyCode = () => {
    if (inputCode === mailCode) {
      setAuthMsg("인증완료");
      setAuthColor("#40C79C");
      clearInterval(intervalRef.current);
      setMailCode(null);
      setTime(0);
    } else {
      setAuthMsg("인증번호를 입력하세요");
      setAuthColor("#F67272");
    }
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <section className="join-wrap">
      <div className="page-title">회원가입</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          joinMember();
        }}
      >
        <div className="input-wrap">
          <div className="input-title">
            <label htmlFor="memberId">아이디</label>
          </div>
          <div className="input-item">
            <input
              type="text"
              id="memberId"
              name="memberId"
              value={member.memberId}
              onChange={inputMemberData}
              onBlur={checkId}
              placeholder="아이디를 입력해주세요"
              required
            ></input>
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
                ? "사용 가능한 아이디입니다."
                : idCheck === 2
                ? "아이디는 영어 대/소문자+숫자로 6~12글자 입니다."
                : "이미 사용중인 아이디입니다."}
            </p>
          </div>
        </div>
        <div className="input-wrap">
          <div className="input-title">
            <label htmlFor="memberPw">비밀번호</label>
          </div>
          <div className="input-item">
            <input
              type="password"
              id="memberPw"
              name="memberPw"
              value={member.memberPw}
              onChange={inputMemberData}
              onBlur={checkPwReg}
              placeholder="비밀번호를 입력해주세요"
              required
            ></input>
            <p className="input-msg" ref={pwRegMsgRef}></p>
          </div>
        </div>
        <div className="input-wrap">
          <div className="input-title">
            <label htmlFor="memberPwRe">비밀번호 확인</label>
          </div>
          <div className="input-item">
            <input
              type="password"
              id="memberPwRe"
              name="memberPwRe"
              placeholder="비밀번호를 확인해주세요"
              value={memberPwRe}
              onChange={(e) => {
                setMemberPwRe(e.target.value);
              }}
              onBlur={checkPw}
              required
            ></input>
            <p className="input-msg" ref={pwMatchMsgRef}></p>
          </div>
        </div>
        <div className="input-wrap">
          <div className="input-title">
            <label htmlFor="memberName">이름</label>
          </div>
          <div className="input-item">
            <input
              type="text"
              id="memberName"
              name="memberName"
              value={member.memberName}
              onChange={inputMemberData}
              placeholder="이름을 입력해주세요"
              required
            ></input>
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
              name="memberPhone"
              value={member.memberPhone}
              onChange={inputMemberData}
              placeholder="전화번호를 입력해주세요"
              required
            ></input>
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
                  name="memberEmail"
                  value={member.memberEmail}
                  onChange={inputMemberData}
                  placeholder="이메일을 입력해주세요"
                  required
                />
                <button type="button" onClick={sendCode}>
                  인증코드 전송
                </button>
              </>
            )}

            {isAuthVisible && (
              <div className="check-email">
                <input
                  type="text"
                  placeholder="인증번호를 입력해주세요"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  style={{ float: "left" }}
                />
                {time > 0 && (
                  <p
                    style={{
                      color: "green",
                      marginTop: "5px",
                      float: "left",
                      marginRight: "10px",
                    }}
                  >
                    {formatTime(time)}
                  </p>
                )}
                <button
                  type="button"
                  onClick={verifyCode}
                  style={{ cursor: "pointer" }}
                >
                  인증하기
                </button>
                {authMsg && (
                  <p
                    style={{
                      color: authColor,
                      clear: "both",
                    }}
                  >
                    {authMsg}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="input-wrap">
          <div className="input-title">
            <label htmlFor="memberAddr">주소</label>
          </div>
          <div className="input-item">
            <input
              type="text"
              id="memberAddr"
              name="memberAddr"
              value={memberAddr.address}
              onChange={inputMemberData}
              placeholder="주소를 입력해주세요"
            ></input>
            <button type="button" onClick={openModal}>
              우편번호 조회
            </button>
            {isModal && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  zIndex: 1000,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "white",
                    padding: "20px",
                  }}
                >
                  <DaumPostcode onComplete={onComplete} onClose={closeModal} />
                  <button onClick={closeModal} className="sb-close-modal">
                    닫기
                  </button>
                </div>
              </div>
            )}

            <input
              type="text"
              id="memberAddrDetail"
              name="memberAddrDetail"
              value={member.memberAddrDetail}
              onChange={inputMemberData}
              placeholder="상세주소를 입력해주세요"
              required
            ></input>
          </div>
        </div>
        <div className="join-button">
          <button type="submit" className="btn-primary lg">
            회원가입
          </button>
        </div>
      </form>
    </section>
  );
};

export default MemberJoin;
