import { ChevronRight } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import "./SideMenu.css";

const SideMenu = (props) => {
  const menus = props.menus;
  //추후 각자 마이페이지에서 메뉴라는 변수를 만들고
  //주석 풀어서 사용하세요 아래 맵 처리까지 끝나있습니다.
  //메뉴 변수 안에 url이랑 메뉴 이름이 있어야합니다.
  return (
    <div className="side-menu">
      <div className="image-box">
        <img src="/image/default_image.png" width={"165px"} height={"165px"} />
        <div className="text-box">
          <span>user01님</span>
          <NavLink>프로필 수정</NavLink>
        </div>
      </div>
      <ul className="menu-list">
        {menus.map((menu, i) => {
          return (
            <li key={"side-menu" + i}>
              <NavLink
                to={menu.url}
                className={({ isClick }) => (isClick ? "click" : "")}
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
