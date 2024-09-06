import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import '../myCSS.css';

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-content">
        <h1 className="header-title">
          Bienvenue dans l'application de gestion du patrimoine
        </h1>

        <div className="button-group">
          <Link to="/patrimoine" className="btn btn-primary">
            SEE PATRIMOINE CHART
          </Link>
          <Link to="/possession" className="btn btn-primary">
            SEE POSSESSION TABLE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
