import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import SideMenu from "../utils/SideMenu";
import PageNavigation from "../utils/PageNavigation";
import { useNavigate } from "react-router-dom";
import DesignerChart from "./DesignerChart";
import "./designer.css";

const DesignerStatus = () => {
  const designerId = useRecoilValue(loginIdState);
  const backServer = import.meta.env.VITE_BACK_SERVER;
  const navigate = useNavigate();

  const [statusList, setStatusList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [menus] = useState([
    { url: "/designer/mypage", text: "마이페이지" },
    { url: "/member/update", text: "정보 수정" },
    { url: "/designer/designerInfo", text: "디자이너 정보" },
    { url: "/designer/status", text: "작업 현황" },
  ]);

  useEffect(() => {
    if (designerId) {
      axios
        .get(
          `${backServer}/designer/status/${designerId}?reqPage=${reqPage}&keyword=${searchKeyword}`
        )
        .then((res) => {
          setStatusList(res.data.statusList);
          setPi(res.data.pi);
        })
        .catch((err) => {
          console.error("작업 현황 로딩 실패:", err);
        });

      axios.get(`${backServer}/designer/chart/${designerId}`).then((res) => {
        setChartData(res.data);
      });
    }
  }, [designerId, reqPage, searchKeyword]);

  const handleSearch = () => {
    setReqPage(1);
    setSearchKeyword(keyword);
  };

  const getSpaceString = (item) => {
    const spaces = [];
    if (item.interiorLiving === 1) spaces.push("거실");
    if (item.interiorKitchen === 1) spaces.push("부엌");
    if (item.interiorBed === 1) spaces.push("침실");
    if (item.interiorOneroom === 1) spaces.push("원룸");
    if (item.interiorKidroom === 1) spaces.push("아이방");
    if (item.interiorStudy === 1) spaces.push("서재");
    return spaces.join(", ");
  };

  return (
    <div className="de-status-wrap">
      <div className="de-status-content">
        <section className="de-status-side-menu">
          <SideMenu menus={menus} />
        </section>

        <div className="de-status-main-content">
          <div className="de-status-chart-wrap">
            {chartData.length > 0 ? (
              <DesignerChart chartData={chartData} />
            ) : (
              <p>차트 데이터를 불러오는 중이거나, 데이터가 없습니다.</p>
            )}
          </div>

          <section className="de-status-main">
            <div className="de-status-title-box">
              <h2 className="de-status-title">작업 진행 현황</h2>
            </div>

            <div className="de-status-search-box">
              <input
                type="text"
                className="de-status-search-input"
                placeholder="고객명으로 검색"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <button
                type="button"
                className="de-status-search-btn"
                onClick={handleSearch}
              >
                검색
              </button>
            </div>

            <table className="de-status-table">
              <thead>
                <tr>
                  <th>고객명</th>
                  <th>공간</th>
                  <th>디자인 범위</th>
                  <th>디자인 이유</th>
                  <th>결제일</th>
                  <th>진행상황</th>
                </tr>
              </thead>
              <tbody>
                {statusList.map((item) => (
                  <tr
                    key={item.interiorNo}
                    className="de-status-clickable-row"
                    onClick={() => {
                      navigate(`/designer/status/detail/${item.interiorNo}`);
                    }}
                  >
                    <td>{item.customerName}</td>
                    <td>{getSpaceString(item)}</td>
                    <td>{getSpaceString(item)}</td>
                    <td>{item.interiorWhy}</td>
                    <td>{item.interiorPaymentDate}</td>
                    <td>{item.interiorStatus === 0 ? "작업중" : "완료"}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="board-paging-wrap">
              {pi && (
                <PageNavigation
                  pi={pi}
                  reqPage={reqPage}
                  setReqPage={setReqPage}
                />
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DesignerStatus;
