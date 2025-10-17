import { useId } from "react";

const InquiryFrm = ({
  memberId,
  title,
  setTitle,
  option,
  setOption,
  password,
  setPassword,
  content,
  setContent,
}) => {
  // label-for 연결용 id
  const titleId = useId();
  const pwId = useId();
  const taId = useId();

  return (
    <div className="inquiry-top">
      <table className="inquiry-tbl">
        <tbody>
          <tr>
            <th>WRITER *</th>
            <td className="readonly">{memberId || "로그인 필요"}</td>
          </tr>

          <tr>
            <th>
              <label htmlFor={titleId}>TITLE *</label>
            </th>
            <td>
              <input
                id={titleId}
                type="text"
                placeholder="제목을 입력해주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                  value="secret"
                  checked={option === "secret"}
                  onChange={() => setOption("secret")}
                />
                비밀글
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="opt"
                  value="public"
                  checked={option === "public"}
                  onChange={() => setOption("public")}
                />
                공개글
              </label>
            </td>
          </tr>

          {option === "secret" && (
            <tr>
              <th>
                <label htmlFor={pwId}>PASSWORD *</label>
              </th>
              <td>
                <input
                  id={pwId}
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </td>
            </tr>
          )}

          <tr className="no-border">
            <th>
              <label htmlFor={taId}>CONTENT *</label>
            </th>
            <td>
              <textarea
                id={taId}
                placeholder="내용을 입력해주세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InquiryFrm;
