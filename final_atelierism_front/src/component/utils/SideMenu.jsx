import { ChevronRight } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import "./SideMenu.css";
import { loginIdState, memberTypeState } from "./RecoilData";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";

const SideMenu = (props) => {
  const menus = props.menus;
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const [memberType, setMemberType] = useRecoilState(memberTypeState);
  const [member, setMember] = useState(null);
  //추후 각자 마이페이지에서 메뉴라는 변수를 만들고
  //주석 풀어서 사용하세요 아래 맵 처리까지 끝나있습니다.
  //메뉴 변수 안에 url이랑 메뉴 이름이 있어야합니다.

  useEffect(() => {
    if (!memberId) return;
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/member/${memberId}`)
      .then((res) => setMember(res.data))
      .catch((err) => console.error("회원 정보 불러오기 실패:", err));
  }, [memberId]);
  return (
    <div className="side-menu">
      <div className="image-box">
        <img src="/image/default_image.png" width={"165px"} height={"165px"} />
        <div className="text-box">
          <span>
            {
              member ? `${member.memberName}님` : `${memberId}님`
              /*유저 이름이 있으면 이름으로 사용하고 아니면 아이디로 사용*/
            }
          </span>
          {(memberType === 2 || memberType === 3) && (
            <NavLink>프로필 수정</NavLink>
          )}
        </div>
      </div>
      <ul className="menu-list">
        {menus.map((menu, i) => {
          return (
            <li key={"side-menu" + i}>
              <NavLink
                to={menu.url}
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                <span>{menu.text}</span>
                <ChevronRight />
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideMenu;
