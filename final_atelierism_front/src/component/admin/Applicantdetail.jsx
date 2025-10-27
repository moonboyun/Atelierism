import { useEffect, useState } from "react";
import SideMenu from "../utils/SideMenu";
import "./Admin.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Applicantdetail = () => {
  const [memberProfile, setMemberPropfile] = useState(null);
  const [memberAward, setMemberAward] = useState(null);
  const [memberCareer, setMemberCareer] = useState(null);
  const param = useParams();
  const memberId = param.memberId; //유저의 아이디
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACK_SERVER}/admin/detail?memberId=${memberId}`
      )
      .then((res) => {
        setMemberAward(res.data.applicantAward);
        setMemberCareer(res.data.applicantCareer);
        setMemberPropfile(res.data.applicantDetail[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="detailAllWrap">
      {memberAward != null && memberCareer != null && memberProfile != null && (
        <div className="detail-content-wrap">
          <section>
            <div className="title-header">
              <h1>디자이너 신청자 상세보기</h1>
            </div>
            <div className="detail-default">
              <div className="default-profile-wrap">
                <div className="default-img">
                  <img
                    src="/image/default_image.png"
                    width={230}
                    height={230}
                  />
                </div>
                <div className="default-profile">
                  <table>
                    <thead>
                      <tr>
                        <th colSpan={2}>
                          <h2>{memberProfile.memberName}</h2>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>경력</th>
                        <td>{memberProfile.designerCareer}년</td>
                      </tr>
                      <tr>
                        <th>나이</th>
                        <td>{memberProfile.designerAge}세</td>
                      </tr>
                      <tr>
                        <th>이메일</th>
                        <td>{memberProfile.memberEmail}</td>
                      </tr>
                      <tr>
                        <th>연락처</th>
                        <td>{memberProfile.memberPhone}</td>
                      </tr>
                      <tr>
                        <th>주소</th>
                        <td>{memberProfile.memberAddr}</td>
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
                    <td>{memberProfile.designerGraduationDate}</td>
                    <td>{memberProfile.designerGraduation}</td>
                    <td></td>
                  </tr>
                </table>
              </div>
              <div className="detail-career">
                <table>
                  <tr>
                    <th>
                      <h3>경력사항</h3>
                    </th>
                    <th id="cartitle">재직기간</th>
                    <th id="cartitle">회사명</th>
                  </tr>
                  {console.log(memberCareer)}
                  {memberCareer != null &&
                    memberCareer.map((career, i) => {
                      return (
                        <tr id="care">
                          <th></th>
                          <td>
                            {career.designerCareerSy} ~{" "}
                            {career.designerCareerEy}
                          </td>
                          <td>{career.designerCareerCom}</td>
                        </tr>
                      );
                    })}
                </table>
              </div>
              <div className="detail-award">
                <table>
                  <tr>
                    <th>
                      <h3>수상내역</h3>
                    </th>
                    <th>수상일</th>
                    <th>대회명</th>
                  </tr>
                  <tr>
                    {console.log(memberAward)}
                    <td></td>
                    <td>2020.10</td>
                    <td>아무튼 진짜 개쩌는 대회 대상</td>
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
                    <td>{memberProfile.designerBank}</td>
                  </tr>
                  <tr>
                    <th></th>
                    <td>계좌번호</td>
                    <td>{memberProfile.designerAccount}</td>
                  </tr>
                </table>
              </div>
              <div className="detail-portfolio">
                <table>
                  <tr>
                    <th>
                      <h3>포트폴리오</h3>
                    </th>
                    {memberProfile.designerProfolio != null ? (
                      <td>{memberProfile.designerProfolio}</td>
                    ) : (
                      ""
                    )}
                  </tr>
                </table>
              </div>
              <div className="detail-kakao">
                <table>
                  <tr>
                    <th>
                      <h3>카카오톡 링크</h3>
                    </th>
                    {memberProfile.designerChat != null ? (
                      <td>{memberProfile.designerChat}</td>
                    ) : (
                      ""
                    )}
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
      )}
    </div>
  );
};

export default Applicantdetail;
