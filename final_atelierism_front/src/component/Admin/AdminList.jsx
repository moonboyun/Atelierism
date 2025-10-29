import axios from "axios";
import { useEffect, useState } from "react";
import PageNaviGation from "../utils/PageNavigation";
import { Link } from "react-router-dom";

const AdminList = (props) => {
  const data = props.data; //처음에 data로만 선언
  const backServer = import.meta.env.VITE_BACK_SERVER;
  const [memOrder, setMemOrder] = useState(null); //state에 처음에는 null 세팅
  // m1: member 최신순, m2 : member오래된순
  // a1: 신청자 대기만, a2: 신청자 반려만, a3: 신청자 수락만
  // d1: 최근 3개월, d2: 최근 6개월, d3: 역대최고매출
  const [listData, setListData] = useState([]); //회원들의 리스트
  const [reqPage, setReqPage] = useState(1); // 요청할 페이지 번호(기본값1)
  const [pi, setPi] = useState(null); // 페이징 된 번호 응답상태
  //값을 가져오는 axios
  useEffect(() => {
    /*처음에 돌아가는 useEffect에서는 state가 null이니까 return으로 돌아가지 않음*/
    if (memOrder === null) {
      return;
    }
    /*위의 if를 통과하면 axios가 돌아가면서 내부 데이터를 서치해옴*/
    axios
      .get(
        `${
          import.meta.env.VITE_BACK_SERVER
        }/admin?reqPage=${reqPage}&memOrder=${memOrder}`
      )
      .then((res) => {
        setPi(res.data.pi);
        setListData(res.data.reqList);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      console.log("언마운트");
    };
  }, [reqPage, memOrder]);
  useEffect(() => {
    /*위에서 안 돌고 내려오면 이 useEffect가 돌아감, 여기서 setMemOrder가 돌아가서 위에 useEffect가 다시 돌아감*/
    setMemOrder(data);
  }, [data]);

  return (
    <div className="admin-list-all-wrap" key={"data-tb-" + props.data}>
      <div className="admin-list-title">
        {memOrder === "m1" || memOrder === "m2" ? (
          <h2 key={"mm"}>회원 리스트</h2>
        ) : memOrder === "d1" || memOrder === "d2" || memOrder === "d3" ? (
          <h2 key={"dd"}>디자이너 리스트</h2>
        ) : (
          <h2 key={"aa"}>신청자 리스트</h2>
        )}
        {memOrder === "m1" || memOrder === "m2" ? (
          <select
            className="admin-select-box"
            onChange={(e) => {
              setMemOrder(e.target.value);
              setReqPage(1);
            }}
          >
            <option value={"m1"}>최신순</option>
            <option value={"m2"}>오래된순</option>
          </select>
        ) : memOrder === "d1" || memOrder === "d2" || memOrder === "d3" ? (
          <select
            className="admin-select-box"
            onChange={(e) => {
              setMemOrder(e.target.value);
              setReqPage(1);
            }}
          >
            <option value={"d1"}>최근 3개월</option>
            <option value={"d2"}>최근 6개월</option>
            <option value={"d3"}>역대 최고매출</option>
          </select>
        ) : (
          <select
            className="admin-select-box"
            onChange={(e) => {
              setMemOrder(e.target.value);
              setReqPage(1);
            }}
          >
            <option value={"a1"}>대기중</option>
            <option value={"a2"}>수락됨</option>
            <option value={"a3"}>반려됨</option>
          </select>
        )}
      </div>
      <div className="admin-list-content">
        <table className="admin-list-table">
          <thead>
            {memOrder === "m1" || memOrder === "m2" ? (
              <tr>
                <th>아이디</th>
                <th>이름</th>
                <th>연락처</th>
                <th>등급</th>
              </tr>
            ) : memOrder === "d1" || memOrder === "d2" || memOrder === "d3" ? (
              <tr>
                <th>이름</th>
                <th>전화번호</th>
                <th>금월매출액</th>
                <th>매출성적</th>
              </tr>
            ) : (
              <tr>
                <th>신청자명</th>
                <th>전화번호</th>
                <th>경력</th>
                <th>상태</th>
              </tr>
            )}
          </thead>
          {memOrder === "m1" || memOrder === "m2" ? (
            <tbody>
              {listData.map((list, i) => {
                return (
                  <tr key={"listData-" + i}>
                    <td>{list.memberId}</td>
                    <td>{list.memberName}</td>
                    <td>{list.memberPhone}</td>
                    {list.memberType === 3 && <td>일반회원</td>}
                  </tr>
                );
              })}
            </tbody>
          ) : memOrder === "d1" || memOrder === "d2" || memOrder === "d3" ? (
            <tbody>
              {listData.map((list, i) => {
                return (
                  <tr key={"listData-" + i}>
                    <td>{list.memberId}</td>
                    <td>{list.memberName}</td>
                    <td>{list.memberPhone}</td>
                    {list.memberType === 3 && <td>일반회원</td>}
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody>
              {listData.map((list, i) => {
                return (
                  <tr key={"listData-" + i}>
                    <td>
                      <Link to={"/admin/applicantDetail/" + list.memberId}>
                        {list.memberName}
                      </Link>
                    </td>
                    <td>{list.memberPhone}</td>
                    <td>{list.designerCareer}년</td>
                    {list.designerEnter === 0 ? (
                      <td>대기중</td>
                    ) : list.designerEnter === 1 ? (
                      <td>수락됨</td>
                    ) : (
                      <td>반려됨</td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
      {/* 페이징 */}
      <div className="board-paging-wrap">
        {pi !== null && (
          <PageNaviGation pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
        )}
      </div>
    </div>
  );
};

export default AdminList;
