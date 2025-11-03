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
      .get(`${import.meta.env.VITE_BACK_SERVER}/member/payments/${memberId}`)
      .then((res) => {
        //  프론트에서 정렬 처리
        const sorted = [...res.data].sort((a, b) => {
          const dateA = new Date(a.interiorPaymentDate);
          const dateB = new Date(b.interiorPaymentDate);
          return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
        });
        setPayments(sorted);
      })
      .catch((err) => console.error(err));
  }, [memberId, sortOrder]); // sortOrder 변경 시에도 다시 정렬

  // 화면에 보여줄 개수만큼 자르기
  const visiblePayments = payments.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <section className="payment-wrap">
      <div className="page-title" style={{ fontSize: "22px" }}>
        결제 내역
      </div>
      <div className="payment-content-wrap">
        <section className="side-menu">
          <SideMenu menus={menus} />
        </section>

        <div className="sb-main-content">
          <div className="room-select" style={{ marginLeft: "10px" }}>
            <label style={{ fontSize: "18px", fontWeight: "bold" }}>
              정렬 기준:{" "}
            </label>
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

          {payments.length > 0 ? (
            <>
              <div className="payment-list">
                {visiblePayments.map((item) => {
                  // 인테리어 공간 표시 로직 추가
                  const roomNames = [];
                  if (item.interiorLiving) roomNames.push("거실");
                  if (item.interiorKitchen) roomNames.push("주방");
                  if (item.interiorBed) roomNames.push("침실");
                  if (item.interiorOneroom) roomNames.push("원룸");
                  if (item.interiorKidroom) roomNames.push("아이방");
                  if (item.interiorStudy) roomNames.push("서재");

                  return (
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
                        <img
                          src="/image/pay-img.png"
                          alt="결제 이미지"
                          style={{ borderRadius: "8px" }}
                        />
                      </div>
                      <div
                        className="payment-info"
                        style={{ width: "100%", paddingBottom: "10px" }}
                      >
                        <p>디자이너 이름: {item.interiorDesignerName}</p>
                        <p>인테리어 이유: {item.interiorWhy}</p>
                        <p>가격: {item.interiorPrice.toLocaleString()}원</p>
                        <p>디자이너 채팅: {item.designerChat}</p>
                        <div>
                          <p style={{ fontWeight: "600", fontSize: "17px" }}>
                            인테리어 공간:{" "}
                            {roomNames.length > 0
                              ? roomNames.join(", ")
                              : "없음"}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
