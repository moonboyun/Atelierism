import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./common.css";
import { useRecoilState } from "recoil";
import { loginIdState, memberTypeState } from "../utils/RecoilData";
import InteriorApplication from "../interior/InteriorApplication";
import Swal from "sweetalert2";
import axios from "axios";

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
  const [isInterior, setIsInterior] = useState(0);
  const navigate = useNavigate();
  const logout = () => {
    setMemberId("");
    setMemberType(0);
    setIsInterior(0);
    delete axios.defaults.headers.common["Authorization"];
    window.localStorage.removeItem("refreshToken");
    navigate("/");
  };
  const [interiorModal, setInteriorModal] = useState(false);
  const [ani, setAni] = useState(false);
  const InteriorApp = () => {
    if (memberId == "") {
      Swal.fire({
        title: "로그인 확인",
        text: "로그인 후 이용 가능합니다.",
        icon: "info",
        reverseButtons: true,
        showCancelButton: true,
        cancelButtonText: "닫기",
        confirmButtonText: "로그인하러 가기",
      }).then((select) => {
        if (select.isConfirmed) {
          navigate("/member/login");
        }
      });
    } else {
      setInteriorModal(true);
    }
  };
  useEffect(() => {
    if (memberId !== "") {
      axios
        .get(`${import.meta.env.VITE_BACK_SERVER}/interior/${memberId}`)
        .then((res) => {
          setIsInterior(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [memberId]);
  const payPage = () => {
    navigate("/interior/payPage");
  };
  return (
    <ul className="user-menu">
      {memberId !== "" && memberType !== 0 ? (
        <>
          <li>
            {memberType == 1 ? (
              <Link to="/admin/mypage">마이페이지</Link>
            ) : memberType == 2 ? (
              <Link to="/designer/mypage">마이페이지</Link>
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
      {isInterior === 0 ? (
        <button className="interior-btn" onClick={InteriorApp}>
          <span>인테리어 컨설팅</span>
        </button>
      ) : (
        <button className="interior-btn" onClick={payPage}>
          <div className="interior-btn-box">
            <span>장바구니</span>
            <span className="material-symbols-outlined header-shopping-cart">
              shopping_cart
            </span>
          </div>
        </button>
      )}
      {interiorModal && (
        <InteriorApplication
          onClose={() => {
            setInteriorModal(false);
            setAni(false);
          }}
          ani={ani}
          setAni={setAni}
          setIsInterior={setIsInterior}
        />
      )}
    </ul>
  );
};

export default Header;
