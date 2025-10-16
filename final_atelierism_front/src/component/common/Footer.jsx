const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <p>Atelierism</p>
        <div className="foo-info-box">
          <span>서비스약관</span>
          <span>개인정보정책</span>
          <span>회사소개</span>
          <span>채용정보</span>
          <span>디자이너 제휴신청</span>
        </div>
        <div className="foo-atelierism-info">
          <table className="foo-tbl">
            <tbody>
              <tr>
                <th>CEO</th>
                <td>문보윤</td>
              </tr>
              <tr>
                <th>주소</th>
                <td>서울특별시 영등포구 당산동6가 311-1 이레빌딩 19층</td>
              </tr>
              <tr>
                <th>사업자 번호</th>
                <td>012-34-56789</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div className="foo-inquiry-info">
          <p>고객 문의</p>
          <p>02-1234-1234</p>
        </div>
        <div className="foo-customer-info">
          <p>interior@Atelierism.com</p>
          <p>09:00 am ~ 18:00 pm</p>
          <p>휴무 | 토 일</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
