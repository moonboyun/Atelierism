import SideMenu from "../utils/SideMenu";

const AdminSalesStatus = () => {
  return (
    <div className="admin-sales-status-allwrap">
      <h1>매출 현황</h1>
      <div className="admin-sales-status-wrap">
        <section className="admin-sales-side">
          <SideMenu />
        </section>
        <section className="admin-sales-status-content">
          <div className="admin-sales-status-content-top">
            <div className="sales-chart">
              <h2>매출 그래프</h2>
              <div className="chart-zone"></div>
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
              <table border={1}>
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
                <button type="button" id="price-update">
                  가격수정
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminSalesStatus;
