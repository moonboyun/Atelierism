import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./designer.css";

const DesignerStatusDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const interiorNo = params.interiorNo;

  const [detail, setDetail] = useState(null); // 서버에서 받은 원본 데이터
  const backServer = import.meta.env.VITE_BACK_SERVER;

  // 사용자가 수정할 수 있는 값을 별도의 state로 관리
  const [interiorStatus, setInteriorStatus] = useState(0);
  const [interiorMemo, setInteriorMemo] = useState("");

  useEffect(() => {
    axios
      .get(`${backServer}/designer/status/detail/${interiorNo}`)
      .then((res) => {
        setDetail(res.data);
        // 서버에서 받은 값으로 수정용 state 초기화
        setInteriorStatus(res.data.interiorStatus);
        setInteriorMemo(res.data.interiorMemo);
      })
      .catch((err) => {
        console.error("작업 상세 정보 로딩 실패:", err);
      });
  }, [interiorNo]);

  const handleUpdate = () => {
    const requestData = {
      interiorNo: Number(interiorNo),
      interiorStatus: Number(interiorStatus),
      interiorMemo: interiorMemo,
    };

    axios
      .patch(`${backServer}/designer/status/detail`, requestData)
      .then((res) => {
        if (res.data === 1) {
          Swal.fire({ icon: "success", title: "수정 완료!" });
          // 수정 성공 시, 최신 데이터를 다시 불러오기 위해 페이지를 새로고침하거나
          // 부모 컴포넌트의 상태를 업데이트 해야 하지만, 여기서는 간단히 목록으로 보냅니다.
          navigate("/designer/status");
        }
      })
      .catch((err) => {
        console.error("수정 실패:", err);
        Swal.fire({ icon: "error", title: "수정 중 오류가 발생했습니다." });
      });
  };

  // DTO의 공간 데이터를 화면에 표시할 문자열로 변환하는 함수 (이미지에는 없지만 필요)
  const getSpaceString = (item) => {
    const spaces = [];
    if (item.interiorLiving === 1) spaces.push("거실");
    // ... (나머지 공간들도 필요하다면 추가)
    return spaces.join(", ") || "전체"; // 비어있을 경우 '전체'
  };

  if (detail === null) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="de-status-detail-form-wrap">
      <div className="de-status-detail-form-content">
        <h2 className="de-status-detail-title">작업 진행 현황</h2>

        <table className="de-status-detail-form-table">
          <tbody>
            <tr>
              <th>고객명</th>
              <td>
                <input type="text" value={detail.customerName} readOnly />
              </td>
            </tr>
            <tr>
              <th>공간</th>
              <td>
                <input type="text" value={"거실"} readOnly />
              </td>
            </tr>
            <tr>
              <th>디자인 범위</th>
              <td>
                <input type="text" value={"전체"} readOnly />
              </td>
            </tr>
            <tr>
              <th>디자인 이유</th>
              <td>
                <input type="text" value={detail.interiorWhy} readOnly />
              </td>
            </tr>
            <tr>
              <th>결제일</th>
              <td>
                <input
                  type="text"
                  value={detail.interiorPaymentDate}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <th>진행상황</th>
              <td>
                <select
                  value={interiorStatus}
                  onChange={(e) => setInteriorStatus(e.target.value)}
                >
                  <option value={0}>진행중</option>
                  <option value={1}>진행완료</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>작업메모</th>
              <td>
                <textarea
                  value={interiorMemo}
                  onChange={(e) => setInteriorMemo(e.target.value)}
                  placeholder="간단히 해결, 다만 일부 작업은 조금 까다로웠음"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="de-status-detail-form-buttons">
          <button type="button" className="btn-submit" onClick={handleUpdate}>
            수정
          </button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate(-1)}
          >
            취소
          </button>
          {/* interiorStatus가 1(진행완료)일 때만 '리뷰쓰기' 버튼 표시 */}
          {interiorStatus == 1 && (
            <Link to="/board/designer/write" className="btn-review">
              리뷰쓰기
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesignerStatusDetail;
