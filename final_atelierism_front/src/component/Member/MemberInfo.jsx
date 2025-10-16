import { Link } from "react-router-dom";
import SideMenu from "../utils/SideMenu";
import "./member.css";
import { useRecoilState } from "recoil";
import { loginIdState, memberTypeState } from "../utils/RecoilData";
import { useState } from "react";
import axios from "axios";
const MemberInfo = () => {
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const [memberType, setMemberType] = useRecoilState(memberTypeState);
  const [member, setMember] = useState(null);
  const inputMemberData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newMember = { ...member, [name]: value };
    setMember(newMember);
  };
  const backServer = import.meta.env.VITE_BACK_SERVER;
  axios
    .get(`${backServer}/member/${memberId}`)
    .then((res) => {
      setMember(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  return (
    <div className="mypage-wrap">
      <div className="page-title">마이페이지</div>
      <section className="side-menu">
        <SideMenu />
      </section>
      {member !== null && (
        <form>
          <table className="mypage-tbl">
            <tbody>
              <tr>
                <th>아이디</th>
                <td>
                  <input
                    type="text"
                    value={member.memberId}
                    onChange={inputMemberData}
                    readOnly
                  ></input>
                </td>
              </tr>
              <tr>
                <th>이름</th>
                <td>
                  <input
                    type="text"
                    value={member.memberName}
                    onChange={inputMemberData}
                    readOnly
                  ></input>
                </td>
              </tr>
              <tr>
                <th>전화번호</th>
                <td>
                  <input
                    type="text"
                    value={member.memberPhone}
                    onChange={inputMemberData}
                    readOnly
                  ></input>
                </td>
              </tr>
              <tr>
                <th>이메일</th>
                <td>
                  <input
                    type="text"
                    value={member.memberEmail}
                    onChange={inputMemberData}
                    readOnly
                  ></input>
                </td>
              </tr>
              <tr>
                <th>주소</th>
                <td>
                  <input
                    type="text"
                    value={member.memberAddr}
                    onChange={inputMemberData}
                    readOnly
                  ></input>
                </td>
              </tr>
              <tr>
                <th>상세 주소</th>
                <td>
                  <input
                    type="text"
                    value={member.memberAddrDetail}
                    onChange={inputMemberData}
                    readOnly
                  ></input>
                </td>
              </tr>
              <tr>
                <th>회원 등급</th>
                <td>
                  <input
                    type="text"
                    value={member.memberType}
                    onChange={inputMemberData}
                    readOnly
                  ></input>
                </td>
              </tr>
              <tr>
                <th>회원 가입일</th>
                <td>
                  <input
                    type="text"
                    value={member.enrollDate}
                    onChange={inputMemberData}
                    readOnly
                  ></input>
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
      )}
    </div>
  );
};

export default MemberInfo;
