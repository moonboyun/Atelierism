import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
const PageNaviGation = (props) => {
  const pi = props.pi;
  const reqPage = props.reqPage;
  const setReqPage = props.setReqPage;
  //paging을 하는 JSX가 저장될 배열
  const arr = new Array();
  // arr 에 들어가는 값들은 << < > >> 모양들임
  //제일앞으로(1페이지로 이동)
  arr.push(
    <li key="first-page">
      <span
        className="material-icons page-item"
        onClick={() => {
          setReqPage(1);
        }}
      >
        <FirstPageIcon />
      </span>
    </li>
  );

  //이전페이지(현재 요청페이지보다 -1인 페이지)
  arr.push(
    <li key="prev-page">
      <span
        className="material-icons page-item"
        onClick={() => {
          //reqPage가 1이 아닐때만 -1 작동
          if (reqPage !== 1) {
            setReqPage(reqPage - 1);
          }
        }}
      >
        <NavigateBeforeIcon />
      </span>
    </li>
  );

  //페이지 숫자
  let pageNo = pi.pageNo;
  for (let i = 0; i < pi.pageNaviSize; i++) {
    arr.push(
      <li key={"page-" + i}>
        <span
          className={pageNo === reqPage ? "page-item active-page" : "page-item"}
          onClick={(e) => {
            //클릭한 텍스트의 변수 값
            const pageNumber = e.target.innerText;
            setReqPage(Number(pageNumber));
          }}
        >
          {pageNo}
        </span>
      </li>
    );
    pageNo++;
    if (pageNo > pi.totalPage) {
      break;
    }
  }
  //다음페이지(reqPage + 1)
  arr.push(
    <li key="next-page">
      <span
        className="material-icons page-item"
        onClick={() => {
          if (reqPage !== pi.totalPage) {
            setReqPage(reqPage + 1);
          }
        }}
      >
        <NavigateNextIcon />
      </span>
    </li>
  );
  //제일뒤로(마지막페이지로 -> totalPage)
  arr.push(
    <li key="last-page">
      <span
        className="material-icons page-item"
        onClick={() => {
          setReqPage(pi.totalPage);
        }}
      >
        <LastPageIcon />
      </span>
    </li>
  );
  return <ul className="pagination">{arr}</ul>;
};

export default PageNaviGation;
