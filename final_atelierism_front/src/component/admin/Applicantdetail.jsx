import { useEffect, useState } from "react";
import SideMenu from "../utils/SideMenu";
import "./Admin.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Applicantdetail = () => {
  const [memberProfile, setMemberPropfile] = useState(null);
  const [memberAward, setMemberAward] = useState(null);
  const [memberCareer, setMemberCareer] = useState(null);
  const param = useParams();
  const memberId = param.memberId; //유저의 아이디
  const navigate = useNavigate();
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
  const backServer = import.meta.env.VITE_BACK_SERVER;
  const Refusal = () => {
    Swal.fire({
      title: "신청자 반려",
      text: "해당 신청자를 반려하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      reverseButtons: true,
      confirmButtonColor: " #8aa996",
    }).then((res1) => {
      if (res1.isConfirmed) {
        axios
          .patch(
            `${
              import.meta.env.VITE_BACK_SERVER
            }/admin/refusal?memberId=${memberId}`
          )
          .then((res) => {
            console.log(res);
            if (res.data === 1) {
              Swal.fire({
                title: "완료",
                text: "해당 신청자가 반려되었습니다.",
                icon: "info",
                confirmButtonColor: " #8aa996",
              }).then(() => {
                navigate("/mypage");
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  const enter = () => {
    Swal.fire({
      title: "신청자 승인",
      text: "해당 신청자를 승인하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      reverseButtons: true,
      confirmButtonColor: " #8aa996",
    }).then((res1) => {
      if (res1.isConfirmed) {
        axios
          .patch(
            `${
              import.meta.env.VITE_BACK_SERVER
            }/admin/enter?memberId=${memberId}`
          )
          .then((res) => {
            console.log(res);
            if (res.data === 1) {
              Swal.fire({
                title: "완료",
                text: "해당 신청자가 승인되었습니다.",
                icon: "info",
                confirmButtonColor: " #8aa996",
              }).then(() => {
                navigate("/mypage");
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
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
                  {memberCareer != null ? (
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
                    })
                  ) : (
                    <tr>
                      <th></th>
                      <td></td>
                      <td></td>
                    </tr>
                  )}
                </table>
              </div>
              <div className="detail-award">
                <table>
                  <tr>
                    <th>
                      <h3>수상내역</h3>
                    </th>
                    <th>수상일</th>
                    <th id="award-title">대회명</th>
                  </tr>
                  {memberAward != null ? (
                    memberAward.map((award, i) => {
                      return (
                        <tr>
                          <td></td>
                          <td>{award.designerAwardsDete}</td>
                          <td>{award.designerAwards}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  )}
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
              <button type="button" id="cancel" onClick={Refusal}>
                반려
              </button>
              <button type="button" id="enter" onClick={enter}>
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
