import { useCallback } from "react";
import { useOpenPopup } from "../../store/popupStore";
import CopyButton from "../SpecialButtons/CopyButton/CopyButton";
import "./TableCell.scss";
import InfoForm from "../../components/PopupForms/InfoForm/InfoForm";
import { useAllReposStore } from "../../store/allReposStore";

type PropsTableCell = {
    value: Repository[keyof Repository];
    reposId?: number;
    copyUrl?: boolean;
    justify?: "left" | "center" | "right";
};

const TableCell: React.FC<PropsTableCell> = ({ value, reposId, copyUrl = false, justify }) => {
    const { setIsOpen } = useOpenPopup();
    const { repositories } = useAllReposStore();

    const handleOpenPopup = useCallback(() => {
        if (!reposId) return;
        const repository = repositories.find((repo) => repo.id === reposId);
        if (!repository) return;
        setIsOpen(true, {
            popupType: "form",
            formComponent: <InfoForm repository={repository} />,
        });
    }, [setIsOpen, reposId, repositories]);

    const formatValue = (val: Repository[keyof Repository]): string => {
        if (val === null || val === undefined) return "";
        if (typeof val === "object") return JSON.stringify(val);
        if (typeof val === "string") {
            const date = new Date(val);
            if (!isNaN(date.getTime())) {
                // Form as "31.12.25 16:45"
                const day = String(date.getDate()).padStart(2, "0");
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const year = String(date.getFullYear()).slice(-2);
                const hours = String(date.getHours()).padStart(2, "0");
                const minutes = String(date.getMinutes()).padStart(2, "0");

                val = `${day}.${month}.${year} ${hours}:${minutes}`;
            }
        }
        return String(val);
    };

    return (
        <div className={`table-cell ${justify ? `justify-${justify}` : ""}`}>
            {copyUrl && typeof value === "string" ? (
                <div className="table-cell__copy-wrapper">
                    <CopyButton textToCopy={value} />
                </div>
            ) : reposId ? (
                <p className="table-cell__value-active" onClick={handleOpenPopup}>
                    {formatValue(value)}
                </p>
            ) : (
                <p className="table-cell__value">{formatValue(value)}</p>
            )}
        </div>
    );
};

export default TableCell;
