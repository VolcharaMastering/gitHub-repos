import CopyButton from "../SpecialButtons/CopyButton/CopyButton";
import "./TableCell.scss";

type PropsTableCell = {
    value: Repository[keyof Repository];
    copyUrl?: boolean;
};

const TableCell: React.FC<PropsTableCell> = ({ value, copyUrl = false }) => {
    const formatValue = (val: Repository[keyof Repository]): string => {
        if (val === null || val === undefined) return "";
        if (typeof val === "object") return JSON.stringify(val);
        return String(val);
    };

    return (
        <div className="table-cell">
            {copyUrl && typeof value === "string" ? (
                <div className="table-cell__copy-wrapper">
                    <CopyButton textToCopy={value} />
                    {/* <span className="table-cell__url-preview">{formatValue(value)}</span> */}
                </div>
            ) : (
                <p className="table-cell__value">{formatValue(value)}</p>
            )}
        </div>
    );
};

export default TableCell;
