import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./designer.css";

const DesignerStatusDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const interiorNo = params.interiorNo;

  const [detail, setDetail] = useState(null);
  const backServer = import.meta.env.VITE_BACK_SERVER;

  const [interiorStatus, setInteriorStatus] = useState(0);
  const [interiorMemo, setInteriorMemo] = useState("");
  const [range, setRange] = useState("");

  useEffect(() => {
    axios
      .get(`${backServer}/designer/status/detail/${interiorNo}`)
      .then((res) => {
        setDetail(res.data);
        setInteriorStatus(res.data.interiorStatus);
        setInteriorMemo(res.data.interiorMemo || "");
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
      .post(`${backServer}/designer/status/detail/update`, requestData)
      .then((res) => {
        if (res.data === 1) {
          Swal.fire({ icon: "success", title: "수정 완료!" });
          navigate("/designer/status");
        }
      })
      .catch((err) => {
        console.error("수정 실패:", err);
        Swal.fire({ icon: "error", title: "수정 중 오류가 발생했습니다." });
      });
  };

  const getSpaceString = (item) => {
    if (!item) return "";

    const spaces = [];
    if (item.interiorLiving === 1) spaces.push("거실");
    if (item.interiorKitchen === 1) spaces.push("부엌");
    if (item.interiorBed === 1) spaces.push("침실");
    if (item.interiorOneroom === 1) spaces.push("원룸");
    if (item.interiorKidroom === 1) spaces.push("아이방");
    if (item.interiorStudy === 1) spaces.push("서재");

    if (spaces.length === 0) {
      return "정보 없음";
    }

    return spaces.join(", ");
  };
  useEffect(() => {
    if (!detail || detail.interiorRange == null) return;
    if (detail.interiorRange === 1) {
      setRange("공간을 완전히 새롭게 꾸미고 싶어요.");
    }
    if (detail.interiorRange === 2) {
      setRange("몇가지 가구를 유지하고 꾸미고 싶어요.");
    }
    if (detail.interiorRange === 3) {
      setRange("가구는 다 유지하고 배치와 소품 위주로 제안 받고 싶어요.");
    }
  }, [detail]);

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
                {console.log(detail)}
                <input type="text" value={detail.customerName} readOnly />
              </td>
            </tr>
            <tr>
              <th>공간</th>
              <td>
                <input type="text" value={getSpaceString(detail)} readOnly />
              </td>
            </tr>
            <tr>
              <th>디자인 범위</th>
              <td>
                <input type="text" value={range} readOnly />
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
          {interiorStatus == 1 && (
            <Link
              to={`/board/designer/writer/${detail.interiorNo}`}
              className="btn-review"
            >
              리뷰쓰기
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesignerStatusDetail;
