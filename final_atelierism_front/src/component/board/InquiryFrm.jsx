import { loginIdState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";

const InquiryFrm = (props) => {
  const boardTitle = props.boardTitle;
  const setBoardTitle = props.setBoardTitle;
  const option = props.option;
  const setOption = props.setOption;
  const inquiryPassword = props.inquiryPassword;
  const setInquiryPassword = props.setInquiryPassword;

  const [memberId, setMemberId] = useRecoilState(loginIdState);

  return (
    <div className="inquiry-top">
      <table className="inquiry-tbl">
        <tbody>
          <tr>
            <th>WRITER</th>
            <td className="readonly">{memberId || "로그인 필요"}</td>
          </tr>

          <tr>
            <th>
              <label htmlFor={boardTitle}>
                TITLE <span className="red">*</span>
              </label>
            </th>
            <td>
              <input
                id={boardTitle}
                type="text"
                placeholder="제목을 입력해주세요"
                value={boardTitle}
                onChange={(e) => setBoardTitle(e.target.value)}
              />
            </td>
          </tr>

          <tr>
            <th>OPTION</th>
            <td>
              <label className="radio">
                <input
                  type="radio"
                  name="opt"
                  value={option}
                  checked={option === 1}
                  onChange={() => setOption(1)}
                />
                공개글
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="opt"
                  value={option}
                  checked={option === 2}
                  onChange={() => setOption(2)}
                />
                비밀글
              </label>
            </td>
          </tr>

          {option === 2 && (
            <tr>
              <th>
                <label htmlFor={inquiryPassword}>
                  PASSWORD <span className="red">*</span>
                </label>
              </th>
              <td>
                <input
                  type="password"
                  placeholder="숫자 4자리만 입력해주세요"
                  value={inquiryPassword}
                  onChange={(e) => {
                    const value = e.target.value;
                    const reg = /^\d{0,4}$/;
                    if (!reg.test(value)) {
                      alert("비밀번호는 숫자 4자리까지만 가능합니다!");
                      return;
                    }
                    setInquiryPassword(value);
                  }}
                  inputMode="numeric"
                  maxLength={4}
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InquiryFrm;
