//import SideMenu from "./utils/SideMenu.jsx";
import { useState } from "react";
import "./member.css";
import SideMenu from "../utils/SideMenu";
const Payment = () => {
  const [menus, setMenus] = useState([
    { url: "/member/mypage", text: "마이페이지" },
    { url: "/member/update", text: "정보 수정" },
    { url: "/member/payment", text: "결제 내역" },
  ]);
  return (
    <section className="payment-wrap">
      <div className="page-title">결제 내역</div>
      <div className="payment-content-wrap">
        <section className="side-menu">
          <SideMenu menus={menus} />
        </section>
        <div className="content">
          <div className="img">
            <img src="/image/default_img2.png" />
          </div>
          <div className="payment-info">
            <p>거실 인테리어</p>
            <p>가격 : </p>
            <p>디자이너 이름 : </p>
            <p>인테리어 이유 : </p>
            <p>프로필 링크 : </p>
            <p>결제일 : </p>
          </div>
        </div>
        <div className="content">
          <div className="img">
            <img src="/image/default_img2.png" />
          </div>
          <div className="payment-info">
            <p>거실 인테리어</p>
            <p>가격 : </p>
            <p>디자이너 이름 : </p>
            <p>인테리어 이유 : </p>
            <p>프로필 링크 : </p>
            <p>결제일 : </p>
          </div>
        </div>
        <div className="content">
          <div className="img">
            <img src="/image/default_img2.png" />
          </div>
          <div className="payment-info">
            <p>거실 인테리어</p>
            <p>가격 : </p>
            <p>디자이너 이름 : </p>
            <p>인테리어 이유 : </p>
            <p>프로필 링크 : </p>
            <p>결제일 : </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
