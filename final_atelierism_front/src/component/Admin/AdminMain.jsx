import { Route, Routes } from "react-router-dom";
import SideMenu from "../utils/SideMenu";
import AdminSalesStatus from "./AdminSalesStatus";
import { useState } from "react";
import AdminMypage from "./AdminMypage";
import AdminList from "./AdminList";
const AdminMain = () => {
  const [menus, setMenus] = useState([
    { url: "/admin/sales", text: "매출 현황" },
    { url: "/admin/applicantList", text: "신청자 리스트" },
    { url: "/admin/designerList", text: "디자이너 리스트" },
    { url: "/admin/memberList", text: "회원 리스트" },
  ]);
  return (
    <div className="admin-main-all-wrap">
      <h1>마이페이지</h1>
      <div className="admin-main-wrap">
        <section className="admin-main-side-menu">
          <SideMenu menus={menus} />
        </section>
        <section className="admin-main-inner-content">
          <Routes>
            <Route path="/sales" element={<AdminSalesStatus />} />
            <Route path="/mypage" element={<AdminMypage />} />
            <Route path="/memberList" element={<AdminList data={1} />} />
            <Route path="/designerList" element={<AdminList data={2} />} />
            <Route path="/applicantList" element={<AdminList data={3} />} />
          </Routes>
        </section>
      </div>
    </div>
  );
};

export default AdminMain;
