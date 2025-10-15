import { Link } from "react-router-dom";

const RecoverPw = () => {
  return (
    <section className="recover-wrap">
      <div className="page-title">비밀번호 찾기</div>
      <form>
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
              name="memberEmail"
              id="memberEmail"
              placeholder="이메일을 입력하세요"
            />
            <button type="button">인증코드 전송</button>
            <div className="check-email">
              <input type="text" placeholder="인증번호를 입력해주세요" />
              <button type="button">인증하기</button>
            </div>
          </div>
        </div>
        <div className="input-wrap">
          <div className="input-title">
            <label htmlFor="memberPw">새 비밀번호</label>
          </div>
          <div className="input-item">
            <input
              type="password"
              id="memberPw"
              name="memberPw"
              placeholder="새 비밀번호를 입력해주세요"
            ></input>
          </div>
        </div>
        <div className="input-wrap">
          <div className="input-title">
            <label htmlFor="memberPwRe">새 비밀번호 확인</label>
          </div>
          <div className="input-item">
            <input
              type="password"
              id="memberPwRe"
              name="memberPwRe"
              placeholder="새 비밀번호를 확인해주세요"
            ></input>
          </div>
        </div>
        <div className="recovery-btn">
          <button type="submit">
            <Link to="/member/login">로그인 페이지로 이동</Link>
          </button>
        </div>
      </form>
    </section>
  );
};

export default RecoverPw;
