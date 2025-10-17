import { Route, Routes } from "react-router-dom";
import SideMenu from "../utils/SideMenu";
import AdminMypage from "./AdminMypage";
import AdminSalesStatus from "./AdminSalesStatus";

const AdminMain = () => {
  const [menus, setMenus] = useState([
    { url: "/admin/mypage", text: "마이페이지" },
    { url: "/admin/sales", text: "매출 현황" },
    { url: "/admin/applicantList", text: "신청자 리스트" },
    { url: "/admin/designerList", text: "디자이너 리스트" },
    { url: "/admin/memberList", text: "회원 리스트" },
  ]);
  return (
    <div className="admin-main-all-wrap">
      <div className="admin-main-wrap">
        <section className="admin-main-side-menu">
          <SideMenu />
        </section>
        <section className="admin-main-inner-content">
          <Routes>
            <Route path="/sales" element={<AdminSalesStatus />} />
          </Routes>
        </section>
      </div>
    </div>
  );
};

export default AdminMain;
