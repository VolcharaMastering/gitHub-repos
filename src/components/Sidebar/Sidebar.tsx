import { NavLink } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar: React.FC = () => {
    return (
        <nav className="sidebar">
            <NavLink to="/" className={({ isActive }) => `link${isActive ? " active" : ""}`}>
                Settings
            </NavLink>
            <NavLink
                to="/repositories"
                className={({ isActive }) => `link${isActive ? " active" : ""}`}
            >
                Repositories
            </NavLink>
        </nav>
    );
};
export default Sidebar;
