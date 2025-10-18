import { Outlet } from "react-router-dom";
import "./Root.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import TheHeader from "../../components/TheHeader/TheHeader";

const Root = () => {
    return (
        <main className="app">
            <TheHeader />
            <section className="main">
                <Sidebar />
                <div className="content">
                    <Outlet />
                </div>
            </section>
        </main>
    );
};
export default Root;
