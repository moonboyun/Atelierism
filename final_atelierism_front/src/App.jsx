import { Route, Routes } from "react-router-dom";
import Main from "./component/common/Main";
import MemberLogin from "./component/Member/MemberLogin";
import MemberJoin from "./component/Member/MemberJoin";
import "./component/Member/member.css";
import Header from "./component/common/Header";
import Footer from "./component/common/Footer";
import Agreement from "./component/Member/Agreement";
import Applicantdetail from "./component/admin/Applicantdetail";
import MemberInfo from "./component/Member/memberInfo";
import MemberUpdate from "./component/Member/MemberUpdate";
import Payment from "./component/Member/Payment";

function App() {
  return (
    <div className="wrap">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="member/login" element={<MemberLogin />} />
        <Route path="member/agree" element={<Agreement />} />
        <Route path="member/join" element={<MemberJoin />} />
        <Route path="member/update" element={<MemberUpdate />} />
        <Route path="member/payment" element={<Payment />} />
        <Route path="admin/detail" element={<Applicantdetail />} />
        <Route path="member/mypage" element={<MemberInfo />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
