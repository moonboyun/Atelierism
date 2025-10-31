import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./designer.css";

const DesignerInfoUpdate = () => {
  const designerId = useRecoilValue(loginIdState);
  const navigate = useNavigate();
  const backServer = import.meta.env.VITE_BACK_SERVER;

  const [designerInfo, setDesignerInfo] = useState(null);
  const [careerList, setCareerList] = useState([]);
  const [awardList, setAwardList] = useState([]);

  useEffect(() => {
    if (designerId) {
      axios
        .get(`${backServer}/designer/detail/${designerId}`)
        .then((res) => {
          setDesignerInfo(res.data);
          setCareerList(res.data.careerList || []);
          setAwardList(res.data.awardList || []);
        })
        .catch((err) => {
          console.error("정보 로딩 실패:", err);
        });
    }
  }, [designerId]);

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    const processedValue =
      name === "designerCareer" || name === "designerAge"
        ? parseInt(value) || 0
        : value;
    setDesignerInfo({ ...designerInfo, [name]: processedValue });
  };

  const handleCareerChange = (index, e) => {
    const { name, value } = e.target;
    const newCareerList = [...careerList];
    newCareerList[index][name] = value;
    setCareerList(newCareerList);
  };

  const addCareerRow = () => {
    setCareerList([
      ...careerList,
      { designerCareerSy: "", designerCareerEy: "", designerCareerCom: "" },
    ]);
  };

  const removeCareerRow = (index) => {
    const newCareerList = careerList.filter((_, i) => i !== index);
    setCareerList(newCareerList);
  };

  const handleAwardChange = (index, e) => {
    const { name, value } = e.target;
    const newAwardList = [...awardList];
    newAwardList[index][name] = value;
    setAwardList(newAwardList);
  };

  const addAwardRow = () => {
    setAwardList([
      ...awardList,
      { designerAwardsDete: "", designerAwards: "" },
    ]);
  };

  const removeAwardRow = (index) => {
    const newAwardList = awardList.filter((_, i) => i !== index);
    setAwardList(newAwardList);
  };

  const handleUpdate = () => {
    const filteredCareerList = careerList.filter(
      (item) =>
        item.designerCareerSy || item.designerCareerEy || item.designerCareerCom
    );
    const filteredAwardList = awardList.filter(
      (item) => item.designerAwardsDete || item.designerAwards
    );

    const requestData = {
      designerInfo: { ...designerInfo },
      careerList: filteredCareerList,
      awardList: filteredAwardList,
    };

    axios
      .post(`${backServer}/designer/info/update`, requestData)
      .then((res) => {
        if (res.data > 0) {
          Swal.fire({ icon: "success", title: "정보가 수정되었습니다." });
          navigate("/designer/designerInfo");
        }
      })
      .catch((err) => {
        console.error("수정 실패:", err);
        Swal.fire({ icon: "error", title: "수정 중 오류가 발생했습니다." });
      });
  };

  if (designerInfo === null) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="de-info-update-wrap">
      <div className="de-info-update-content">
        <h2 className="de-info-update-title">디자이너 정보 수정</h2>

        {/* 경력(년) */}
        <div className="de-info-update-form-row">
          <div className="de-info-update-form-label">경력(년)</div>
          <div className="de-info-update-form-input">
            <input
              type="number"
              name="designerCareer"
              value={designerInfo.designerCareer}
              onChange={handleInfoChange}
            />
          </div>
        </div>

        {/* 나이 */}
        <div className="de-info-update-form-row">
          <div className="de-info-update-form-label">나이</div>
          <div className="de-info-update-form-input">
            <input
              type="number"
              name="designerAge"
              value={designerInfo.designerAge}
              onChange={handleInfoChange}
            />
          </div>
        </div>

        {/* 경력사항 */}
        <div className="de-info-update-form-row">
          <div className="de-info-update-form-label">경력사항</div>
          <div className="de-info-update-form-input de-info-update-dynamic-list">
            {careerList.map((career, index) => (
              <div key={index} className="de-info-update-dynamic-row">
                <input
                  type="text"
                  name="designerCareerSy"
                  value={career.designerCareerSy}
                  onChange={(e) => handleCareerChange(index, e)}
                />
                <span>~</span>
                <input
                  type="text"
                  name="designerCareerEy"
                  value={career.designerCareerEy}
                  onChange={(e) => handleCareerChange(index, e)}
                />
                <input
                  type="text"
                  name="designerCareerCom"
                  className="de-info-update-company-input"
                  value={career.designerCareerCom}
                  onChange={(e) => handleCareerChange(index, e)}
                />
                {careerList.length > 1 && (
                  <button
                    type="button"
                    className="de-info-update-btn-remove"
                    onClick={() => removeCareerRow(index)}
                  >
                    삭제
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="de-info-update-btn-add"
              onClick={addCareerRow}
            >
              경력 추가
            </button>
          </div>
        </div>

        {/* 학력 */}
        <div className="de-info-update-form-row">
          <div className="de-info-update-form-label">학력</div>
          <div className="de-info-update-form-input de-info-update-single-row">
            <input
              type="text"
              name="designerGraduationDate"
              value={designerInfo.designerGraduationDate}
              onChange={handleInfoChange}
            />
            <input
              type="text"
              name="designerGraduation"
              className="de-info-update-school-input"
              value={designerInfo.designerGraduation}
              onChange={handleInfoChange}
            />
          </div>
        </div>

        {/* 수상내역 */}
        <div className="de-info-update-form-row">
          <div className="de-info-update-form-label">수상내역</div>
          <div className="de-info-update-form-input de-info-update-dynamic-list">
            {awardList.map((award, index) => (
              <div key={index} className="de-info-update-dynamic-row">
                <input
                  type="text"
                  name="designerAwardsDete"
                  value={award.designerAwardsDete}
                  onChange={(e) => handleAwardChange(index, e)}
                />
                <input
                  type="text"
                  name="designerAwards"
                  className="de-info-update-award-input"
                  value={award.designerAwards}
                  onChange={(e) => handleAwardChange(index, e)}
                />
                {awardList.length > 1 && (
                  <button
                    type="button"
                    className="de-info-update-btn-remove"
                    onClick={() => removeAwardRow(index)}
                  >
                    삭제
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="de-info-update-btn-add"
              onClick={addAwardRow}
            >
              수상내역 추가
            </button>
          </div>
        </div>

        {/* 은행명 */}
        <div className="de-info-update-form-row">
          <div className="de-info-update-form-label">은행명</div>
          <div className="de-info-update-form-input">
            <input
              type="text"
              name="designerBank"
              value={designerInfo.designerBank}
              onChange={handleInfoChange}
            />
          </div>
        </div>

        {/* 계좌번호 */}
        <div className="de-info-update-form-row">
          <div className="de-info-update-form-label">계좌번호</div>
          <div className="de-info-update-form-input">
            <input
              type="text"
              name="designerAccount"
              value={designerInfo.designerAccount}
              onChange={handleInfoChange}
            />
          </div>
        </div>

        {/* 포트폴리오 */}
        <div className="de-info-update-form-row">
          <div className="de-info-update-form-label">포트폴리오</div>
          <div className="de-info-update-form-input">
            <input
              type="text"
              name="designerPortfolio"
              value={designerInfo.designerPortfolio}
              onChange={handleInfoChange}
            />
          </div>
        </div>

        {/* 오픈채팅 링크 */}
        <div className="de-info-update-form-row">
          <div className="de-info-update-form-label">오픈채팅 링크</div>
          <div className="de-info-update-form-input">
            <input
              type="text"
              name="designerChat"
              value={designerInfo.designerChat}
              onChange={handleInfoChange}
            />
          </div>
        </div>

        {/* 한줄 소개 */}
        <div className="de-info-update-form-row">
          <div className="de-info-update-form-label">한줄 소개</div>
          <div className="de-info-update-form-input">
            <input
              type="text"
              name="designerIntroduce"
              value={designerInfo.designerIntroduce}
              onChange={handleInfoChange}
            />
          </div>
        </div>

        <div className="de-info-update-form-buttons">
          <button
            type="button"
            className="de-info-update-btn-submit"
            onClick={handleUpdate}
          >
            수정완료
          </button>
          <button
            type="button"
            className="de-info-update-btn-cancel"
            onClick={() => navigate(-1)}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesignerInfoUpdate;
