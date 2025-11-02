import { Link, useNavigate } from "react-router-dom";
import "./member.css";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { loginIdState, memberTypeState } from "../utils/RecoilData";
import axios from "axios";
import Swal from "sweetalert2";
const MemberLogin = () => {
  //RecoilData에서 선언한 데이터
  const [memberId, setMemberId] = useRecoilState(loginIdState); //로그인한 회원 아이디
  const [memberType, setMemberType] = useRecoilState(memberTypeState); //로그인한 회원 등급
  const [member, setMember] = useState({
    //로그인창 들어갈 때 아이디 비밀번호 입력칸 빈 객체로 설정
    memberId: "",
    memberPw: "",
  });
  const inputMemberData = (e) => {
    const name = e.target.name; //아이디랑 비밀번호 속성 값
    const value = e.target.value; //입력된 값
    const newMember = { ...member, [name]: value }; //기존 멤버객체 복사 후
    setMember(newMember); //새로운 멤버 객체로 업데이트
  };
  const navigate = useNavigate();

  const login = () => {
    if (member.memberId !== "" && member.memberPw !== "") {
      const backServer = import.meta.env.VITE_BACK_SERVER;
      axios
        .post(`${backServer}/member/login`, member)
        .then((res) => {
          if (res.data && res.data.memberId) {
            setMemberId(res.data.memberId); //로그인한 회원 아이디 정보
            setMemberType(res.data.memberType); //로그인한 회원 등급 정보
            //로그인 이후 axios 통한 요청을 수행하는 경우 토큰값을 자동으로 axios에 추가하는 로직
            axios.defaults.headers.common["Authorization"] =
              res.data.accessToken;
            //로그인을 성공하면 갱신을 위한 refreshToken을 브라우저에 저장
            window.localStorage.setItem("refreshToken", res.data.refreshToken);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: "로그인 실패",
            text: "아이디 또는 비밀번호를 확인하세요",
            icon: "warning",
          });
        });
    } else {
      Swal.fire({
        title: "로그인 실패",
        text: "아이디 또는 비밀번호를 입력하세요",
        icon: "warning",
      });
    }
  };
  return (
    <section className="login-wrap">
      <div className="page-title">로그인</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
      >
        <div className="input-wrap">
          <div className="input-title">
            <label htmlFor="memberId">아이디</label>
          </div>
          <div className="input-item">
            <input
              type="text"
              name="memberId"
              id="memberId"
              placeholder="아이디를 입력하세요"
              value={member.memberId}
              onChange={inputMemberData}
              autocomplete="off"
            />
          </div>
        </div>

        <div className="input-wrap">
          <div className="input-title">
            <label htmlFor="memberPw">비밀번호</label>
          </div>
          <div className="input-item">
            <input
              type="password"
              name="memberPw"
              id="memberPw"
              placeholder="비밀번호를 입력하세요"
              value={member.memberPw}
              onChange={inputMemberData}
              autocomplete="off"
            />
          </div>
        </div>
        <div className="login-button">
          <button type="submit">로그인</button>
        </div>
        <div className="member-link-box">
          <Link to="/member/agree">회원가입</Link>
          <Link to="/member/recoverId">아이디 찾기</Link>
          <Link to="/member/recoverPw">비밀번호 찾기</Link>
        </div>
      </form>
    </section>
  );
};

export default MemberLogin;
