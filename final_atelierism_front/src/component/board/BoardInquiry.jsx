import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./inquiry.css";
import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import InteriorApplication from "../interior/InteriorApplication";
import axios from "axios";
import PageNaviGation from "../utils/PageNavigation";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";

const BoardInquiry = () => {
  const faq = [
    {
      q: "결과물은 어디서, 어떻게 받나요?",
      a: "가입해주신 이메일로 디자인 진행 상태를 안내하고있습니다. Atelierism 웹페이지 상단 My Room 또는 앱에서 [내프로젝트]를 선택하여 진행중인 프로젝트 또는 완료된 최종 프로젝트를 확인해주세요!",
    },
    {
      q: "어떤 공간의 컨설팅이 가능할까요?",
      a: "Atelierism 에서는 거실, 다이닝룸, 침실(아이방, 안방, 게스트룸), 서재의 인테리어 컨설팅이 가능합니다. 설계 및 시공이 필요한 주방, 욕실, 붙박이장의 디자인 서비스를 원하신다면 우측 상단 홈 스타일링 신청 버튼을 클릭하시면 담당 디자이너와 함께 컨설팅을 도와드립니다",
    },
    {
      q: "기존 홈스타일링 서비스와 다른점은 무엇인가요?",
      a: "Atelierism 의 인테리어 컨설팅은 온라인에서 제공하는 서비스입니다. 고객님의 거주지역에 관계없이 인테리어 전문 디자이너가 최적의 레이아웃을 찾아주고 새로운 아이템들을 추천드립니다. 시간단위로 컨설팅 비용이 부과되는것이 아니기 때문에 합리적 입니다. 언제든 어디서든 고객님의 요청사항이나 아이디어가 있다면 공유해주세요. 완성된 디자인은 3D로 제공되어 가구및 소품의 배치를 다각도에서 확인하실 수 있고, 고화질의 파노라마를 통해 인테리어가 구현된 모습을 바로 만나보실 수 있습니다.",
    },
    {
      q: "어떤 사람들이 이용하는 서비스인가요?",
      a: "Atelierism은 원하는 비용에 맞춰 홈스타일링 하고 싶으신 분들, 전문가의 도움으로 인테리어 취향을 찾고싶으신 분들 , 3D로 미리 실제사이즈의 가구배치를 해보고 싶으신 분들, 직장이나 육아 등으로 시간이 없으신 분들께서 시숲을 이용하고 계십니다.맞춤 비용, 원하는 컨셉으로 인테리어를 하고 싶으신 분들 전문가의 전문 인테리어를 저렴한 가격으로 배치, 스타일링까지 한번에 추천 받고 싶으신 분들 실사수준의 3D 결과물을 받아보고 싶으신 분들 직장이나 육아 등으로 시간이 없으신 분들 께서 Atelierism을 이용하고 계십니다!",
    },
    {
      q: "결과물은 언제쯤 받아 볼 수 있을까요?",
      a: "고객요청사항 확인 후 7영업일 이내에 1차 결과물 (Smart AI: 1개 레이아웃 / Premium, All-in-One: 2개 레이아웃) 을 받으실 수 있습니다. 구매 상품에 따라 수정 횟수가 달라지며, 하나의 프로젝트를 완성하기까지 평균 2주 정도 소요됩니다.",
    },
    {
      q: "디자이너를 선택 할 수 있나요?",
      a: "네! 원하시는 디자이너를 선택 후 홈 스타일링 신청을 해주세요. 디자이너의 프로필도 확인 가능합니다",
    },
    {
      q: "문의사항은 어디로 연락하나요?",
      a: "이메일로 문의주시거나 상단 1:1문의 게시판에서 글 작성해주시면 됩니다!",
    },
  ];

  const [def, setDef] = useState(1); // 1: FAQ, 2: 1:1 문의
  const [openIdx, setOpenIdx] = useState(null); // 현재 열려있는 질문 인덱스(없으면 null)
  const [pi, setPi] = useState(null); // 페이징 된 번호 응답상태
  const [reqPqge, setReqPage] = useState(1); // 요청할 페이지 번호(기본값1)
  const [inquiryList, setInquiryList] = useState([]);
  const [memberId, setMemberId] = useRecoilState(loginIdState);

  const toggle = (i) => {
    setOpenIdx((prev) => (prev === i ? null : i)); // 같은 걸 다시 누르면 닫힘
  };

  const [isInterior, setIsInterior] = useState(0);
  const [interiorModal, setInteriorModal] = useState(false);
  const [ani, setAni] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACK_SERVER}/board/inquiry?reqPage=${reqPqge}`
      )
      .then((res) => {
        setInquiryList(res.data.inquiryList);
        setPi(res.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPqge]);

  const InteriorApp = () => {
    if (memberId == "") {
      Swal.fire({
        title: "로그인 확인",
        text: "로그인 후 이용 가능합니다.",
        icon: "info",
        reverseButtons: true,
        showCancelButton: true,
        cancelButtonText: "닫기",
        confirmButtonText: "로그인하러 가기",
      }).then((select) => {
        if (select.isConfirmed) {
          navigate("/member/login");
        }
      });
    } else {
      setInteriorModal(true);
    }
  };

  useEffect(() => {
    if (memberId !== "") {
      axios
        .get(`${import.meta.env.VITE_BACK_SERVER}/interior/${memberId}`)
        .then((res) => {
          setIsInterior(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [memberId]);
  const payPage = () => {
    navigate("/interior/payPage");
  };

  return (
    <div className="board-wrap">
      {/* 배경이미지 */}
      <div className="review-hero">
        <div className="hero-inner">
          <img className="title-img" src="/image/image (review).png" />
          <h1 className="hero-title">FAQ & QnA</h1>
        </div>
      </div>

      <section className="section faq-section">
        <div className="faq-container">
          <div className="faq-tabs">
            <button type="button" onClick={() => setDef(1)}>
              자주 묻는 질문
            </button>
            <button type="button" onClick={() => setDef(2)}>
              1:1 문의
            </button>
          </div>

          {/* 탭 내용 */}
          {def === 1 ? (
            <div className="faq-list">
              {faq.map((item, i) => (
                <div key={i} className="faq-item">
                  <button
                    type="button"
                    className="faq-q"
                    onClick={() => toggle(i)}
                  >
                    Q. {item.q}
                  </button>
                  {openIdx === i ? <div className="faq-a">{item.a}</div> : null}
                </div>
              ))}
            </div>
          ) : (
            <div className="qna-box">
              <div className="qna-head">
                <div>1:1 문의 게시판</div>
                {memberId && (
                  <Link to="/board/inquiry/writer" className="btn-primary sm">
                    글 작성
                  </Link>
                )}
              </div>
              <div className="qna-empty">
                <table className="table-wrap">
                  <thead>
                    <tr>
                      <th style={{ width: "5%" }}>번호</th>
                      <th style={{ width: "20%" }}>작성자</th>
                      <th style={{ width: "45%" }}>제목</th>
                      <th style={{ width: "10%" }}>상태</th>
                      <th style={{ width: "15%" }}>작성일</th>
                      <th style={{ width: "10%" }}>공개/비공개</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiryList.map((inquiry, i) => {
                      return (
                        <tr
                          key={"inquiry-" + i}
                          onClick={() => {
                            navigate(
                              `/board/inquiry/view/${inquiry.inquiryBoardNo}`
                            );
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <td>{inquiry.inquiryBoardNo}</td>
                          <td>{inquiry.inquiryBoardWriter}</td>
                          <td>{inquiry.inquiryBoardTitle}</td>
                          {inquiry.adminComment === null ? (
                            <td style={{ border: "1px solid #333333" }}>
                              답변대기
                            </td>
                          ) : (
                            <td
                              style={{
                                border: "1px solid #333333",
                                backgroundColor: "#8AA996",
                                color: "#fff",
                              }}
                            >
                              답변완료
                            </td>
                          )}
                          <td>{inquiry.inquiryBoardDate}</td>
                          {inquiry.inquiryBoardOption === 1 ? (
                            <td>
                              <LockOpenIcon />
                            </td>
                          ) : (
                            <td>
                              <LockIcon />
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        <div className="board-paging-wrap">
          {pi !== null && (
            <PageNaviGation pi={pi} reqPqge={reqPqge} setReqPage={setReqPage} />
          )}
        </div>
      </section>
      {/* 하단 배경 이미지 */}
      <div className="bottom-img-box">
        <div className="hero-inner">
          <img className="bottom-img" src="/image/image (review).png" />
          <h1 className="hero-bottom">Atelierism</h1>
          <h3>
            Atelierism은 여러분의 집과 공간을 위한 최고의 인테리어 디자인을 위해
            노력합니다.
          </h3>
          <div className="btn-bottom-box">
            {isInterior === 0 ? (
              <button className="interior-btn" onClick={InteriorApp}>
                <span>컨설팅 받으러 가기</span>
              </button>
            ) : (
              <button className="interior-btn" onClick={payPage}>
                <div className="interior-btn-box">
                  <span>장바구니</span>
                  <span className="material-symbols-outlined header-shopping-cart">
                    shopping_cart
                  </span>
                </div>
              </button>
            )}
            {interiorModal && (
              <InteriorApplication
                onClose={() => {
                  setInteriorModal(false);
                  setAni(false);
                }}
                ani={ani}
                setAni={setAni}
                setIsInterior={setIsInterior}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardInquiry;
