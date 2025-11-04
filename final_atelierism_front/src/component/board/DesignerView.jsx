import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginIdState, memberTypeState } from "../utils/RecoilData";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./designerView.css";
import Swal from "sweetalert2";

const DesignerView = () => {
  const params = useParams();
  const designerReviewNo = params.designerReviewNo;
  const [designerBoardList, setDesignerBoardList] = useState([]);
  const designerReviewWriter = useRecoilValue(loginIdState);
  const navigate = useNavigate();
  const memberType = useRecoilValue(memberTypeState);
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACK_SERVER
        }/board/designer/view/${designerReviewNo}`
      )
      .then((res) => {
        console.log(res);
        setDesignerBoardList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const removeBoard = () => {
    Swal.fire({
      title: "게시글 삭제",
      text: "게시글을 삭제하시겠습니까?",
      icon: "warning",
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: "닫기",
      confirmButtonText: "삭제하기",
      confirmButtonColor: " #8aa996",
    }).then((select) => {
      if (select.isConfirmed) {
        axios
          .delete(
            `${
              import.meta.env.VITE_BACK_SERVER
            }/board/designer/${designerReviewNo}`
          )
          .then((res) => {
            if (res.data > 0) {
              Swal.fire({
                icon: "success",
                title: "삭제 완료",
                timer: 1200,
                showConfirmButton: false,
              });
              navigate("/board/designer");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div className="designer-view-wrap">
      {/* 헤더 이미지 영역 */}
      <section className="designer-view-header">
        <div className="designer-view-imgbox">
          <img
            className="designer-view-title-img"
            src="/image/designer_board_view_img.png"
          />
          <div className="designer-view-textbox">
            <span className="designer-view-date">
              {designerBoardList.designerReviewDate}
            </span>
            <span className="designer-view-title">
              {designerBoardList.designerReviewTitle}
            </span>
          </div>
        </div>
      </section>

      {/* 작성자 및 카테고리 */}
      <section className="designer-view-userinfo">
        <div className="designer-view-userdata">
          <span className="designer-view-usericon">
            <AccountCircleIcon />
          </span>
          <span className="designer-view-sponser">
            {designerBoardList.interiorCustomer}
          </span>
          <span className="designer-view-oneline">
            {designerBoardList.oneText}
          </span>
          <div className="designer-view-category">
            {(designerBoardList.categoryCsv || "").split(",").map((v, i) => (
              <span key={i} className="designer-view-chip">
                {v.trim()}
              </span>
            ))}
          </div>
          <span className="designer-view-price">
            {"견적 " + designerBoardList.interiorPrice + "원"}
          </span>
        </div>
      </section>

      {/* 본문 컨텐츠 */}
      <section className="designer-view-content">
        <div className="designer-view-mainbox">
          <div className="designer-view-thumb">
            <img
              src={
                designerBoardList.memberThumb !== null
                  ? `${import.meta.env.VITE_BACK_SERVER}/memberProfile/${
                      designerBoardList.memberThumb
                    }`
                  : "/image/default_image.png"
              }
            />
            <span className="designer-view-writer">
              {designerBoardList.designerReviewWriter}
            </span>
          </div>

          <div
            className="designer-view-body ql-editor"
            dangerouslySetInnerHTML={{
              __html: designerBoardList.designerReviewContent || "",
            }}
          />
        </div>
      </section>
      <div className="btn-div">
        {designerReviewWriter === designerBoardList.designerReviewWriter ||
        memberType === 1 ? (
          <button type="button" className="btn-remove" onClick={removeBoard}>
            삭제
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default DesignerView;
