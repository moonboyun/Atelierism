import { Link } from "react-router-dom";
import "./member.css";
const MemberJoin = () => {
  return (
    <section className="join-wrap">
      <div className="page-title">회원가입</div>
      <div className="input-wrap">
        <div className="input-title">
          <label htmlFor="memberId">아이디</label>
        </div>
        <div className="input-item">
          <input
            type="text"
            id="memberId"
            name="memberId"
            placeholder="아이디를 입력해주세요"
            required
          ></input>
          <button type="button" className="checkId">
            중복체크
          </button>
        </div>
      </div>
      <div className="input-wrap">
        <div className="input-title">
          <label htmlFor="memberPw">비밀번호</label>
        </div>
        <div className="input-item">
          <input
            type="text"
            id="memberPw"
            name="memberPw"
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
            type="text"
            id="memberPwRe"
            name="memberPwRe"
            placeholder="비밀번호를 확인해주세요"
            required
          ></input>
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
            placeholder="이름을 입력해주세요"
            required
          ></input>
        </div>
      </div>
      <div className="input-wrap">
        <div className="input-title">
          <label htmlFor="memberAge">나이</label>
        </div>
        <div className="input-item">
          <input
            type="text"
            id="memberAge"
            name="memberAge"
            placeholder="나이를 입력해주세요"
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
            placeholder="이메일을 입력해주세요"
            required
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
            placeholder="주소를 입력해주세요"
            required
          ></input>
          <button className="button">우편번호 조회</button>
          <input
            type="text"
            id="memberAddr"
            name="memberAddrDetail"
            placeholder="상세주소를 입력해주세요"
            required
          ></input>
        </div>
      </div>
      <div className="join-button">
        <button type="submit" className="btn-primary lg">
          <Link to="/">회원가입</Link>
        </button>
      </div>
    </section>
  );
};

export default MemberJoin;
