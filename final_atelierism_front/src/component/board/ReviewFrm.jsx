import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";

const ReviewFrm = (props) => {
  // 상위(ReviewWriter)에서 내려준 상태/세터 꺼내기
  const boardTitle = props.boardTitle;
  const setBoardTitle = props.setBoardTitle;
  const oneLine = props.oneLine;
  const setOneLine = props.setOneLine;
  const thumbnail = props.thumbnail;
  const setThumbnail = props.setThumbnail;
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const [showThumb, setShowThumb] = useState(null); // 썸네일 미리보기용 DataURL
  const thumbRef = useRef(null); // 숨은 파일 input 접근 ref

  // 썸네일 선택 시 미리보기로 표시
  const changeThumbnail = (e) => {
    const files = e.target.files; // 선택된 파일 리스트
    if (!files || files.length === 0) {
      setThumbnail(null); // 상위 상태 초기화
      setShowThumb(null); // 미리보기 제거
      return;
    }
    setThumbnail(files[0]); // 상위 상태에 파일 저장
    const reader = new FileReader(); // 파일→DataURL 변환 객체
    reader.readAsDataURL(files[0]); // 변환 시작
    reader.onloadend = () => setShowThumb(reader.result); // 변환 끝 → 미리보기 갱신
  };

  return (
    <div className="review-top">
      <div className="board-thumb-wrap">
        <div
          className="thumb-box"
          onClick={() => {
            thumbRef.current.click();
          }}
          role="button"
          aria-label="thumbnail-uploader"
        >
          {showThumb ? (
            <img src={showThumb} alt="thumbnail"></img>
          ) : (
            <div className="thumb-placeholder">이미지 추가</div>
          )}
        </div>
        <input
          ref={thumbRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={changeThumbnail}
        />
      </div>
      <div className="board-info-wrap">
        <table className="tbl">
          <tbody>
            {/* 제목 */}
            <tr>
              <th>
                <label htmlFor="boardTitle">제목</label>
              </th>
              <td>
                <div className="input-item">
                  <input
                    type="text" // 텍스트 입력
                    id="boardTitle" // 라벨 연결 id
                    name="boardTitle" // 폼 이름
                    value={boardTitle} // 현재 값
                    onChange={(e) => setBoardTitle(e.target.value)} // 변경 반영
                    placeholder="제목을 입력해주세요." // 안내 텍스트
                  />
                </div>
              </td>
            </tr>

            {/* 작성자 */}
            <tr>
              <th>작성자</th>
              <td className="writer">{memberId}</td>
            </tr>

            {/* 한줄평 */}
            <tr>
              <th>
                <label htmlFor="oneLine">한줄평</label>
              </th>
              <td>
                <div className="input-item">
                  <input
                    type="text" // 텍스트 입력
                    id="oneLine" // 라벨 연결 id
                    name="oneLine" // 폼 이름
                    value={oneLine} // 현재 값
                    onChange={(e) => setOneLine(e.target.value)} // 변경 반영
                    placeholder="한줄 요약을 입력해주세요." // 안내 텍스트
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewFrm;
