import { ChevronRight } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import "./SideMenu.css";
import { loginIdState, memberTypeState } from "./RecoilData";
import { useRecoilState } from "recoil";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const SideMenu = (props) => {
  const menus = props.menus;
  const [memberId] = useRecoilState(loginIdState);
  const [memberType] = useRecoilState(memberTypeState);
  const [member, setMember] = useState(null);
  const fileInputRef = useRef(null); // 파일 업로드 input 참조

  // 회원 정보 불러오기
  useEffect(() => {
    if (!memberId) return;
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/member/${memberId}`)
      .then((res) => setMember(res.data))
      .catch((err) => console.error("회원 정보 불러오기 실패:", err));
  }, [memberId]);

  // 프로필 수정 버튼 클릭 → 파일 선택창 열기
  const handleProfileClick = () => {
    fileInputRef.current.click();
  };

  // 파일 선택 시 서버로 업로드
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACK_SERVER}/member/profile/${memberId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("프로필 사진이 변경되었습니다!");
      setMember((prev) => ({
        ...prev,
        memberThumb: res.data.memberThumb, // 새 이미지 반영
      }));
    } catch (err) {
      console.error("프로필 업로드 실패:", err);
      alert("프로필 업로드에 실패했습니다.");
    }
  };

  return (
    <div className="side-menu">
      <div className="image-box">
        <img
          src={
            member?.memberThumb
              ? `${import.meta.env.VITE_BACK_SERVER}/memberProfile/${
                  member.memberThumb
                }`
              : `${
                  import.meta.env.VITE_BACK_SERVER
                }/memberProfile/default_image.png`
          }
          width={"165px"}
          height={"165px"}
          style={{ borderRadius: "50%", objectFit: "cover" }}
        />
        <div className="text-box">
          <span>{member ? `${member.memberName}님` : `${memberId}님`}</span>

          {(memberType === 2 || memberType === 3) && (
            <>
              <button
                type="button"
                onClick={handleProfileClick}
                className="profile-edit-btn"
                style={{
                  border: "none",
                  fontSize: "18px",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                }}
              >
                프로필 수정
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </>
          )}
        </div>
      </div>

      <ul className="menu-list">
        {menus.map((menu, i) => (
          <li key={"side-menu" + i}>
            <NavLink
              to={menu.url}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <span>{menu.text}</span>
              <ChevronRight />
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
