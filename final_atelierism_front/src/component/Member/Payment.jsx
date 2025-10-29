import { useEffect, useState } from "react";
import "./member.css";
import SideMenu from "../utils/SideMenu";
import { useRecoilValue } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import axios from "axios";

const Payment = () => {
  const memberId = useRecoilValue(loginIdState);
  const [payments, setPayments] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6); // 한 번에 보여줄 카드 수
  const [sortOrder, setSortOrder] = useState("desc"); // 최신순 기본

  const menus = [
    { url: "/member/mypage", text: "마이페이지" },
    { url: "/member/update", text: "정보 수정" },
    { url: "/member/payment", text: "결제 내역" },
  ];

  // 결제 내역 불러오기
  useEffect(() => {
    if (!memberId) return;

    axios
      .get(
        `${
          import.meta.env.VITE_BACK_SERVER
        }/member/payments/${memberId}?sort=${sortOrder}`
      )
      .then((res) => setPayments(res.data))
      .catch((err) => console.error(err));
  }, [memberId, sortOrder]);

  // 최신순/오래된순에 따라 slice 처리
  const visiblePayments =
    sortOrder === "desc"
      ? payments.slice(0, visibleCount) // 최신순: 앞에서부터
      : payments.slice(-visibleCount); // 오래된순: 뒤에서부터

  // 오래된순이면 화면 상단부터 나오도록 reverse
  const displayPayments =
    sortOrder === "asc" ? [...visiblePayments].reverse() : visiblePayments;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <section className="payment-wrap">
      <div className="page-title">결제 내역</div>
      <div className="payment-content-wrap">
        <section className="side-menu">
          <SideMenu menus={menus} />
        </section>

        <div className="sb-main-content">
          <div className="room-select" style={{ marginLeft: "10px" }}>
            <label>정렬 기준: </label>
            <select
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                setVisibleCount(6); // 정렬 변경 시 처음 6개만 보여주기
              }}
            >
              <option value="desc">최신순</option>
              <option value="asc">오래된 순</option>
            </select>
          </div>

          {displayPayments.length > 0 ? (
            <>
              <div className="payment-list">
                {displayPayments.map((item) => (
                  <div className="sb-content" key={item.interiorNo}>
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: "18px",
                        marginTop: "20px",
                        marginBottom: "20px",
                      }}
                    >
                      결제일: {item.interiorPaymentDate}
                    </p>
                    <div className="img">
                      <img src="/image/default_img2.png" alt="결제 이미지" />
                    </div>
                    <div className="payment-info">
                      <p>디자이너 이름: {item.interiorDesigner}</p>
                      <p>인테리어 이유: {item.interiorWhy}</p>
                      <p>가격: {item.interiorPrice.toLocaleString()}원</p>
                      <p>디자이너 채팅: {item.designerChat}</p>
                    </div>
                  </div>
                ))}
              </div>

              {visibleCount < payments.length && (
                <div className="load-more-wrap">
                  <button className="load-more" onClick={handleLoadMore}>
                    더보기
                  </button>
                </div>
              )}
            </>
          ) : (
            <p
              style={{ textAlign: "center", marginTop: "20px", width: "900px" }}
            >
              결제 내역이 없습니다.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Payment;
