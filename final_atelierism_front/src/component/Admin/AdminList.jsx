import { useState } from "react";

const AdminList = (props) => {
  const pageList = props.data;
  const [listData, setListData] = useState([]);
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
            <tr>
              <th>아이디</th>
              <th>이름</th>
              <th>연락처</th>
              <th>등급</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>user01</td>
              <td>김민수</td>
              <td>010-4564-4371</td>
              <td>일반회원</td>
            </tr>
            <tr>
              <td>user02</td>
              <td>최철용</td>
              <td>010-8421-7544</td>
              <td>일반회원</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminList;
