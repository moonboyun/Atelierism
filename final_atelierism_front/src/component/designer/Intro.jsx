import React, { useEffect, useState } from "react";
import axios from "axios";
import "./designer.css";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoginState } from "../utils/RecoilData";
import PageNavigation from "../utils/PageNavigation";

const Intro = () => {
  const backServer = import.meta.env.VITE_BACK_SERVER;
  const [designerList, setDesignerList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState(null);
  const isLogin = useRecoilValue(isLoginState);

  useEffect(() => {
    axios
      .get(`${backServer}/designer/list?reqPage=${reqPage}`)
      .then((res) => {
        setDesignerList(res.data.designerList);

        setPi(res.data.pi);
      })
      .catch((err) => {
        console.error("디자이너 목록을 불러오는 데 실패했습니다:", err);
      });
  }, [reqPage]);

  return (
    <div className="de-intro-container">
      <div className="de-intro-header">
        <h2 className="de-intro-title">디자이너 소개</h2>
      </div>

      <div className="de-post-card-grid">
        {designerList.map((designer, index) => {
          return (
            <Link
              to={`/designer/detail/${designer.memberId}`}
              className="de-post-card"
              key={"designer-" + index}
            >
              <div className="de-card-image-wrapper">
                <img
                  src={
                    designer.memberThumb
                      ? `${backServer}/member/profile/${designer.memberThumb}`
                      : "/image/default_image.png"
                  }
                  alt={`${designer.memberName} 디자이너 프로필`}
                />
              </div>
              <div className="de-card-bottom">
                <p className="de-designer-name">{designer.memberName}</p>
                <h3 className="de-card-title">{designer.designerIntroduce}</h3>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="board-paging-wrap">
        {pi && (
          <PageNavigation pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
        )}
      </div>

      {/* <div className="de-write-btn-wrap">
        {isLogin && (
          <Link to="/board/write" className="de-write-btn">
            글쓰기
          </Link>
        )}
      </div> */}
    </div>
  );
};

export default Intro;
