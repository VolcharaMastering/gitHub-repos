import logo from "../../assets/logo.png";

import { Link } from "react-router-dom";
import "./TheHeader.scss";

const TheHeader: React.FC = () => {
    return (
        <header className="header">
            <Link to="/">
                <img className="header-logo" src={logo} alt="logo"></img>
            </Link>

            <h1 className="main-title">GitHub Repositories Admin</h1>
        </header>
    );
};
export default TheHeader;
