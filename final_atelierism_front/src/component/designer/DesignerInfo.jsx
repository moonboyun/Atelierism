import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import SideMenu from "../utils/SideMenu";
import axios from "axios";
import "./designer.css";

const DesignerInfo = () => {
  const designerId = useRecoilValue(loginIdState);
  const [info, setInfo] = useState(null);
  const backServer = import.meta.env.VITE_BACK_SERVER;

  const menus = [
    { url: "/designer/mypage", text: "마이페이지" },
    { url: "/member/update", text: "정보 수정" },
    { url: "/designer/designerInfo", text: "디자이너 정보" },
    { url: "/designer/status", text: "작업 현황" },
  ];

  useEffect(() => {
    if (designerId) {
      axios
        .get(`${backServer}/designer/detail/${designerId}`)
        .then((res) => {
          setInfo(res.data);
        })
        .catch((err) => {
          console.error("디자이너 정보 로딩 실패:", err);
        });
    }
  }, [designerId]);

  if (info === null) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="de-info-page">
      <div className="de-info-title">디자이너 정보</div>

      <div className="de-info-content">
        <section className="de-side-menu">
          <SideMenu menus={menus} />
        </section>

        <section className="de-info-panel">
          <table className="de-info-tbl">
            <tbody>
              <tr>
                <th>경력(년)</th>
                <td>
                  <div className="de-line">
                    <span className="de-value">{info.designerCareer}년</span>
                  </div>
                </td>
              </tr>

              <tr>
                <th>경력(상세)</th>
                <td>
                  {info.careerList.map((c, i) => (
                    <div className="de-line" key={`career-${i}`}>
                      <span className="de-sub">{c.designerCareerSy}</span>
                      <span className="de-tilde">~</span>
                      <span className="de-sub">{c.designerCareerEy}</span>
                      <span className="de-dot" />
                      <span className="de-value">{c.designerCareerCom}</span>
                    </div>
                  ))}
                </td>
              </tr>

              <tr>
                <th>학력</th>
                <td>
                  <div className="de-line">
                    <span className="de-sub">
                      {info.designerGraduationDate}
                    </span>
                    <span className="de-dot" />
                    <span className="de-value">{info.designerGraduation}</span>
                  </div>
                </td>
              </tr>

              <tr>
                <th>수상내역</th>
                <td>
                  {info.awardList.map((a, i) => (
                    <div className="de-line" key={`award-${i}`}>
                      <span className="de-sub">{a.designerAwardsDete}</span>
                      <span className="de-dot" />
                      <span className="de-value">{a.designerAwards}</span>
                    </div>
                  ))}
                </td>
              </tr>

              <tr>
                <th>은행명</th>
                <td>
                  <div className="de-line">
                    <span className="de-value">{info.designerBank}</span>
                  </div>
                </td>
              </tr>

              <tr>
                <th>계좌번호</th>
                <td>
                  <div className="de-line">
                    <span className="de-value">{info.designerAccount}</span>
                  </div>
                </td>
              </tr>

              <tr>
                <th>포트폴리오</th>
                <td>
                  <div className="de-line">
                    <a
                      className="de-link"
                      href={info.designerPortfolio}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {info.designerPortfolio}
                    </a>
                  </div>
                </td>
              </tr>

              <tr>
                <th>오픈채팅 링크</th>
                <td>
                  <div className="de-line">
                    <a
                      className="de-link"
                      href={info.designerChat}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {info.designerChat}
                    </a>
                  </div>
                </td>
              </tr>

              <tr>
                <th>한줄 소개</th>
                <td>
                  <div className="de-line">
                    <span className="de-value">{info.designerIntroduce}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default DesignerInfo;
