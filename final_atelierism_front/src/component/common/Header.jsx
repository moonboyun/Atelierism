import { Link } from "react-router-dom";
import { useState } from "react";
import "./common.css";

const Header = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);

  return (
    <header className="header" onMouseLeave={() => setShowSubMenu(false)}>
      <div className="header-inner">
        <div className="logo">
          <Link to="/">Atelierism</Link>
        </div>

        <nav className="nav">
          <ul>
            <li onMouseEnter={() => setShowSubMenu(true)}>
              <Link to="#">회사소개</Link>
            </li>
            <li>
              <Link to="#">작품보기</Link>
            </li>
            <li>
              <Link to="#">고객후기</Link>
            </li>
            <li>
              <Link to="#">서비스 안내</Link>
            </li>
            <HeaderLink />
          </ul>
        </nav>
      </div>

      {showSubMenu && (
        <div className="sub-menu">
          <ul>
            <li>
              <Link to="#">소개글</Link>
            </li>
            <li>
              <Link to="/designer/intro">디자이너 소개</Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
const HeaderLink = () => {
  return (
    <ul className="user-menu">
      <li>
        <Link to="/member/login">로그인</Link>
      </li>
      <li>
        <Link to="/member/join">회원가입</Link>
      </li>
      <li className="interior-btn">
        <Link to="#">인테리어 컨설팅</Link>
      </li>
    </ul>
  );
};

export default Header;
