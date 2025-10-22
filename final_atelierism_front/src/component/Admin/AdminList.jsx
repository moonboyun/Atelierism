import axios from "axios";
import { useEffect, useState } from "react";

const AdminList = (props) => {
  const backServer = import.meta.env.VITE_BACK_SERVER;
  const pageList = props.data;
  const [listData, setListData] = useState([]);
  useEffect(() => {
    axios
      .get(`${backServer}/admin/adminList`, {
        params: {
          pageList: pageList,
        },
      })
      .then((res) => {
        console.log(res);
        setListData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="admin-list-all-wrap">
      <div className="admin-list-title">
        {pageList === 1 ? (
          <h2>회원 리스트</h2>
        ) : pageList === 2 ? (
          <h2>디자이너 리스트</h2>
        ) : (
          <h2>신청자 리스트</h2>
        )}
        {pageList === 1 ? (
          <select className="admin-select-box">
            <option>최신순</option>
            <option>오래된순</option>
          </select>
        ) : pageList === 2 ? (
          <select className="admin-select-box">
            <option>최근 3개월</option>
            <option>최근 6개월</option>
            <option>역대 최고매출</option>
          </select>
        ) : (
          <select className="admin-select-box">
            <option>수락됨</option>
            <option>반려됨</option>
            <option>대기중</option>
          </select>
        )}
      </div>
      <div className="admin-list-content">
        <table className="admin-list-table">
          <thead>
            {pageList === 1 ? (
              <tr>
                <th>아이디</th>
                <th>이름</th>
                <th>연락처</th>
                <th>등급</th>
              </tr>
            ) : pageList === 2 ? (
              <tr>
                <th>이름</th>
                <th>전화번호</th>
                <th>금월매출액</th>
                <th>매출성적</th>
              </tr>
            ) : (
              <tr>
                <th>신청자명</th>
                <th>신청일</th>
                <th>경력</th>
                <th>상태</th>
              </tr>
            )}
          </thead>
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
        </table>
      </div>
    </div>
  );
};

export default AdminList;
