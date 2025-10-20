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
  const [memberPw, setMemberPw] = useState("");
  const [memberNewPw, setMemberNewPw] = useState("");
  const [memberNewPwRe, setmemberNewPwRe] = useState("");
  const [isAuth, setIsAuth] = useState(false); //현재 비밀번호 입력용
  //const [authChecked, setAuthChecked] = useState(false); //기존 비밀번호가 제대로 입력됐는지 체크
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
    const updatedMember = {
      ...member,
    };
    if (memberNewPw.trim() !== "") {
      updatedMember.memberPw = memberNewPw;
    }
    axios
      .patch(`${backServer}/member`, updatedMember)
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
    console.log(memberPw);
    axios
      .post(`${backServer}/member/checkPw`, member)
      .then((res) => {
        console.log(res);
        if (res.data === 1) {
          Swal.fire({
            title: "비밀번호 인증 성공",
            icon: "success",
          });
          setIsAuth(true);
        }
      })
      .catch((err) => {
        if (memberPw === "") {
          Swal.fire({
            title: "기존 비밀번호를 입력해주세요",
            icon: "warning",
          });
        } else if (!memberPw) {
          Swal.fire({
            title: "잘못된 비밀번호 입니다.",
            icon: "warning",
          });
        }
        setIsAuth(false);
      });
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
              <tr className="sb-check-pw">
                <th>기존 비밀번호</th>
                <td>
                  <input
                    type="password"
                    name="memberPw"
                    value={memberPw}
                    onChange={(e) => {
                      setMemberPw(e.target.value);
                    }}
                  ></input>
                  <button type="button" onClick={checkPw}>
                    인증하기
                  </button>
                </td>
              </tr>
              <tr>
                <th>새 비밀번호</th>
                <td>
                  <input
                    type="password"
                    name="memberNewPw"
                    value={memberNewPw}
                    onChange={(e) => setMemberNewPw(e.target.value)}
                  ></input>
                </td>
              </tr>
              <tr>
                <th>새 비밀번호 확인</th>
                <td>
                  <input
                    type="password"
                    name="memberNewPwRe"
                    value={memberNewPwRe}
                    onChange={(e) => setmemberNewPwRe(e.target.value)}
                  ></input>
                  {memberNewPw === "" ? (
                    ""
                  ) : memberNewPw === memberNewPwRe ? (
                    <div className="success" style={{ color: "blue" }}>
                      새 비밀번호가 일치합니다.
                    </div>
                  ) : (
                    <div className="error-message" style={{ color: "red" }}>
                      새 비밀번호가 일치하지 않습니다
                    </div>
                  )}
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
            <button type="submit">수정하기</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MemberUpdate;
