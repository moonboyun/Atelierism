import { Link, useNavigate } from "react-router-dom";
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
  const [memberNewPwRe, setmemberNewPwRe] = useState("");
  const [isAuth, setIsAuth] = useState(false); //현재 비밀번호 입력용
  const [menus, setMenus] = useState([
    //SideMenu에 전송할 state
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
  const backServer = import.meta.env.VITE_BACK_SERVER;
  useEffect(() => {
    //문제의 useEffect
    if (memberId) {
      axios.get(`${backServer}/member/${memberId}`).then((res) => {
        setMember(res.data);
      });
    }
  }, [memberId]);
  const navigate = useNavigate();
  const update = () => {
    axios
      .patch(`${backServer}/member`, member)
      .then((res) => {
        if (res.data === 1) {
          Swal.fire({
            title: "정보 수정 완료",
            icon: "success",
          });
        }
        navigate("/member/mypage");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkPw = () => {
    axios.post(`${backServer}/member/check-pw`, member).then((res) => {
      if (res.data === 1) {
        setIsAuth({ ...member, memberPw: "" });
      }
    });
  };
  const inputPw = (e) => {
    const newMember = { ...member, memberPw: e.target.value };
    setMember(newMember);
  };
  const inputPwRe = (e) => {
    setmemberNewPwRe(e.target.value);
  };
  return (
    <div className="update-wrap">
      <div className="page-title">회원정보 수정</div>
      <section className="side-menu">
        <SideMenu menus={menus} />
      </section>
      {member !== null && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            update();
          }}
        >
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
                    onChange={checkPw}
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
                    onChange={inputPw}
                  ></input>
                </td>
              </tr>
              <tr>
                <th>새 비밀번호 확인</th>
                <td>
                  <input
                    type="password"
                    name="memberNewPwRe"
                    onChange={inputPwRe}
                  ></input>
                </td>
              </tr>
              <tr>
                <th>전화번호</th>
                <td>
                  <input
                    type="text"
                    name="memberPhone"
                    onChange={inputMemberData}
                    value={member.memberPhone}
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
                <td className="update-addr">
                  <input
                    type="text"
                    name="memberAddr"
                    value={member.memberAddr}
                    onChange={inputMemberData}
                  ></input>
                  <button className="button">우편번호 조회</button>
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
            <button type="button">
              <Link to="/member/mypage">수정하기</Link>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MemberUpdate;
