import { Link } from "react-router-dom";
import SideMenu from "../utils/SideMenu";
import "./member.css";
const MemberInfo = () => {
  return (
    <div className="mypage-wrap">
      <div className="page-title">마이페이지</div>
      <section className="side-menu">
        <SideMenu />
      </section>
      <form>
        <table className="mypage-tbl">
          <tbody>
            <tr>
              <th>아이디</th>
              <td>
                <input type="text" readOnly></input>
              </td>
            </tr>
            <tr>
              <th>이름</th>
              <td>
                <input type="text" readOnly></input>
              </td>
            </tr>
            <tr>
              <th>전화번호</th>
              <td>
                <input type="text" readOnly></input>
              </td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>
                <input type="text" readOnly></input>
              </td>
            </tr>
            <tr>
              <th>주소</th>
              <td>
                <input type="text" readOnly></input>
              </td>
            </tr>
            <tr>
              <th>회원 등급</th>
              <td>
                <input type="text" readOnly></input>
              </td>
            </tr>
            <tr>
              <th>회원 가입일</th>
              <td>
                <input type="text" readOnly></input>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="secession-btn">
          <button type="button">
            <Link to="/">회원 탈퇴</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemberInfo;
