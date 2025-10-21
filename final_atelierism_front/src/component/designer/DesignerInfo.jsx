import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import SideMenu from "../utils/SideMenu";
import "./designer-info.css";

const DesignerInfo = () => {
  const designerId = useRecoilValue(loginIdState);
  const [info, setInfo] = useState(null);

  const menus = [
    { url: "/designer/mypage", text: "마이페이지" },
    { url: "/designer/update", text: "정보 수정" },
    { url: "/designer/designerInfo", text: "디자이너 정보" },
    { url: "/designer/status", text: "작업 현황" },
  ];

  useEffect(() => {
    setInfo({
      careerYears: "6년 이상",
      careers: [
        { start: "2020.02", end: "2021.02", company: "디자인랩" },
        { start: "2021.03", end: "2023.01", company: "아트컴퍼니" },
        { start: "2023.02", end: "현재", company: "크리에이티브하우스" },
      ],
      graduationDate: "2020.02",
      graduation: "아무 대학교 시각디자인학과 학사",
      awards: [
        { date: "2020.02", title: "서울 디자인 공모전 입상" },
        { date: "2021.06", title: "UX 챌린지 우수상" },
        { date: "2022.09", title: "K-Design Awards 대상" },
      ],
      bank: "우리은행",
      account: "1111-2222-3333-44",
      portfolio: "http://www.portfolio-example.com",
      chat: "https://open.kakao.com/user01",
      introduce: "감각적인 디자인으로 만족을 드립니다 :)",
    });
  }, [designerId]);

  if (!info) return null;

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
                    <span className="de-value">{info.careerYears}</span>
                  </div>
                </td>
              </tr>

              <tr>
                <th>경력(상세)</th>
                <td>
                  {info.careers.map((c, i) => (
                    <div className="de-line" key={`career-${i}`}>
                      <span className="de-sub">{c.start}</span>
                      <span className="de-tilde">~</span>
                      <span className="de-sub">{c.end}</span>
                      <span className="de-dot" />
                      <span className="de-value">{c.company}</span>
                    </div>
                  ))}
                </td>
              </tr>

              <tr>
                <th>학력</th>
                <td>
                  <div className="de-line">
                    <span className="de-sub">{info.graduationDate}</span>
                    <span className="de-dot" />
                    <span className="de-value">{info.graduation}</span>
                  </div>
                </td>
              </tr>

              <tr>
                <th>수상내역</th>
                <td>
                  {info.awards.map((a, i) => (
                    <div className="de-line" key={`award-${i}`}>
                      <span className="de-sub">{a.date}</span>
                      <span className="de-dot" />
                      <span className="de-value">{a.title}</span>
                    </div>
                  ))}
                </td>
              </tr>

              <tr>
                <th>은행명</th>
                <td>
                  <div className="de-line">
                    <span className="de-value">{info.bank}</span>
                  </div>
                </td>
              </tr>

              <tr>
                <th>계좌번호</th>
                <td>
                  <div className="de-line">
                    <span className="de-value">{info.account}</span>
                  </div>
                </td>
              </tr>

              <tr>
                <th>포트폴리오</th>
                <td>
                  <div className="de-line">
                    <a
                      className="de-link"
                      href={info.portfolio}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {info.portfolio}
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
                      href={info.chat}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {info.chat}
                    </a>
                  </div>
                </td>
              </tr>

              <tr>
                <th>한줄 소개</th>
                <td>
                  <div className="de-line">
                    <span className="de-value">{info.introduce}</span>
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
