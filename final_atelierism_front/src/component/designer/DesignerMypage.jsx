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
  const [designer, setDesigner] = useState(null);
  const backServer = import.meta.env.VITE_BACK_SERVER;
  const navigate = useNavigate();

  const [menus] = useState([
    { url: "/designer/mypage", text: "마이페이지" },
    { url: "/member/update", text: "정보 수정" },
    { url: "/designer/designerInfo", text: "디자이너 정보" },
    { url: "/designer/status", text: "작업 현황" },
  ]);

  const inputDesignerData = (e) => {
    const { name, value } = e.target;
    setDesigner((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setDesigner({
      designerId: designerId || "user01",
      designerName: "유저1",
      designerAge: 50,
      designerEmail: "user01@gmail.com",
      designerPhone: "010-1111-1111",
      designerAddr: "인천광역시 미추홀구",
      designerAddrDetail: "하하",
      designerGrade: "디자이너 회원",
      enrollDate: "2025-11-04",
    });
  }, [designerId]);

  const deleteDesigner = () => {
    Swal.fire({
      title: "회원 탈퇴",
      text: "정말 탈퇴하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "탈퇴하기",
      cancelButtonText: "취소",
      reverseButtons: true,
    }).then((res1) => {
      if (!res1.isConfirmed) return;

      Swal.fire({ title: "탈퇴 완료", icon: "info" }).then(() => {
        setDesignerId("");
        setMemberType(0);
        delete axios.defaults.headers.common["Authorization"];
        navigate("/");
      });
    });
  };

  return (
    <div className="de-mypage-wrap">
      <div className="de-page-title">마이페이지</div>

      <div className="de-mypage-content">
        <section className="de-side-menu">
          <SideMenu menus={menus} />
        </section>

        {designer && (
          <form className="de-mypage-form">
            <table className="de-mypage-tbl">
              <tbody>
                <tr>
                  <th>아이디</th>
                  <td>
                    <input
                      name="designerId"
                      type="text"
                      value={designer.designerId}
                      onChange={inputDesignerData}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <th>이름</th>
                  <td>
                    <input
                      name="designerName"
                      type="text"
                      value={designer.designerName}
                      onChange={inputDesignerData}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <th>나이</th>
                  <td>
                    <input
                      name="designerAge"
                      type="text"
                      value={designer.designerAge}
                      onChange={inputDesignerData}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <th>이메일</th>
                  <td>
                    <input
                      name="designerEmail"
                      type="text"
                      value={designer.designerEmail}
                      onChange={inputDesignerData}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <th>전화번호</th>
                  <td>
                    <input
                      name="designerPhone"
                      type="text"
                      value={designer.designerPhone}
                      onChange={inputDesignerData}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <th>주소</th>
                  <td>
                    <input
                      name="designerAddr"
                      type="text"
                      value={designer.designerAddr}
                      onChange={inputDesignerData}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <th>상세 주소</th>
                  <td>
                    <input
                      name="designerAddrDetail"
                      type="text"
                      value={designer.designerAddrDetail}
                      onChange={inputDesignerData}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <th>회원 등급</th>
                  <td>
                    <input
                      name="designerGrade"
                      type="text"
                      value={designer.designerGrade}
                      onChange={inputDesignerData}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <th>회원 가입일</th>
                  <td>
                    <input
                      name="enrollDate"
                      type="text"
                      value={designer.enrollDate}
                      onChange={inputDesignerData}
                      readOnly
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="de-secession-btn">
              <button type="button" onClick={deleteDesigner}>
                회원 탈퇴
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default DesignerMypage;
