import { Link, useNavigate } from "react-router-dom";
import "./member.css";
import { useRef, useState } from "react";
import axios from "axios";
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
      (member.memberName !== "",
      member.memberPhone !== "",
      member.memberEmail !== "",
      member.memberAddr !== "",
      member.memberAddrDetail !== "",
      idCheck === 1 && pwMsgRef.current.classList.contains("valid"))
    ) {
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
            ></input>
            <button type="button">인증코드 전송</button>
            <div className="check-email">
              <input type="text" placeholder="인증번호를 입력해주세요" />
              <button type="button">인증하기</button>
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
              value={member.memberAddr}
              onChange={inputMemberData}
              placeholder="주소를 입력해주세요"
            ></input>
            <button className="button">우편번호 조회</button>
            <input
              type="text"
              id="memberAddr"
              name="memberAddrDetail"
              value={member.memberAddrDetail}
              onChange={inputMemberData}
              placeholder="상세주소를 입력해주세요"
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
