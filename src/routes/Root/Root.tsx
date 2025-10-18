import { Outlet } from "react-router-dom";
import "./Root.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import TheHeader from "../../components/TheHeader/TheHeader";
import { useLoader } from "../../store/loaderStore";
import Loader from "../../UI/Loader/Loader";

const Root = () => {
    const { isLoading } = useLoader();
    return (
        <main className="app">
            {isLoading && <Loader />}
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
