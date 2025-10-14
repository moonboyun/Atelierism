import SideMenu from "../Util/SideMenu";

const userData = {
  userName: "홍길동",
  userCareer: 6,
  userAge: 27,
  userEmail: "HiHello@gmail.com",
  userAddr: "서울시 종로구 아무튼 어딘가 상세주소까지 받으려나",
};
const userDetail = {
  academicAbilityDate: "2017.02",
  academic: "홍익대학교 석사",
  ability: "시각 디자인 학과",
  bankName: "우리은행",
  bankAccountNumber: "1004-459-010756",
  portfolioLink: "http://www.포폴링크.com",
  kakaoTalkLink: "카카오톡 오픈 프로필 링크",
};
const userCareerList = [
  {
    CareerStartDate: "2025.01.01",
    CareerEndDate: "2025.10.14",
    CorporateName: "아무튼 근무지1",
  },
  {
    CareerStartDate: "2023.01.01",
    CareerEndDate: "2024.10.14",
    CorporateName: "아무튼 근무지2",
  },
  {
    CareerStartDate: "2022.01.01",
    CareerEndDate: "2023.10.14",
    CorporateName: "아무튼 근무지3",
  },
];
const awardDetails = [
  {
    awardDate: "2020.10",
    awardName: "아무튼 진짜 개 쩌는 대회 대상",
  },
  { awardDate: "2018.02", awardName: "레전드한 대회 은상" },
  { awardDate: "2020.10", awardName: "일단 그냥 대회 입상" },
];
const Applicantdetail = () => {
  return (
    <div className="detailAllWrap">
      <SideMenu />
      <div></div>
    </div>
  );
};

export default Applicantdetail;
