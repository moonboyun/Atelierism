import SideMenu from "../utils/SideMenu";

const AdminSalesStatus = () => {
  return (
    <div className="admin-sales-status-allwrap">
      <div className="admin-sales-status-wrap">
        <div className="admin-sales-side">
          <SideMenu />
        </div>
        <div className="admin-sales-status-content">
          <div className="sales-chart">
            <h2>매출 그래프</h2>
            <div className="chart-zone"></div>
            <div className="sales-btn-zone">
              <button type="button">3개월</button>
              <button type="button">6개월</button>
              <button type="button">년단위</button>
            </div>
          </div>
          <div className="site-total">
            <h2>사이트 토탈</h2>
            <div className="total-table"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSalesStatus;
