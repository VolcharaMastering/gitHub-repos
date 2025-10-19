import CopyButton from "../SpecialButtons/CopyButton/CopyButton";
import "./TableCell.scss";

type PropsTableCell = {
    value: Repository[keyof Repository];
    copyUrl?: boolean;
    justify?: "left" | "center" | "right";
};

const TableCell: React.FC<PropsTableCell> = ({ value, copyUrl = false, justify }) => {
    const formatValue = (val: Repository[keyof Repository]): string => {
        if (val === null || val === undefined) return "";
        if (typeof val === "object") return JSON.stringify(val);
        if (typeof val === "string") {
            // Пытаемся распарсить дату из строки
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
            ) : (
                <p className="table-cell__value">{formatValue(value)}</p>
            )}
        </div>
    );
};

export default TableCell;
