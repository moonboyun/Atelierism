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
              <table></table>
            </div>
            <div className="price-list">
              <h2>가격표</h2>
              <table></table>
              <button type="button">가격수정</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminSalesStatus;
