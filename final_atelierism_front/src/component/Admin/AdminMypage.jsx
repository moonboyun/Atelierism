import { colors } from "@mui/material";
import SideMenu from "../utils/SideMenu";
import "./Admin.css";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";
import AdminChart from "./AdminChart";
import axios from "axios";

const AdminMypage = () => {
  const [menus, setMenus] = useState([
    { url: "/admin/mypage", text: "마이페이지" },
    { url: "/admin/sales", text: "매출 현황" },
    { url: "/admin/applicantList", text: "신청자 리스트" },
    { url: "/admin/designerList", text: "디자이너 리스트" },
    { url: "/admin/memberList", text: "회원 리스트" },
  ]);
  const today = new Date();
  const toMonth = `${today.getFullYear()}-${today.getMonth() + 1}`;
  const [mypageList, setMypageList] = useState(null);
  const [applicantList, setApplicantList] = useState(null);
  const [topDesignerList, setTopDesignerList] = useState(null);
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACK_SERVER
        }/admin/myPageList?toMonth=${toMonth}`
      )
      .then((res) => {
        setMypageList(res.data);
        setApplicantList(res.data.applicantList);
        setTopDesignerList(res.data.topDesignerList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="admin-mypage-all-wrap">
      {mypageList != null && (
        <div className="admin-mypage-wrap">
          <section className="section-content">
            <div className="admin-mypage-content1">
              <div className="main-chart">
                <h2>매출 현황</h2>
                <div className="admin-chart-content">
                  <AdminChart />
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
                    {applicantList.map((applicant, i) => {
                      return (
                        <tr>
                          <td>{applicant.memberName}</td>
                          {applicant.designerEnter === 0 && <td>대기중</td>}
                        </tr>
                      );
                    })}
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
                  <th>연락처</th>
                  <th>이번달 매출액</th>
                  <th>매출성적</th>
                </tr>
                {topDesignerList != null &&
                  topDesignerList.map((topDesigner, i) => {
                    return (
                      <tr>
                        <td>{topDesigner.memberName}</td>
                        <td>{topDesigner.memberPhone}</td>
                        <td>{topDesigner.totalPrice}원</td>
                        <td>{i + 1}등</td>
                      </tr>
                    );
                  })}
              </table>
            </div>
          </section>
        </div>
      )}
    </div> /*admin-mypage-all-wrap*/
  );
};

export default AdminMypage;
