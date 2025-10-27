import { useEffect, useState } from "react";
import "./member.css";
import SideMenu from "../utils/SideMenu";
import { useRecoilValue } from "recoil";
import { isInteriorState } from "../utils/RecoilData";
import axios from "axios";

const Payment = () => {
  const isInterior = useRecoilValue(isInteriorState); // true/false
  const [member, setMember] = useState({ memberId: "" }); // 로그인 시 세팅
  const [payments, setPayments] = useState([]); // 결제 데이터

  const menus = [
    { url: "/member/mypage", text: "마이페이지" },
    { url: "/member/update", text: "정보 수정" },
    { url: "/member/payment", text: "결제 내역" },
  ];

  useEffect(() => {
    if (!member.memberId) return; // memberId가 없으면 호출하지 않음

    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/interior/payments`, {
        params: { memberId: member.memberId },
      })
      .then((res) => setPayments(res.data))
      .catch((err) => console.error(err));
  }, [member.memberId]);

  return (
    <section className="payment-wrap">
      <div className="page-title">결제 내역</div>
      <div className="payment-content-wrap">
        <section className="side-menu">
          <SideMenu menus={menus} />
        </section>
        {isInterior && payments.length > 0 ? (
          <div className="payment-list">
            {payments.map((item) => (
              <div className="content" key={item.id}>
                <div className="img">
                  <img src="/image/default_img2.png" alt="인테리어 이미지" />
                </div>
                <div className="payment-info">
                  <p>디자이너 이름: {item.designer}</p>
                  <p>인테리어 이유: {item.reason}</p>
                  <p>가격: {item.price.toLocaleString()}원</p>
                  <p>결제일: {item.date}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>인테리어 결제 내역이 없습니다.</p>
        )}
      </div>
    </section>
  );
};

export default Payment;
