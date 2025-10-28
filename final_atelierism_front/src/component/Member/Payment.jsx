import { useEffect, useState } from "react";
import "./member.css";
import SideMenu from "../utils/SideMenu";
import { useRecoilValue } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import axios from "axios";

const Payment = () => {
  const memberId = useRecoilValue(loginIdState);
  const [payments, setPayments] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("거실"); // 기본 선택
  const [visibleCount, setVisibleCount] = useState(6); // 한 페이지에 보여줄 카드 수

  const menus = [
    { url: "/member/mypage", text: "마이페이지" },
    { url: "/member/update", text: "정보 수정" },
    { url: "/member/payment", text: "결제 내역" },
  ];

  const roomOptions = [
    { label: "거실", key: "interiorLiving" },
    { label: "주방", key: "interiorKitchen" },
    { label: "침실", key: "interiorBed" },
    { label: "원룸", key: "interiorOneroom" },
    { label: "아이방", key: "interiorKidroom" },
    { label: "서재", key: "interiorStudy" },
  ];

  useEffect(() => {
    if (!memberId) return;

    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/member/payments/${memberId}`)
      .then((res) => setPayments(res.data))
      .catch((err) => console.error(err));
  }, [memberId]);

  const selectedRoomKey = roomOptions.find(
    (room) => room.label === selectedRoom
  )?.key;

  const filteredPayments = payments.filter((item) => item[selectedRoomKey]);

  const visiblePayments = filteredPayments.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6); // 6개씩 추가
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
            <label>방 선택: </label>
            <select
              value={selectedRoom}
              onChange={(e) => {
                setSelectedRoom(e.target.value);
                setVisibleCount(6); // 방 변경 시 처음 6개만 보여주기
              }}
            >
              {roomOptions.map((room) => (
                <option key={room.key} value={room.label}>
                  {room.label}
                </option>
              ))}
            </select>
          </div>

          {visiblePayments.length > 0 ? (
            <>
              <div className="payment-list">
                {visiblePayments.map((item) => (
                  <div className="sb-content" key={item.interiorNo}>
                    <h3>{selectedRoom}</h3>
                    <div className="img">
                      <img
                        src="/image/default_img2.png"
                        alt={`${selectedRoom} 이미지`}
                      />
                    </div>
                    <div className="payment-info">
                      <p>디자이너 이름: {item.interiorDesigner}</p>
                      <p>인테리어 이유: {item.interiorWhy}</p>
                      <p>가격: {item.interiorPrice.toLocaleString()}원</p>
                      <p>디자이너 채팅: {item.designerChat}</p>
                      <p>결제일: {item.interiorPaymentDate}</p>
                    </div>
                  </div>
                ))}
              </div>

              {visibleCount < filteredPayments.length && (
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
              선택한 방의 인테리어 결제 내역이 없습니다.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Payment;
