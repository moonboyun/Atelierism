import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./boardDesigner.css";
import PageNaviGation from "../utils/PageNavigation";
import axios from "axios";

const BoardDesigner = () => {
  const [designerBoardList, setDesignerBoardList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState(null);
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const navigate = useNavigate();
  const viewButton = () => {
    navigate("/board/designer/view");
  };

  const [designerData, setDesignerData] = useState(null);
  const params = useParams();
  const interiorNo = params.interiorNo;
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACK_SERVER
        }/board/designer/review? interiorNo=${interiorNo}`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACK_SERVER}/board/designer?reqPage=${reqPage}`
      )
      .then((res) => {
        setDesignerBoardList(res.data.designerBoardList);
        setPi(res.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage]);
  return (
    <div className="board-wrap">
      {/* 상단 이미지 */}
      <section className="image-section">
        <div className="image-div">
          <img className="title-img" src="/image/image (review).png" />
          <h3 className="img-text">Interior Idea</h3>
          <p className="img-text">
            Atelierism은 인테리어를 고민중이지만 시공은 부담스러운 분들을 위한
            비대면 홈스타일링 서비스입니다. 가장 쉬운 홈스타일링 서비스
            Atelierism
          </p>
        </div>
      </section>
      {/* 게시판 컨텐츠 */}
      <section className="main-content-section">
        <div className="post-box">
          <Link to="/board/designer/writer" className="btn-primary lg">
            글 작성
          </Link>
        </div>
        {designerBoardList.map((designer, i) => {
          return (
            <div key={"designer-" + i} className="card-box">
              {/* Before */}
              <div className="before-img-box">
                <img src={designer.beforeImg} />
              </div>
              <div className="center-box">
                <span className="title">Same space, different feeling</span>
                <span className="text">Before & After</span>
                <span className="thumbnail">{designer.designerThumbnail}</span>
                <span className="writer">{designer.designerReviewWriter}</span>
                <span className="one-text">{designer.designerOneText}</span>
                <span className="date">{designer.designerReviewDate}</span>
                <button className="view-btn" onClick={viewButton}>
                  자세히 보러가기 <ArrowForwardIcon />
                </button>
              </div>
              {/* After */}
              <div className="after-box">
                <img src={designer.afterImg} />
              </div>
            </div>
          );
        })}
        {/* 페이징 */}
        <div className="board-paging-wrap">
          {pi !== null && (
            <PageNaviGation pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
          )}
        </div>
      </section>
    </div>
  );
};

export default BoardDesigner;
