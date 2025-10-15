import SideMenu from "../utils/SideMenu";
import "./Admin.css";
import { BarChart } from "@mui/x-charts/BarChart";

const AdminMypage = () => {
  return (
    <div className="admin-mypage-all-wrap">
      <div className="admin-mypage-wrap">
        <section className="side-menu-section">
          <SideMenu />
        </section>
        <section className="section-content">
          <div className="admin-mypage-title">
            <h1>마이페이지</h1>
          </div>
          <div className="admin-mypage-content1">
            <div className="main-chart">
              <h2>매출 현황</h2>
              <div className="chart-content">
                <BarChart
                  xAxis={[{ data: ["1월", "2월", "3월", "4월", "5월", "6월"] }]}
                  series={[
                    {
                      data: [
                        4568147, 3217476, 1234769, 456234, 7856541, 2137411,
                      ],
                    },
                  ]}
                  height={300}
                />
              </div>
            </div>
            <div className="applicant-list">
              <h2>신청자 리스트</h2>
              <table border={1}>
                <tr>
                  <th>이름</th>
                  <th>상태</th>
                </tr>
                <tr>
                  <td>홍길동</td>
                  <td>대기중</td>
                </tr>
                <tr>
                  <td>홍길동</td>
                  <td>대기중</td>
                </tr>
                <tr>
                  <td>홍길동</td>
                  <td>수락됨</td>
                </tr>
                <tr>
                  <td>홍길동</td>
                  <td>반려됨</td>
                </tr>
                <tr>
                  <td>홍길동</td>
                  <td>수락됨</td>
                </tr>
                <tr>
                  <td>홍길동</td>
                  <td>수락됨</td>
                </tr>
              </table>
            </div>
          </div>
          {/*admin-mypage-content1*/}
          <div className="admin-mypage-content2">
            <h2>디자이너 리스트</h2>
            <table border={1}>
              <tr>
                <th>디자이너 이름</th>
                <th> 입점일</th>
                <th>이번달 매출액</th>
                <th>매출성적</th>
              </tr>
              <tr>
                <td>김민지</td>
                <td>21/04/12</td>
                <td>41,000,000원</td>
                <td>1등</td>
              </tr>
              <tr>
                <td>김민지</td>
                <td>21/04/12</td>
                <td>41,000,000원</td>
                <td>2등</td>
              </tr>
              <tr>
                <td>김민지</td>
                <td>21/04/12</td>
                <td>41,000,000원</td>
                <td>3등</td>
              </tr>
              <tr>
                <td>김민지</td>
                <td>21/04/12</td>
                <td>41,000,000원</td>
                <td>4등</td>
              </tr>
              <tr>
                <td>김민지</td>
                <td>21/04/12</td>
                <td>41,000,000원</td>
                <td>5등</td>
              </tr>
            </table>
          </div>
        </section>
      </div>
      {/*admin-mypage-wrap*/}
    </div> /*admin-mypage-all-wrap*/
  );
};

export default AdminMypage;
