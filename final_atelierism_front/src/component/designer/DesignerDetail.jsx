import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

const DesignerDetail = () => {
  const params = useParams();
  const memberId = params.memberId;

  const [designer, setDesigner] = useState(null);
  const backServer = import.meta.env.VITE_BACK_SERVER;

  useEffect(() => {
    axios
      .get(`${backServer}/designer/detail/${memberId}`)
      .then((res) => {
        setDesigner(res.data);
      })
      .catch((err) => {
        console.error("디자이너 상세 정보 로딩 실패:", err);
      });
  }, [memberId]);

  if (designer === null) {
    return <div className="de-detail-loading">로딩중...</div>;
  }

  return (
    <div className="de-detail-wrap">
      <div className="de-detail-header">
        <div className="de-detail-profile-img">
          <img
            src={
              designer.memberThumb
                ? `${import.meta.env.VITE_BACK_SERVER}/memberProfile/${
                    designer.memberThumb
                  }?t=${Date.now()}`
                : `${import.meta.env.BASE_URL}image/default_image.png`
            }
            alt={`${designer.memberName} 디자이너 프로필`}
          />
        </div>
        <div className="de-detail-profile-info">
          <h1 className="de-detail-name">{designer.memberName}</h1>
          <p className="de-detail-introduce">{designer.designerIntroduce}</p>
          <div className="de-detail-tags">
            <span>#경력 {designer.designerCareer}년</span>
            <span>#나이 {designer.designerAge}세</span>
          </div>
        </div>
      </div>

      <div className="de-detail-content">
        {/* 기본 정보 */}
        <div className="de-detail-section">
          <h2 className="de-detail-section-title">
            <PersonIcon /> 기본 정보
          </h2>
          <div className="de-info-grid">
            <p>
              <strong>학력:</strong> {designer.designerGraduation} (
              {designer.designerGraduationDate})
            </p>
            <p>
              <strong>포트폴리오:</strong>{" "}
              <a
                href={designer.designerPortfolio}
                target="_blank"
                rel="noopener noreferrer"
              >
                {designer.designerPortfolio}
              </a>
            </p>
            <p>
              <strong>오픈채팅:</strong>{" "}
              <a
                href={designer.designerChat}
                target="_blank"
                rel="noopener noreferrer"
              >
                {designer.designerChat}
              </a>
            </p>
          </div>
        </div>

        {/* 경력 사항 */}
        <div className="de-detail-section">
          <h2 className="de-detail-section-title">
            <WorkHistoryIcon /> 경력 사항
          </h2>
          <ul className="de-history-list">
            {designer.careerList.map((career, index) => (
              <li key={`career-${index}`}>
                <span className="de-history-date">
                  {career.designerCareerSy} ~ {career.designerCareerEy}
                </span>
                <span className="de-history-content">
                  {career.designerCareerCom}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* 수상 내역 */}
        <div className="de-detail-section">
          <h2 className="de-detail-section-title">
            <EmojiEventsIcon /> 수상 내역
          </h2>
          <ul className="de-history-list">
            {designer.awardList.map((award, index) => (
              <li key={`award-${index}`}>
                <span className="de-history-date">
                  {award.designerAwardsDete}
                </span>
                <span className="de-history-content">
                  {award.designerAwards}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DesignerDetail;
