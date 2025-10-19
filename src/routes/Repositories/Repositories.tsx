import { useCallback } from "react";
import TheTable from "../../components/TheTable/TheTable";
import { useOpenPopup } from "../../store/popupStore";
import CustomButton from "../../UI/CustomButton/CustomButton";
import "./Repositories.scss";
import NewRepoForm from "../../components/PopupForms/NewRepoForm/NewRepoForm";

type PropsRepositories = {};
const Repositories: React.FC<PropsRepositories> = () => {
    const { setIsOpen } = useOpenPopup();

    const handleOpenPopup = useCallback(() => {
        setIsOpen(true, {
            popupType: "form",
            formComponent: <NewRepoForm />,
        });
    }, [setIsOpen]);

    return (
        <section className="repositories">
            <div className="repositories__header">
                <h2 className="subtitle">Repositories Page</h2>
                <CustomButton text="New Repository" onClick={handleOpenPopup} />
            </div>
            <TheTable />
        </section>
    );
};
export default Repositories;
