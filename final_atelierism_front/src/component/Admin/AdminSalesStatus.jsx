import { useState } from "react";
import "./AdminModal.css";
import SideMenu from "../utils/SideMenu";
import AdminChart from "./AdminChart";

const AdminSalesStatus = () => {
  const [priceModal, setPriceModal] = useState(false);
  const priceUpdate = () => {
    setPriceModal(true);
  };
  const [order, setOrder] = useState(1);
  const [priceList, setPriceList] = useState({});
  return (
    <div className="admin-sales-status-allwrap">
      <div className="admin-sales-status-wrap">
        <section className="admin-sales-status-content">
          <div className="admin-sales-status-content-top">
            <div className="sales-chart">
              <h2>매출 그래프</h2>
              <div className="chart-zone">
                <AdminChart />
              </div>
              <div className="sales-btn-zone">
                <button type="button" id="month-3">
                  3개월
                </button>
                <button type="button" id="month-6">
                  6개월
                </button>
                <button type="button" id="year-by-year" className="inclick">
                  년단위
                </button>
              </div>
            </div>
            <div className="site-total">
              <h2>사이트 토탈</h2>
              <div className="total-table">
                <table border={1}>
                  <tbody>
                    <tr>
                      <th>이달의 총 매출</th>
                      <td>1235412원</td>
                    </tr>
                    <tr>
                      <th>이달의 가입자</th>
                      <td>000명</td>
                    </tr>
                    <tr>
                      <th>순매출</th>
                      <td>1235412원</td>
                    </tr>
                    <tr>
                      <th>디자이너 매출</th>
                      <td>1235412원</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="admin-sales-status-content-bottom">
            <div className="space-sales">
              <h2>이달의 공간별 매출</h2>
              <div className="space-sales-table">
                <table border={1}>
                  <thead>
                    <tr>
                      <th>공간명</th>
                      <th>월매출</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>원룸</td>
                      <td>0000000000원</td>
                    </tr>
                    <tr>
                      <td>거실</td>
                      <td>0000000000원</td>
                    </tr>
                    <tr>
                      <td>부엌</td>
                      <td>0000000000원</td>
                    </tr>
                    <tr>
                      <td>아이방</td>
                      <td>0000000000원</td>
                    </tr>
                    <tr>
                      <td>안방</td>
                      <td>0000000000원</td>
                    </tr>
                    <tr>
                      <td>서재</td>
                      <td>0000000000원</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="price-list">
              <h2>가격표</h2>
              <table>
                <thead>
                  <tr>
                    <th>상품명</th>
                    <th>가격</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>원룸</td>
                    <td>700000원</td>
                  </tr>
                  <tr>
                    <td>거실</td>
                    <td>800000원</td>
                  </tr>
                  <tr>
                    <td>부엌</td>
                    <td>500000원</td>
                  </tr>
                  <tr>
                    <td>아이방</td>
                    <td>500000원</td>
                  </tr>
                  <tr>
                    <td>안방</td>
                    <td>700000원</td>
                  </tr>
                  <tr>
                    <td>서재</td>
                    <td>600000원</td>
                  </tr>
                  <tr>
                    <td>수수료</td>
                    <td>5%</td>
                  </tr>
                </tbody>
              </table>
              <div className="sales-btn-zone">
                <button type="button" id="price-update" onClick={priceUpdate}>
                  가격수정
                </button>
                {priceModal && (
                  <PriceUpdateModal
                    onClose={() => {
                      setPriceModal(false);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const PriceUpdateModal = ({ onClose }) => {
  return (
    <section className="price-modal-all-wrap">
      <div className="price-modal-wrap">
        <div className="price-modal-title">
          <h2>가격표 수정</h2>
        </div>
        <div className="price-modal-content">
          <form>
            <table className="price-table-form">
              <thead>
                <tr>
                  <th>상품명</th>
                  <th>가격</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>원룸</td>
                  <td>
                    <input type="text" id="oneroom" name="oneroom" />
                  </td>
                </tr>
                <tr>
                  <td>거실</td>
                  <td>
                    <input type="text" id="living-room" name="living-room" />
                  </td>
                </tr>
                <tr>
                  <td>부엌</td>
                  <td>
                    <input type="text" id="kitchen" name="kitchen" />
                  </td>
                </tr>
                <tr>
                  <td>아이방</td>
                  <td>
                    <input type="text" id="kids-room" name="kids-room" />
                  </td>
                </tr>
                <tr>
                  <td>안방</td>
                  <td>
                    <input type="text" id="bed-room" name="bed-room" />
                  </td>
                </tr>
                <tr>
                  <td>서재</td>
                  <td>
                    <input type="text" id="study-room" name="study-room" />
                  </td>
                </tr>
                <tr>
                  <td>수수료</td>
                  <td>
                    <input type="text" id="study-room" name="study-room" />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="modal-btn-zone">
              <button type="button" id="update-cancel" onClick={onClose}>
                취소
              </button>
              <button type="submit" id="update-ok">
                확인
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminSalesStatus;
