import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./common.css";
import { useRecoilState } from "recoil";
import { loginIdState, memberTypeState } from "../utils/RecoilData";
import InteriorApplication from "../interior/InteriorApplication";

const Header = (props) => {
  const isLogin = props.isLogin;
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
              <Link to="/board/review">고객후기</Link>
            </li>
            <li>
              <Link to="/board/inquiry">서비스 안내</Link>
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
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const [memberType, setMemberType] = useRecoilState(memberTypeState);
  const navigate = useNavigate();
  const logout = () => {
    setMemberId("");
    setMemberType(0);
    navigate("/");
  };
  const [interiorModal, setInteriorModal] = useState(false);
  return (
    <ul className="user-menu">
      {memberId !== "" && memberType !== 0 ? (
        <>
          <li>
            {memberType == 1 ? (
              <Link to="/admin/mypage">마이페이지</Link>
            ) : (
              <Link to="/member/mypage">마이페이지</Link>
            )}
          </li>
          <li>
            <Link to="/" onClick={logout}>
              로그아웃
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/member/login">로그인</Link>
          </li>
          <li>
            <Link to="/member/agree">회원가입</Link>
          </li>
        </>
      )}
      <button className="interior-btn" onClick={() => setInteriorModal(true)}>
        <span>인테리어 컨설팅</span>
      </button>
      {interiorModal && (
        <InteriorApplication onClose={() => setInteriorModal(false)} />
      )}
    </ul>
  );
};

export default Header;
