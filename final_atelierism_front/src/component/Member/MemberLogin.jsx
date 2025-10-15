import { Link } from "react-router-dom";
import "./member.css";
const MemberLogin = () => {
  return (
    <section className="login-wrap">
      <div className="page-title">로그인</div>
      <form>
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
            />
          </div>
        </div>
        <div className="login-button">
          <button type="submit" className="btn-primary lg">
            로그인
          </button>
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
