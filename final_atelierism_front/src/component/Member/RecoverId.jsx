import { Link } from "react-router-dom";
import "./member.css";
const RecoverId = () => {
  return (
    <section className="recover-wrap">
      <div className="page-title">아이디 찾기</div>
      <form>
        <div className="input-wrap">
          <div className="input-title">
            <label htmlFor="memberName">이름</label>
          </div>
          <div className="input-item">
            <input
              type="text"
              name="memberName"
              id="memberName"
              placeholder="이름을 입력하세요"
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
              name="memberPhone"
              id="memberPhone"
              placeholder="전화번호를 입력하세요"
            />
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
        <div className="recovery-btn">
          <button type="submit">
            <Link to="/member/login">로그인 페이지로 이동</Link>
          </button>
        </div>
      </form>
    </section>
  );
};

export default RecoverId;
