import SideMenu from "../utils/SideMenu";
import "./Admin.css";

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
      <div className="detail-content-wrap">
        <section>
          <div className="title-header">
            <h1>디자이너 신청자 상세보기</h1>
          </div>
          <div className="detail-default">
            <div className="default-profile-wrap">
              <div className="default-img">
                <img src="/image/default_image.png" width={230} height={230} />
              </div>
              <div className="default-profile">
                <table>
                  <thead>
                    <tr>
                      <th colSpan={2}>
                        <h2>홍길동</h2>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>경력</th>
                      <td>6년</td>
                    </tr>
                    <tr>
                      <th>나이</th>
                      <td>27세</td>
                    </tr>
                    <tr>
                      <th>이메일</th>
                      <td>HiHello@gmail.com</td>
                    </tr>
                    <tr>
                      <th>연락처</th>
                      <td>010-5648-4157</td>
                    </tr>
                    <tr>
                      <th>주소</th>
                      <td>서울시 종로구 아무튼 어딘가의 상세주소</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="detail-edu">
              <table>
                <tr>
                  <th>
                    <h3>최종학력</h3>
                  </th>
                  <td>2017.02</td>
                  <td>홍익대학교 석사</td>
                  <td>시각 디자인 학과</td>
                </tr>
              </table>
            </div>
            <div className="detail-career">
              <table>
                <tr>
                  <th>
                    <h3>경력사항</h3>
                  </th>
                  <td>2000.00 - 2000.00</td>
                  <td>일반회사</td>
                </tr>
                <tr>
                  <th></th>
                  <td>2000.00 - 2000.00</td>
                  <td>이름이긴회사</td>
                </tr>
                <tr>
                  <th></th>
                  <td>2000.00 - 2000.00</td>
                  <td>이름이조금더긴회사</td>
                </tr>
              </table>
            </div>
            <div className="detail-award">
              <table>
                <tr>
                  <th>
                    <h3>수상내역</h3>
                  </th>
                  <td>2020.10</td>
                  <td>아무튼 진짜 개쩌는 대회 대상</td>
                </tr>
                <tr>
                  <th></th>
                  <td>2018.02</td>
                  <td>레전드한 대회 은상</td>
                </tr>
                <tr>
                  <th></th>
                  <td>2017.09</td>
                  <td>그냥 일반 대회 입상</td>
                </tr>
              </table>
            </div>
            <div className="detail-payment">
              <table>
                <tr>
                  <th>
                    <h3>지급정보</h3>
                  </th>
                  <td>은행명</td>
                  <td>우리은행</td>
                </tr>
                <tr>
                  <th></th>
                  <td>계좌번호</td>
                  <td>1004-453-080-759</td>
                </tr>
              </table>
            </div>
            <div className="detail-portfolio">
              <table>
                <tr>
                  <th>
                    <h3>포트폴리오</h3>
                  </th>
                  <td>http://www.포폴링크.com</td>
                </tr>
              </table>
            </div>
            <div className="detail-kakao">
              <table>
                <tr>
                  <th>
                    <h3>카카오톡 링크</h3>
                  </th>
                  <td>카카오톡 오픈 프로필 링크</td>
                </tr>
              </table>
            </div>
          </div>
          <div className="button-place">
            <button type="button" id="cancel">
              반려
            </button>
            <button type="button" id="enter">
              승인
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Applicantdetail;
