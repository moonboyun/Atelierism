import { Route, Routes } from "react-router-dom";
import Main from "./component/common/Main";
import MemberLogin from "./component/member/MemberLogin";
import MemberJoin from "./component/member/MemberJoin";
import Header from "./component/common/Header";
import Footer from "./component/common/Footer";
import Agreement from "./component/member/Agreement";
import Applicantdetail from "./component/admin/Applicantdetail";
import MemberInfo from "./component/Member/memberInfo";
import MemberUpdate from "./component/Member/MemberUpdate";
import Payment from "./component/Member/Payment";
import RecoverId from "./component/Member/RecoverId";
import ReviewWriter from "./component/board/ReviewWriter";
import BoardReview from "./component/board/BoardReview";
import BoardInquiry from "./component/board/BoardInquiry";
import BoardDesigner from "./component/board/BoardDesigner";
import { loginIdState, memberTypeState } from "./component/utils/RecoilData";
import { useRecoilState } from "recoil";
import AdminMypage from "./component/Admin/AdminMypage";
import RecoverPw from "./component/member/RecoverPw";
import Intro from "./component/designer/intro";
import InquiryWriter from "./component/board/InquiryWriter";
import AdminSalesStatus from "./component/Admin/AdminSalesStatus";

function App() {
  return (
    <div className="wrap">
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          {/*---------------------member-------------------*/}
          <Route path="member/agree" element={<Agreement />} />
          <Route path="member/login" element={<MemberLogin />} />
          <Route path="member/join" element={<MemberJoin />} />
          <Route path="member/update" element={<MemberUpdate />} />
          <Route path="member/mypage" element={<MemberInfo />} />
          <Route path="member/recoverId" element={<RecoverId />} />
          <Route path="member/recoverPw" element={<RecoverPw />} />
          <Route path="member/payment" element={<Payment />} />
          {/*----------------------admin---------------------*/}
          <Route path="/admin/detail" element={<Applicantdetail />} />
          <Route path="/admin/mypage" element={<AdminMypage />} />
          <Route path="/admin/sales" element={<AdminSalesStatus />} />
          <Route path="/admin/sales" element={<AdminSalesStatus />} />
          {/*----------------------board---------------------*/}
          <Route path="/board/review/writer" element={<ReviewWriter />} />
          <Route path="/board/review" element={<BoardReview />} />
          <Route path="/board/inquiry" element={<BoardInquiry />} />
          <Route path="/board/designer" element={<BoardDesigner />} />
          <Route path="/board/inquiry/writer" element={<InquiryWriter />} />
          {/*----------------------designer---------------------*/}
          <Route path="/designer/intro" element={<Intro />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
