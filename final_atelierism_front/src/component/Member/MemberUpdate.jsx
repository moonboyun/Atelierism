import { Link, useNavigate } from "react-router-dom";
import "./member.css";
import DaumPostcode from "react-daum-postcode";
import SideMenu from "../utils/SideMenu";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { loginIdState, memberTypeState } from "../utils/RecoilData";
import axios from "axios";
import Swal from "sweetalert2";
const MemberUpdate = () => {
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const [memberType, setMemberType] = useRecoilState(memberTypeState);
  const [member, setMember] = useState(null);
  const [memberPw, setMemberPw] = useState("");
  const [memberNewPw, setMemberNewPw] = useState("");
  const [memberNewPwRe, setmemberNewPwRe] = useState("");
  const [isAuth, setIsAuth] = useState(false); //현재 비밀번호 입력용
  //const [authChecked, setAuthChecked] = useState(false); //기존 비밀번호가 제대로 입력됐는지 체크
  const [menus, setMenus] = useState([
    //SideMenu에 전송할 state
    { url: "/member/mypage", text: "마이페이지" },
    { url: "/member/update", text: "정보 수정" },
    { url: "/member/payment", text: "결제 내역" },
  ]);
  const inputMemberData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newMember = { ...member, [name]: value };
    setMember(newMember);
  };
  const backServer = import.meta.env.VITE_BACK_SERVER;
  useEffect(() => {
    if (memberId) {
      axios.get(`${backServer}/member/${memberId}`).then((res) => {
        setMember(res.data);
      });
    }
  }, [memberId]);
  const navigate = useNavigate();
  const update = () => {
    const updatedMember = {
      ...member,
    };
    if (memberNewPw.trim() !== "") {
      updatedMember.memberPw = memberNewPw;
    }
    axios
      .patch(`${backServer}/member`, updatedMember)
      .then((res) => {
        if (res.data === 1) {
          Swal.fire({
            title: "정보 수정 완료",
            icon: "success",
          });
        }
        navigate("/member/mypage");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [memberPwRe, setMemberPwRe] = useState("");

  const pwRegMsgRef = useRef(null);
  const checkPwReg = () => {
    pwRegMsgRef.current.classList.remove("valid", "invalid");

    const pwReg =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    if (!pwReg.test(member.memberPw)) {
      pwRegMsgRef.current.classList.add("invalid");
      pwRegMsgRef.current.innerText =
        "비밀번호는 영문, 숫자, 특수문자를 포함한 8~16자여야 합니다.";
    } else {
      pwRegMsgRef.current.classList.add("valid");
      pwRegMsgRef.current.innerText = "사용 가능한 비밀번호입니다.";
    }
  };

  const pwMatchMsgRef = useRef(null);
  const checkPw = () => {
    pwMatchMsgRef.current.classList.remove("valid", "invalid");

    if (memberPwRe === "") return;

    if (member.memberPw === memberPwRe) {
      pwMatchMsgRef.current.classList.add("valid");
      pwMatchMsgRef.current.innerText = "비밀번호가 일치합니다.";
    } else {
      pwMatchMsgRef.current.classList.add("invalid");
      pwMatchMsgRef.current.innerText = "비밀번호가 일치하지 않습니다.";
    }
  };

  const [isModal, setIsModal] = useState(false);
  const [memberAddr, setMemberAddr] = useState({
    zonecode: "",
    address: "",
  });
  const openModal = () => {
    setIsModal(true);
  };
  const closeModal = () => {
    setIsModal(false);
  };
  const onComplete = (data) => {
    setMemberAddr({
      zonecode: data.zonecode,
      address: data.address,
    });
    closeModal();
    setMember({ ...member, memberAddr: data.address });
  };

  const [email, setEmail] = useState("");
  const [mailCode, setMailCode] = useState(null);
  const [inputCode, setInputCode] = useState("");
  const [authMsg, setAuthMsg] = useState("");
  const [authColor, setAuthColor] = useState("black");
  const [isAuthVisible, setIsAuthVisible] = useState(false);
  const [time, setTime] = useState(180); // 3분 = 180초
  const intervalRef = useRef(null);
  const emailReg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

  useEffect(() => {
    if (!isAuthVisible) return;

    // 기존 타이머 정리
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setMailCode(null);
          setAuthMsg("인증시간이 만료되었습니다.");
          setAuthColor("red");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isAuthVisible]);

  const sendCode = async () => {
    try {
      clearInterval(intervalRef.current); // 기존 타이머 중지
      setTime(180); // 3분 초기화
      setIsAuthVisible(true);
      setAuthMsg("");
      const res = await axios.get(
        `${backServer}/member/sendCode?memberEmail=${member.memberEmail}`
      );
      setMailCode(res.data);
    } catch (error) {
      setAuthMsg("인증코드 전송에 실패했습니다.");
      setAuthColor("red");
    }
  };

  const verifyCode = () => {
    if (inputCode === mailCode) {
      setAuthMsg("인증완료");
      setAuthColor("blue");
      clearInterval(intervalRef.current);
      setMailCode(null);
      setTime(0);
    } else {
      setAuthMsg("인증번호를 입력하세요");
      setAuthColor("red");
    }
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <div className="update-wrap">
      <div className="page-title">회원정보 수정</div>
      <section className="side-menu">
        <SideMenu menus={menus} />
      </section>
      {member !== null && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            update();
          }}
        >
          <table className="update-tbl">
            <tbody>
              <tr>
                <th>아이디</th>
                <td>
                  <input
                    type="text"
                    name="memberId"
                    value={memberId}
                    readOnly
                  ></input>
                </td>
              </tr>
              <tr className="sb-check-pw">
                <th>기존 비밀번호</th>
                <td>
                  <input
                    type="password"
                    name="memberPw"
                    value={memberPw}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setMemberPw(e.target.value);
                    }}
                  ></input>
                  <button type="button" onClick={checkPw}>
                    인증하기
                  </button>
                </td>
              </tr>
              <tr>
                <th>새 비밀번호</th>
                <td>
                  <input
                    type="password"
                    name="memberNewPw"
                    value={memberNewPw}
                    onChange={(e) => setMemberNewPw(e.target.value)}
                    onBlur={checkPwReg}
                  ></input>
                  <p className="input-msg" ref={pwRegMsgRef}></p>
                </td>
              </tr>
              <tr>
                <th>새 비밀번호 확인</th>
                <td>
                  <input
                    type="password"
                    name="memberNewPwRe"
                    value={memberNewPwRe}
                    onChange={(e) => setmemberNewPwRe(e.target.value)}
                    onBlur={checkPw}
                  ></input>
                  <p className="input-msg" ref={pwMatchMsgRef}></p>
                </td>
              </tr>
              <tr>
                <th>전화번호</th>
                <td>
                  <input
                    type="text"
                    name="memberPhone"
                    onChange={inputMemberData}
                    value={member.memberPhone}
                  ></input>
                </td>
              </tr>
              <tr className="sb-check-email">
                <th>이메일</th>
                {!isAuthVisible && (
                  <td>
                    <input
                      type="text"
                      name="memberEmail"
                      value={member.memberEmail}
                      onChange={inputMemberData}
                    ></input>
                    <button type="button" onClick={sendCode}>
                      인증번호 받기
                    </button>
                  </td>
                )}
                {isAuthVisible && (
                  <td className="check-email">
                    <input
                      type="text"
                      placeholder="인증번호를 입력해주세요"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      style={{
                        float: "left",
                        fontSize: "15px",
                        marginRight: "5px",
                      }}
                    />
                    {time > 0 && (
                      <p
                        style={{
                          color: "green",
                          float: "left",
                          marginRight: "5px",
                          textAlign: "center",
                          marginTop: "20px",
                        }}
                      >
                        {formatTime(time)}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={verifyCode}
                      style={{ marginTop: "18px" }}
                    >
                      인증하기
                    </button>
                    {authMsg && (
                      <p
                        style={{
                          color: authColor,
                          clear: "both",
                        }}
                      >
                        {authMsg}
                      </p>
                    )}
                  </td>
                )}
              </tr>
              <tr>
                <th>주소</th>
                <td className="update-addr">
                  <input
                    type="text"
                    name="memberAddr"
                    value={member.memberAddr}
                    onChange={inputMemberData}
                  ></input>
                  <button
                    type="button"
                    onClick={openModal}
                    style={{ cursor: "pointer" }}
                  >
                    우편번호 조회
                  </button>
                  {isModal && (
                    <div
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        zIndex: 1000,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          backgroundColor: "white",
                          padding: "20px",
                        }}
                      >
                        <DaumPostcode
                          onComplete={onComplete}
                          onClose={closeModal}
                        />
                        <button onClick={closeModal} className="sb-close-modal">
                          닫기
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <th>상세 주소</th>
                <td>
                  <input
                    type="text"
                    name="memberAddrDetail"
                    value={member.memberAddrDetail}
                    onChange={inputMemberData}
                  ></input>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="update-btn">
            <button type="button">
              <Link to="/member/mypage">취소하기</Link>
            </button>
            <button type="submit">수정하기</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MemberUpdate;
