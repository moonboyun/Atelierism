import { Link, useNavigate } from "react-router-dom";
import SideMenu from "../utils/SideMenu";
import "./member.css";
import { useRecoilState } from "recoil";
import { loginIdState, memberTypeState } from "../utils/RecoilData";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const MemberInfo = () => {
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const [memberType, setMemberType] = useRecoilState(memberTypeState);
  const [member, setMember] = useState(null);
  //const [authReady, setAuthReady] = useRecoilState(authReadyState);
  const inputMemberData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newMember = { ...member, [name]: value };
    setMember(newMember);
  };
  const backServer = import.meta.env.VITE_BACK_SERVER;
  /*useEffect(() => {
    if (!authReady) {
      return;
    }
  }, [authReady]);*/
  useEffect(() => {
    axios
      .get(`${backServer}/member/${memberId}`)
      .then((res) => {
        console.log(res);
        setMember(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [menus, setMenus] = useState([
    { url: "/member/mypage", text: "마이페이지" },
    { url: "/member/update", text: "정보 수정" },
    { url: "/member/payment", text: "결제 내역" },
  ]);
  const navigate = useNavigate();
  const deleteMember = () => {
    Swal.fire({
      title: "회원 탈퇴",
      text: "탈퇴하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "탈퇴하기",
      cancelButtonText: "취소",
    }).then((res1) => {
      if (res1.isConfirmed) {
        axios
          .delete(`${backServer}/member/${member.memberId}`)
          .then((res2) => {
            if (res2.data === 1) {
              Swal.fire({
                title: "회원 탈퇴 완료",
                text: "회원이 탈퇴되었습니다.",
                icon: "info",
              }).then(() => {
                setMemberId("");
                setMemberType(0);
                delete axios.defaults.headers.common["Authorization"];
                navigate("/");
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  return (
    <div className="mypage-wrap">
      <div className="page-title">마이페이지</div>
      <section className="side-menu">
        <SideMenu menus={menus} />
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
                    value={
                      member.memberType === 1
                        ? "관리자"
                        : member.memberType === 2
                        ? "디자이너"
                        : "일반회원"
                    }
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
            <button type="button" onClick={deleteMember}>
              회원 탈퇴
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MemberInfo;
