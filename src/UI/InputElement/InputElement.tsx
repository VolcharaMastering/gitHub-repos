import { memo } from "react";
import "./InputElement.scss";

type PropsInputElement = {
    inputType: "text" | "password";
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string | number | boolean;
    name?: string;
    label?: string;
    className?: string;
    inputWidth?: string;
    errorMessage?: string;
};
const InputElement: React.FC<PropsInputElement> = ({
    inputType,
    placeholder,
    name,
    onChange,
    value,
    label,
    className,
    inputWidth,
    errorMessage,
}) => {
    return (
        <div className="input-element">
            {label && <label className="input-element__label">{label}</label>}
            <input
                className={`input-element__input ${className && className} ${inputWidth ? "custom-width" : ""}`}
                type={inputType}
                name={name && name}
                placeholder={placeholder && placeholder}
                onChange={onChange && onChange}
                value={value !== false ? (value as string | number | undefined) : undefined}
            />
            {errorMessage && (
                <span className="input-element__error-message">
                    <span className="input-element__error-message_icon" />
                    <p className="error-message">{errorMessage}</p>
                </span>
            )}
        </div>
    );
};
export default memo(InputElement);
