import { colors } from "@mui/material";
import SideMenu from "../utils/SideMenu";
import "./Admin.css";
import { BarChart } from "@mui/x-charts/BarChart";
import { useState } from "react";

const AdminMypage = () => {
  const [menus, setMenus] = useState([
    { url: "/admin/mypage", text: "마이페이지" },
    { url: "/admin/sales", text: "매출 현황" },
    { url: "/admin/applicantList", text: "신청자 리스트" },
    { url: "/admin/designerList", text: "디자이너 리스트" },
    { url: "/admin/memberList", text: "회원 리스트" },
  ]);
  return (
    <div className="admin-mypage-all-wrap">
      <div className="admin-mypage-wrap">
        <section className="section-content">
          <div className="admin-mypage-content1">
            <div className="main-chart">
              <h2>매출 현황</h2>
              <div className="admin-chart-content">
                <BarChart
                  xAxis={[{ data: ["1월", "2월", "3월", "4월", "5월", "6월"] }]}
                  series={[
                    {
                      data: [
                        25166558, 5641628, 231215568, 56463215, 23148867,
                        1568815,
                      ],
                    },
                  ]}
                  height={300}
                  width={450}
                  sx={{
                    marginRight: "25px",
                    marginTop: "10px",
                  }}
                />
              </div>
            </div>
            <div className="applicant-list">
              <h2>디자이너 신청자 리스트</h2>
              <table>
                <thead>
                  <tr>
                    <th>이름</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
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
                </tbody>
              </table>
            </div>
          </div>
          {/*admin-mypage-content1*/}
          <div className="admin-mypage-content2">
            <h2>이 달의 디자이너 순위 TOP 5</h2>
            <table className="admin-designer-table" border={1}>
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
