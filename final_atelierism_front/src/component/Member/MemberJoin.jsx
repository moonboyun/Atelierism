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
  const inputMemberData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
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
  const pwMsgRef = useRef(null);
  const checkPw = () => {
    pwMsgRef.current.classList.remove("valid");
    pwMsgRef.current.classList.remove("invalid");
    if (member.memberPw === memberPwRe) {
      pwMsgRef.current.classList.add("valid");
      pwMsgRef.current.classList.innerText = "비밀번호가 일치합니다.";
    } else {
      pwMsgRef.current.classList.add("invalid");
      pwMsgRef.current.innerText = "비밀번호가 일치하지 않습니다.";
    }
  };

  const navigate = useNavigate();
  const joinMember = () => {
    if (
      ((member.memberName !== "",
      member.memberPhone !== "",
      member.memberEmail !== "",
      member.memberAddr !== "",
      member.memberAddrDetail !== "",
      idCheck === 1 && pwMsgRef.current.classList.contains("valid")),
      emailAuthStatus === 2)
    ) {
      setMember({ ...member, memberAddr: memberAddr.address });
      console.log(member);
      axios
        .post(`${backServer}/member`, member)
        .then((res) => {
          if (res.data === 1) {
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const [isModal, setIsModal] = useState(false);
  const [memberAddr, setMemberAddr] = useState({
    zonecode: "",
    address: "",
  });
  const openModal = () => {
    setIsModal(true);
  };
  const closeModal = () => {
    setIsModal(false);
  };
  const onComplete = (data) => {
    //console.log(data);
    setMemberAddr({
      zonecode: data.zonecode,
      address: data.address,
    });
    console.log(memberAddr.address);
    closeModal;
    setMember({ ...member, memberAddr: data.address });
  };
  console.log(memberAddr);

  const [email, setEmail] = useState("");
  const [mailCode, setMailCode] = useState(null);
  const [inputCode, setInputCode] = useState("");
  const [authMsg, setAuthMsg] = useState("");
  const [authColor, setAuthColor] = useState("black");
  const [isAuthVisible, setIsAuthVisible] = useState(false);
  const [time, setTime] = useState(180); // 3분 = 180초
  const intervalRef = useRef(null);
  const emailReg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

  useEffect(() => {
    //타이머의 시간이 흘러가도록 하는 useEffect
    if (isAuthVisible && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isAuthVisible]);
  useEffect(() => {
    //위의 useEffect가 끝나면 실행되는 useEffect
    if (time === 0) {
      clearInterval(intervalRef.current);
      setMailCode(null);
      setAuthMsg("인증시간이 만료되었습니다.");
      setAuthColor("red");
    }
  }, [time]);

  const sendCode = async () => /*비동기 함수*/ {
    try {
      const res =
        await /*async 설정시 같이 사용 -> 다음 함수 실행까지 기다림*/ axios.get(
          "/member/sendCode",
          { params: { receiver: email } }
        );
      setMailCode(res.data);
      setIsAuthVisible(true);
      setTime(180);
      setAuthMsg("");
    } catch (error) {
      console.error("인증코드 전송 실패:", error);
      setAuthMsg("인증코드 전송에 실패했습니다.");
      setAuthColor("red");
    }
  };

  const verifyCode = () => {
    if (inputCode === mailCode) {
      setAuthMsg("인증완료");
      setAuthColor("blue");
      clearInterval(intervalRef.current);
      setMailCode(null);
      setTime(0);
    } else {
      setAuthMsg("인증번호를 입력하세요");
      setAuthColor("red");
    }
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
              onBlur={checkPw}
              placeholder="비밀번호를 입력해주세요"
              required
            ></input>
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
            <p className="input-msg" ref={pwMsgRef}></p>
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
            <input
              type="text"
              id="memberEmail"
              name="memberEmail"
              value={member.memberEmail}
              onChange={inputMemberData}
              placeholder="이메일을 입력해주세요"
              required
            ></input>
            <button type="button" onClick={sendCode}>
              인증코드 전송
            </button>

            <div className="check-email">
              <input
                type="text"
                placeholder="인증번호를 입력해주세요"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
              />
              <button type="button" onClick={verifyCode}>
                인증하기
              </button>
            </div>
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
