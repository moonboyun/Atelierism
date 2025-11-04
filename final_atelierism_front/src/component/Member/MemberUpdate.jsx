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
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    if (memberType === 2) {
      // 디자이너가 들어온 경우
      setMenus([
        { url: "/designer/mypage", text: "마이페이지" },
        { url: "/member/update", text: "정보 수정" },
        { url: "/designer/designerInfo", text: "디자이너 정보" },
        { url: "/designer/status", text: "작업 현황" },
      ]);
    } else {
      // 일반 회원인 경우
      setMenus([
        { url: "/member/mypage", text: "마이페이지" },
        { url: "/member/update", text: "정보 수정" },
        { url: "/member/payment", text: "결제 내역" },
      ]);
    }
  }, [memberType]);
  const formatPhoneNumber = (value) => {
    // 문자열 안에 숫자가 아닌 문자들을 모두 제거하는 로직
    //-> /\D/g : 숫자가 아닌 문자(\D) 전체(g) 찾기
    value = value.replace(/\D/g, "");

    if (value.length < 4) return value; // 3자리 이하

    if (value.length < 8) {
      // 전화번호 앞에서 7자리 기준으로 하이픈 한개 포함
      return value.slice(0, 3) + "-" + value.slice(3);
    }

    // 8자리 이상 (010-1234-5678)
    return (
      //문자열(value)의 특정 위치에서 잘라서(slice) 그 사이에 하이픈을 넣는 로직
      value.slice(0, 3) + "-" + value.slice(3, 7) + "-" + value.slice(7, 11)
    );
  };
  const inputMemberData = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    //정보수정 시 전화번호 입력란에 도착하면
    if (name === "memberPhone") {
      // 숫자만 추출해서
      value = value.replace(/\D/g, "");

      // 3자리마다 '-' 삽입하고
      value = formatPhoneNumber(value, 3, "-");

      // 마지막에 '-'가 붙으면 제거
      if (value.endsWith("-")) {
        value = value.slice(0, -1);
      }
    }
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
    const updatedMember = { ...member };

    // 새 비밀번호가 입력되었을 때만 memberPw 필드 추가
    if (memberNewPw.trim() !== "") {
      updatedMember.memberPw = memberNewPw;
    } else {
      delete updatedMember.memberPw; // 없애기
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
        if (member.memberType === 2) {
          navigate("/designer/mypage");
        } else if (member.memberType === 3) {
          navigate("/member/mypage");
        }
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

    if (!pwReg.test(memberNewPw)) {
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
    // ref가 없으면 리턴 (렌더링 아직 안된 경우)
    if (!pwMatchMsgRef.current) return;

    // state 업데이트 반영 후 실행
    setTimeout(() => {
      const msgEl = pwMatchMsgRef.current;

      // 혹시 이전 클래스 남아있으면 제거
      msgEl.classList.remove("valid", "invalid");

      // 값이 비어 있으면 메시지 숨김
      if (!memberNewPwRe) {
        msgEl.innerText = "";
        return;
      }

      // 값 비교
      if (memberNewPw === memberNewPwRe) {
        msgEl.classList.add("valid");
        msgEl.innerText = "비밀번호가 일치합니다.";
      } else {
        msgEl.classList.add("invalid");
        msgEl.innerText = "비밀번호가 일치하지 않습니다.";
      }
    }, 0);
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

  // 사용자가 입력한 이메일 주소를 저장하는 상태
  const [email, setEmail] = useState("");

  // 서버에서 전송된 인증 코드를 저장하는 상태
  // null일 때는 아직 코드가 발급되지 않은 상태
  const [mailCode, setMailCode] = useState(null);

  // 사용자가 직접 입력한 인증번호를 저장하는 상태
  const [inputCode, setInputCode] = useState("");

  // 인증 성공 / 실패 메시지를 저장하는 상태
  const [authMsg, setAuthMsg] = useState("");

  // 인증 메시지 색상
  const [authColor, setAuthColor] = useState("black");

  // 인증번호 입력창을 보여줄지 숨길지 결정하는 상태
  // false면 안 보이고, true면 인증 입력칸이 보임
  const [isAuthVisible, setIsAuthVisible] = useState(false);
  const [time, setTime] = useState(180); // 3분 = 180초

  // setInterval을 제어하기 위한 참조값 (interval ID 저장)
  // useRef는 렌더링이 다시 일어나도 값이 유지됨
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
          setAuthColor("#F67272");
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
      setAuthColor("#F67272");
    }
  };

  const verifyCode = () => {
    if (inputCode === mailCode) {
      setAuthMsg("인증완료");
      setAuthColor("#40C79C");
      clearInterval(intervalRef.current);
      setMailCode(null);
      setTime(0);
    } else {
      setAuthMsg("인증번호를 입력하세요");
      setAuthColor("#F67272");
    }
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };
  const checkCurrentPw = async () => {
    if (!memberPw) {
      Swal.fire({
        icon: "warning",
        title: "기존 비밀번호를 입력해주세요.",
      });
      return;
    }
    try {
      const res = await axios.post(`${backServer}/member/checkPw`, {
        memberId: member.memberId, // 또는 memberId 상태값 사용
        memberPw: memberPw,
      });
      if (res.data === 1) {
        // 보통 1이면 성공, 0이면 실패
        Swal.fire({
          icon: "success",
          title: "비밀번호 인증 성공",
        });
        setIsAuth(true);
      } else {
        Swal.fire({
          icon: "error",
          title: "비밀번호가 일치하지 않습니다.",
        });
        setIsAuth(false);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "서버 오류가 발생했습니다.",
      });
      setIsAuth(false);
    }
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
                      setMemberPw(e.target.value);
                    }}
                  ></input>
                  <button type="button" onClick={checkCurrentPw}>
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
                      style={{ marginTop: "18px", cursor: "pointer" }}
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
              <Link
                to={
                  member.memberType === 3
                    ? "/member/mypage"
                    : member.memberType === 2
                    ? "/designer/mypage"
                    : ""
                }
              >
                취소하기
              </Link>
            </button>
            <button type="submit">수정하기</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MemberUpdate;
