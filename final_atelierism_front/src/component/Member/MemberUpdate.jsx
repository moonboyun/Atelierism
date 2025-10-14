import { Link } from "react-router-dom";

const MemberUpdate = () => {
  return (
    <div className="update-wrap">
      <div className="page-title">회원정보 수정</div>

      <form>
        <table className="update-tbl">
          <tbody>
            <tr>
              <th>아이디</th>
              <td>
                <input type="text" readOnly></input>
              </td>
            </tr>
            <tr>
              <th>기존 비밀번호</th>
              <td>
                <input type="password"></input>
              </td>
            </tr>
            <tr>
              <th>새 비밀번호</th>
              <td>
                <input type="password"></input>
              </td>
            </tr>
            <tr>
              <th>새 비밀번호 확인</th>
              <td>
                <input type="password"></input>
              </td>
            </tr>
            <tr>
              <th>전화번호</th>
              <td>
                <input type="text"></input>
              </td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>
                <input type="text"></input>
              </td>
            </tr>
            <tr>
              <th>주소</th>
              <td>
                <input type="text"></input>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="update-btn">
          <button type="button">
            <Link to="/member/mypage">취소하기</Link>
          </button>
          <button type="button">
            <Link to="/member/mypage">수정하기</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemberUpdate;
