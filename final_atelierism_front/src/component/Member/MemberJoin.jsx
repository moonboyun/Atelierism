const MemberJoin = () => {
  return (
    <section className="join-wrap">
      <div className="page-title">회원가입</div>
      <div className="input-wrap">
        <div className="input-title">
          <label htmlFor="memberId">아이디</label>
        </div>
        <div className="input-item">
          <input type="text" id="memberId" name="memberId" required></input>
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
          <input type="text" id="memberPw" name="memberPw" required></input>
        </div>
      </div>
      <div className="input-wrap">
        <div className="input-title">
          <label htmlFor="memberPwRe">비밀번호 확인</label>
        </div>
        <div className="input-item">
          <input type="text" id="memberPwRe" name="memberPwRe" required></input>
        </div>
      </div>
      <div className="input-wrap">
        <div className="input-title">
          <label htmlFor="memberName">이름</label>
        </div>
        <div className="input-item">
          <input type="text" id="memberName" name="memberName" required></input>
        </div>
      </div>
      <div className="input-wrap">
        <div className="input-title">
          <label htmlFor="memberAge">나이</label>
        </div>
        <div className="input-item">
          <input type="text" id="memberAge" name="memberAge" required></input>
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
            required
          ></input>
          <button type="button">인증코드 전송</button>
        </div>
      </div>
      <div className="input-wrap">
        <div className="input-title">
          <label htmlFor="memberAddr">주소</label>
        </div>
        <div className="input-item">
          <input type="text" id="memberAddr" name="memberAddr" required></input>
          <button className="button">우편번호 조회</button>
        </div>
      </div>
      <div className="join-button">
        <button type="submit" className="btn-primary lg">
          회원가입
        </button>
      </div>
    </section>
  );
};

export default MemberJoin;
