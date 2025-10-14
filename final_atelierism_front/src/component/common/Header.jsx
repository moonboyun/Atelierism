import { Link } from "react-router-dom";
import "./common.css";
const Header = () => {
  return (
    <header className="header">
      <div>
        <div className="logo">
          <Link to="/">Atelierism</Link>
        </div>
        <MainNavi />
      </div>
    </header>
  );
};
const MainNavi = () => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="#">메뉴1</Link>
        </li>
        <li>
          <Link to="#">메뉴2</Link>
        </li>
        <li>
          <Link to="#">메뉴3</Link>
        </li>
        <li>
          <Link to="#">메뉴4</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Header;
