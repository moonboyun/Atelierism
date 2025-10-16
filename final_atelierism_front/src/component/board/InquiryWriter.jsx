import { useState } from "react";
import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import { Link, useNavigate } from "react-router-dom";
import "./inquiry.css";

const InquiryWriter = () => {
  const [memberId] = useRecoilState(loginIdState);

  const [title, setTitle] = useState("");
  const [option, setOption] = useState("public"); // "public" | "secret"
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");

  const nav = useNavigate();

  const submit = () => {
    // TODO: 서버 연동 자리
    if (!title.trim()) return alert("제목을 입력해주세요.");
    if (option === "secret" && !password.trim()) {
      return alert("비밀글 비밀번호를 입력해주세요.");
    }
    if (!content.trim()) return alert("내용을 입력해주세요.");

    alert("등록되었습니다. (더미)");
    nav("/board/inquiry");
  };

  return (
    <section className="section inquiry-writer-wrap">
      <div className="page-title">Writing</div>

      <div className="inquiry-card">
        <table className="inquiry-tbl">
          <tbody>
            <tr>
              <th>WRITER *</th>
              <td className="readonly">{memberId || "로그인 필요"}</td>
            </tr>

            <tr>
              <th>TITLE *</th>
              <td>
                <input
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
                <th>PASSWORD *</th>
                <td>
                  <input
                    type="password"
                    placeholder="비밀번호를 입력해주세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </td>
              </tr>
            )}

            <tr className="no-border">
              <th>CONTENT *</th>
              <td>
                <textarea
                  placeholder="내용을 입력해주세요"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="writer-btns">
          <Link to="/board/inquiry" className="btn ghost">
            취소
          </Link>
          <button type="button" className="btn solid" onClick={submit}>
            Upload
          </button>
        </div>
      </div>
    </section>
  );
};

export default InquiryWriter;
