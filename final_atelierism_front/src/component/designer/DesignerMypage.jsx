import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideMenu from "../utils/SideMenu";
import { useRecoilState } from "recoil";
import { loginIdState, memberTypeState } from "../utils/RecoilData";
import axios from "axios";
import Swal from "sweetalert2";
import "./designer.css";

const DesignerMypage = () => {
  const [designerId, setDesignerId] = useRecoilState(loginIdState);
  const [, setMemberType] = useRecoilState(memberTypeState);

  const [member, setMember] = useState(null);
  const backServer = import.meta.env.VITE_BACK_SERVER;
  const navigate = useNavigate();

  const [menus] = useState([
    { url: "/designer/mypage", text: "마이페이지" },
    { url: "/member/update", text: "정보 수정" },
    { url: "/designer/designerInfo", text: "디자이너 정보" },
    { url: "/designer/status", text: "작업 현황" },
  ]);

  useEffect(() => {
    if (designerId) {
      axios
        .get(`${backServer}/member/${designerId}`)
        .then((res) => {
          setMember(res.data);
        })
        .catch((err) => {
          console.error("회원 정보 로딩 실패:", err);
        });
    }
  }, [designerId]);

  const deleteMember = () => {
    Swal.fire({
      title: "회원 탈퇴",
      text: "정말 탈퇴하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "탈퇴하기",
      cancelButtonText: "취소",
    }).then((res1) => {
      if (!res1.isConfirmed) return;
      axios.delete(`${backServer}/member/${member.memberId}`).then((res2) => {
        if (res2.data === 1) {
          Swal.fire({ title: "탈퇴 완료", icon: "info" }).then(() => {
            setDesignerId("");
            setMemberType(0);
            delete axios.defaults.headers.common["Authorization"];
            window.localStorage.removeItem("refreshToken");
            navigate("/");
          });
        }
      });
    });
  };

  if (member === null) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="de-mypage-wrap">
      <div className="de-page-title">마이페이지</div>

      <div className="de-mypage-content">
        <section className="de-side-menu">
          <SideMenu menus={menus} />
        </section>

        <form className="de-mypage-form">
          <table className="de-mypage-tbl">
            <tbody>
              <tr>
                <th>아이디</th>
                <td>
                  <input type="text" value={member.memberId} readOnly />
                </td>
              </tr>
              <tr>
                <th>이름</th>
                <td>
                  <input type="text" value={member.memberName} readOnly />
                </td>
              </tr>
              <tr>
                <th>이메일</th>
                <td>
                  <input type="text" value={member.memberEmail} readOnly />
                </td>
              </tr>
              <tr>
                <th>전화번호</th>
                <td>
                  <input type="text" value={member.memberPhone} readOnly />
                </td>
              </tr>
              <tr>
                <th>주소</th>
                <td>
                  <input type="text" value={member.memberAddr} readOnly />
                </td>
              </tr>
              <tr>
                <th>상세 주소</th>
                <td>
                  <input type="text" value={member.memberAddrDetail} readOnly />
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
                    readOnly
                  />
                </td>
              </tr>
              <tr>
                <th>회원 가입일</th>
                <td>
                  <input type="text" value={member.enrollDate} readOnly />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="de-secession-btn">
            <button type="button" onClick={deleteMember}>
              회원 탈퇴
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DesignerMypage;
