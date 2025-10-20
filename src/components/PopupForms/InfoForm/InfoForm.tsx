import { NavLink } from "react-router-dom";
import CopyButton from "../../../UI/SpecialButtons/CopyButton/CopyButton";
import "./InfoForm.scss";

type PropsInfoForm = {
    repository: Repository;
};
const formatKey = (k: string) =>
    k
        .replace(/_/g, " ")
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/\b\w/g, (c) => c.toUpperCase());

const InfoForm: React.FC<PropsInfoForm> = ({ repository }) => {
    // Keys of object are converted to a concrete type
    const keys = Object.keys(repository) as Array<keyof Repository>;

    const renderValue = (key: keyof Repository) => {
        const raw = repository[key];

        if (raw === null || raw === undefined) return "-";

        if (typeof raw === "object") {
            try {
                return JSON.stringify(raw);
            } catch {
                return String(raw);
            }
        }

        return String(raw);
    };

    return (
        <ul className="info-form">
            {keys.map((key) => {
                const value = renderValue(key);
                const keyStr = String(key);
                const isUrl = keyStr.toLowerCase().includes("url");

                return (
                    <li className="info-form__item" key={keyStr}>
                        <label className="info-form__label">{formatKey(keyStr)}</label>

                        {isUrl ? (
                            <div className="info-form__value-button">
                                <NavLink
                                    className="info-form__value link"
                                    to={value}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {value}
                                </NavLink>
                                <CopyButton textToCopy={value} />
                            </div>
                        ) : (
                            <p className="info-form__value">{value}</p>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};
export default InfoForm;
