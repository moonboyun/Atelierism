import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";

const ReviewFrm = (props) => {
  const boardTitle = props.boardTitle;
  const setBoardTitle = props.setBoardTitle;
  const oneLine = props.oneLine;
  const setOneLine = props.setOneLine;
  const thumbnail = props.thumbnail;
  const setThumbnail = props.setThumbnail;
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const [showThumb, setShowThumb] = useState(null);
  const thumbRef = useRef(null);

  // 썸네일 선택 시 미리보기로 표시
  const changeThumbnail = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      setThumbnail(null);
      setShowThumb(null);
      return;
    }
    setThumbnail(files[0]); // 상위 상태에 파일 저장
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => setShowThumb(reader.result);
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
            <img src={showThumb}></img>
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
                    type="text"
                    id="boardTitle"
                    name="boardTitle"
                    value={boardTitle}
                    onChange={(e) => setBoardTitle(e.target.value)}
                    placeholder="제목을 입력해주세요."
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
                    type="text"
                    id="oneLine"
                    name="oneLine"
                    value={oneLine}
                    onChange={(e) => setOneLine(e.target.value)}
                    placeholder="한줄 요약을 입력해주세요."
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
