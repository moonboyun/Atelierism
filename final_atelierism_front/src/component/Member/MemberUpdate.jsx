import { Link } from "react-router-dom";
import "./member.css";
import SideMenu from "../utils/SideMenu";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginIdState, memberTypeState } from "../utils/RecoilData";
import axios from "axios";
import Swal from "sweetalert2";
const MemberUpdate = () => {
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const [memberType, setMemberType] = useRecoilState(memberTypeState);
  const [member, setMember] = useState(null);
  const [menus, setMenus] = useState([
    { url: "/member/mypage", text: "마이페이지" },
    { url: "/member/update", text: "정보 수정" },
    { url: "/member/payment", text: "결제 내역" },
  ]);
  const inputMemberData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newMember = { ...member, [name]: value };
    setMember(newMember);
  };
  useEffect(() => {
    if (memberId) {
      axios
        .get(`${import.meta.env.VITE_BACK_SERVER}/member/${memberId}`)
        .then((res) => {
          setMember(res.data);
        });
    }
  });
  const update = () => {
    axios
      .patch(`${import.meta.env.VITE_BACK_SERVER}/member/update`, member)
      .then((res) => {
        if (res.data === 1) {
          Swal.fire({
            title: "정보 수정 완료",
            icon: "success",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="update-wrap">
      <div className="page-title">회원정보 수정</div>
      <section className="side-menu">
        <SideMenu menus={menus} />
      </section>
      {member !== null && (
        <form>
          <table className="update-tbl">
            <tbody>
              <tr>
                <th>아이디</th>
                <td>
                  <input
                    type="text"
                    name="memberId"
                    value={memberId}
                    readOnly
                  ></input>
                </td>
              </tr>
              <tr>
                <th>기존 비밀번호</th>
                <td>
                  <input
                    type="password"
                    name="memberPw"
                    value={member.memberPw}
                    onChange={inputMemberData}
                  ></input>
                </td>
              </tr>
              <tr>
                <th>새 비밀번호</th>
                <td>
                  <input
                    type="password"
                    name="memberNewPw"
                    value={member.memberPw}
                    onChange={inputMemberData}
                  ></input>
                </td>
              </tr>
              <tr>
                <th>새 비밀번호 확인</th>
                <td>
                  <input
                    type="password"
                    name="memberNewPwRe"
                    value={member.memberPw}
                    onChange={inputMemberData}
                  ></input>
                </td>
              </tr>
              <tr>
                <th>전화번호</th>
                <td>
                  <input
                    type="text"
                    name="memberPhone"
                    value={member.memberPhone}
                    onChange={inputMemberData}
                  ></input>
                </td>
              </tr>
              <tr>
                <th>이메일</th>
                <td>
                  <input
                    type="text"
                    name="memberEmail"
                    value={member.memberEmail}
                    onChange={inputMemberData}
                  ></input>
                </td>
              </tr>
              <tr>
                <th>주소</th>
                <td>
                  <input
                    type="text"
                    name="memberAddr"
                    value={member.memberAddr}
                    onChange={inputMemberData}
                  ></input>
                </td>
              </tr>
              <tr>
                <th>상세 주소</th>
                <td>
                  <input
                    type="text"
                    name="memberAddrDetail"
                    value={member.memberAddrDetail}
                    onChange={inputMemberData}
                  ></input>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="update-btn">
            <button type="button">
              <Link to="/member/mypage">취소하기</Link>
            </button>
            <button type="button" onClick={update}>
              <Link to="/member/mypage">수정하기</Link>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MemberUpdate;
