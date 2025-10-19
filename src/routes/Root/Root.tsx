import { Outlet } from "react-router-dom";
import "./Root.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import TheHeader from "../../components/TheHeader/TheHeader";
import { useLoader } from "../../store/loaderStore";
import Loader from "../../UI/Loader/Loader";
import { useOpenPopup } from "../../store/popupStore";
import Popup from "../../UI/Popup/Popup";
import ErrorPopup from "../../UI/ErrorPopup/ErrorPopup";

const Root = () => {
    const { isLoading } = useLoader();
    const { isOpen } = useOpenPopup();
    return (
        <main className="app">
            {isLoading && <Loader />}
            {isOpen && <Popup />}
            <TheHeader />
            <ErrorPopup />
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
