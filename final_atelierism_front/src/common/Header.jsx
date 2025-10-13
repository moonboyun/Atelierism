import { Link } from "react-router-dom";
import "./common.css";
const Header = () => {
  return (
    <header className="header">
      <div>
        <div className="logo">
          <Link to="/">Atelierism</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
