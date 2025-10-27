import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./designer.css";

const DesignerApplyFrm = () => {
  const memberId = useRecoilValue(loginIdState);
  const navigate = useNavigate();

  const [designerInfo, setDesignerInfo] = useState({
    designerCareer: "",
    designerAge: "",
    designerGraduationDate: "",
    designerGraduation: "",
    designerBank: "",
    designerAccount: "",
    designerPortfolio: "",
    designerChat: "",
    designerIntroduce: "",
  });

  const [careerList, setCareerList] = useState([
    { designerCareerSy: "", designerCareerEy: "", designerCareerCom: "" },
  ]);

  const [awardList, setAwardList] = useState([
    { designerAwardsDete: "", designerAwards: "" },
  ]);

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

  const handleSubmit = () => {
    const filteredCareerList = careerList.filter(
      (item) =>
        item.designerCareerSy !== "" ||
        item.designerCareerEy !== "" ||
        item.designerCareerCom !== ""
    );

    const filteredAwardList = awardList.filter(
      (item) => item.designerAwardsDete !== "" || item.designerAwards !== ""
    );
    const requestData = {
      designerInfo: { ...designerInfo, memberId },
      careerList: filteredCareerList,
      awardList: filteredAwardList,
    };

    const backServer = import.meta.env.VITE_BACK_SERVER;
    axios
      .post(`${backServer}/designer/apply`, requestData)
      .then((res) => {
        if (res.data === 1) {
          Swal.fire({
            title: "신청 완료",
            text: "디자이너 신청이 정상적으로 처리되었습니다.",
            icon: "success",
          });
          navigate("/member/mypage");
        } else {
          Swal.fire({
            title: "신청 실패",
            text: "처리 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "오류 발생",
          text: "서버 통신 중 오류가 발생했습니다.",
          icon: "error",
        });
      });
  };

  return (
    <div className="de-frm-designer-apply-wrap">
      <div className="de-frm-designer-apply-content">
        {/* 경력(년) */}
        <div className="de-frm-form-row">
          <div className="de-frm-form-label">경력(년)</div>
          <div className="de-frm-form-input">
            <input
              type="number"
              name="designerCareer"
              value={designerInfo.designerCareer}
              onChange={handleInfoChange}
              placeholder="예) 6"
            />
          </div>
        </div>

        {/* 나이(age) */}
        <div className="de-frm-form-row">
          <div className="de-frm-form-label">나이</div>
          <div className="de-frm-form-input">
            <input
              type="number"
              name="designerAge"
              value={designerInfo.designerAge}
              onChange={handleInfoChange}
              placeholder="예) 30"
            />
          </div>
        </div>

        {/* 경력사항 */}
        <div className="de-frm-form-row">
          <div className="de-frm-form-label">경력사항</div>
          <div className="de-frm-form-input de-frm-dynamic-list">
            {careerList.map((career, index) => (
              <div key={index} className="de-frm-dynamic-row">
                <input
                  type="text"
                  name="designerCareerSy"
                  value={career.designerCareerSy}
                  onChange={(e) => handleCareerChange(index, e)}
                  placeholder="예) 2020-02"
                />
                <span>~</span>
                <input
                  type="text"
                  name="designerCareerEy"
                  value={career.designerCareerEy}
                  onChange={(e) => handleCareerChange(index, e)}
                  placeholder="예) 2020-02"
                />
                <input
                  type="text"
                  name="designerCareerCom"
                  className="de-frm-company-input"
                  value={career.designerCareerCom}
                  onChange={(e) => handleCareerChange(index, e)}
                  placeholder="예) 아무 회사"
                />
                {careerList.length > 1 && (
                  <button
                    type="button"
                    className="de-frm-btn-remove"
                    onClick={() => removeCareerRow(index)}
                  >
                    삭제
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="de-frm-btn-add"
              onClick={addCareerRow}
            >
              경력 추가
            </button>
          </div>
        </div>

        {/* 학력 */}
        <div className="de-frm-form-row">
          <div className="de-frm-form-label">학력</div>
          <div className="de-frm-form-input de-frm-single-row">
            <input
              type="text"
              name="designerGraduationDate"
              value={designerInfo.designerGraduationDate}
              onChange={handleInfoChange}
              placeholder="예) 2020-02"
            />
            <input
              type="text"
              name="designerGraduation"
              className="de-frm-school-input"
              value={designerInfo.designerGraduation}
              onChange={handleInfoChange}
              placeholder="예) 아무 대학교 학사"
            />
          </div>
        </div>

        {/* 수상내역 */}
        <div className="de-frm-form-row">
          <div className="de-frm-form-label">수상내역</div>
          <div className="de-frm-form-input de-frm-dynamic-list">
            {awardList.map((award, index) => (
              <div key={index} className="de-frm-dynamic-row">
                <input
                  type="text"
                  name="designerAwardsDete"
                  value={award.designerAwardsDete}
                  onChange={(e) => handleAwardChange(index, e)}
                  placeholder="예) 2020-02"
                />
                <input
                  type="text"
                  name="designerAwards"
                  className="de-frm-award-input"
                  value={award.designerAwards}
                  onChange={(e) => handleAwardChange(index, e)}
                  placeholder="예) 아무튼 개최하는 대회 입상"
                />
                {awardList.length > 1 && (
                  <button
                    type="button"
                    className="de-frm-btn-remove"
                    onClick={() => removeAwardRow(index)}
                  >
                    삭제
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="de-frm-btn-add"
              onClick={addAwardRow}
            >
              수상내역 추가
            </button>
          </div>
        </div>

        {/* 은행명 */}
        <div className="de-frm-form-row">
          <div className="de-frm-form-label">은행명</div>
          <div className="de-frm-form-input">
            <input
              type="text"
              name="designerBank"
              value={designerInfo.designerBank}
              onChange={handleInfoChange}
              placeholder="예) 우리 은행"
            />
          </div>
        </div>
        {/* 계좌번호 */}
        <div className="de-frm-form-row">
          <div className="de-frm-form-label">계좌번호</div>
          <div className="de-frm-form-input">
            <input
              type="text"
              name="designerAccount"
              value={designerInfo.designerAccount}
              onChange={handleInfoChange}
              placeholder="예) 111111-1111-1111"
            />
          </div>
        </div>
        {/* 포트폴리오 */}
        <div className="de-frm-form-row">
          <div className="de-frm-form-label">포트폴리오</div>
          <div className="de-frm-form-input">
            <input
              type="text"
              name="designerPortfolio"
              value={designerInfo.designerPortfolio}
              onChange={handleInfoChange}
              placeholder="예) http://www.포폴.com"
            />
          </div>
        </div>
        {/* 오픈채팅 링크 */}
        <div className="de-frm-form-row">
          <div className="de-frm-form-label">오픈채팅 링크</div>
          <div className="de-frm-form-input">
            <input
              type="text"
              name="designerChat"
              value={designerInfo.designerChat}
              onChange={handleInfoChange}
              placeholder="예) https://open.kakao.com/user01"
            />
          </div>
        </div>
        {/* 한줄 소개 */}
        <div className="de-frm-form-row">
          <div className="de-frm-form-label">한줄 소개</div>
          <div className="de-frm-form-input">
            <input
              type="text"
              name="designerIntroduce"
              value={designerInfo.designerIntroduce}
              onChange={handleInfoChange}
              placeholder="예) 자신 있습니다~!!!"
            />
          </div>
        </div>

        {/* 신청/취소 버튼 */}
        <div className="de-frm-form-buttons">
          <button
            type="button"
            className="de-frm-btn-submit"
            onClick={handleSubmit}
          >
            신청
          </button>
          <button
            type="button"
            className="de-frm-btn-cancel"
            onClick={() => navigate(-1)}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesignerApplyFrm;
