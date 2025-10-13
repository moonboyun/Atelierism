import { Route, Routes } from "react-router-dom";
import Main from "./common/Main";
import MemberLogin from "./component/Member/MemberLogin";
import MemberJoin from "./component/Member/MemberJoin";
import "./component/Member/member.css";
import Header from "./common/Header";
import Footer from "./common/Footer";

function App() {
  return (
    <div className="wrap">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="member/login" element={<MemberLogin />} />
        <Route path="member/join" element={<MemberJoin />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
