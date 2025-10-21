import { Route, Routes } from "react-router-dom";
import Main from "./component/common/Main";
import MemberLogin from "./component/member/MemberLogin";
import MemberJoin from "./component/member/MemberJoin";
import Header from "./component/common/Header";
import Footer from "./component/common/Footer";
import Agreement from "./component/member/Agreement";
import Applicantdetail from "./component/admin/Applicantdetail";
import MemberInfo from "./component/member/MemberInfo";
import MemberUpdate from "./component/member/MemberUpdate";
import Payment from "./component/Member/Payment";
import RecoverId from "./component/Member/RecoverId";
import ReviewWriter from "./component/board/ReviewWriter";
import BoardReview from "./component/board/BoardReview";
import BoardInquiry from "./component/board/BoardInquiry";
import BoardDesigner from "./component/board/BoardDesigner";
import {
  authReadyState,
  loginIdState,
  memberTypeState,
} from "./component/utils/RecoilData";
import { useRecoilState } from "recoil";
import AdminMypage from "./component/Admin/AdminMypage";
import RecoverPw from "./component/member/RecoverPw";
import Intro from "./component/designer/Intro";
import InquiryWriter from "./component/board/InquiryWriter";
import AdminSalesStatus from "./component/Admin/AdminSalesStatus";
import AdminMain from "./component/Admin/AdminMain";
import DesignerMypage from "./component/designer/designerMypage";
import DesignerInfo from "./component/designer/DesignerInfo";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [memberId, setMemberId] = useRecoilState(loginIdState); //회원 아이디를 저장하고 있는 state
  const [memberType, setMemberType] = useRecoilState(memberTypeState); //회원 등급을 저장하고 있는 state
  const [authReady, setAuthReady] = useRecoilState(authReadyState);
  useEffect(() => {
    refresh();
    window.setInterval(refresh, 1000 * 60 * 50);
  });
  const refresh = () => {
    //localStorage에서 refreshToken을 받아와서 자동으로 로그인 처리
    const refreshToken = window.localStorage.getItem("refreshToken");

    if (refreshToken !== null) {
      //refreshToken을 사용중이면 인증받아서 자동으로 로그인 처리
      axios.defaults.headers.common["Authorization"] = refreshToken;
      axios
        .get(`${import.meta.env.VITE_BACK_SERVER}/member/refresh`)
        .then((res) => {
          setMemberId(res.data.memberId);
          setMemberType(res.data.memberType);
          axios.defaults.headers.common["Authorization"] = res.data.accessToken;
          window.localStorage.setItem("refreshToken", res.data.refreshToken);
          setAuthReady(true);
        })
        .catch((err) => {
          setMemberId("");
          setMemberType(0);
          delete axios.defaults.headers.common["Authorization"];
          window.localStorage.removeItem("refreshToken");
          setAuthReady(true);
        });
    } else {
      setAuthReady(true);
    }
  };
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
          <Route path="/admin/*" element={<AdminMain />} />
          {/*----------------------board---------------------*/}
          <Route path="/board/review/writer" element={<ReviewWriter />} />
          <Route path="/board/review" element={<BoardReview />} />
          <Route path="/board/inquiry" element={<BoardInquiry />} />
          <Route path="/board/designer" element={<BoardDesigner />} />
          <Route path="/board/inquiry/writer" element={<InquiryWriter />} />
          {/*----------------------designer---------------------*/}
          <Route path="/designer/intro" element={<Intro />} />
          <Route path="/designer/mypage" element={<DesignerMypage />} />
          <Route path="/designer/designerInfo" element={<DesignerInfo />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
