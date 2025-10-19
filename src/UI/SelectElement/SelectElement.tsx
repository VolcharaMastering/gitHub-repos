import Select from "react-select";
import type { StylesConfig, SingleValue } from "react-select";
import "./SelectElement.scss";

// Types for react-select
type OptionType = {
    value: string | number;
    label: string | number;
};

type PropsSelectElement = {
    defaultValue?: string | number;
    id?: string;
    onChange?: (event: { target: { name?: string; value: string | number } }) => void;
    value?: string | number;
    values?: (string | number)[];
    name?: string;
    label?: string;
    size?: "small" | "medium" | "large";
    maxWidth?: string;
    errorMessage?: string;
    className?: string;
};

// Custom styles with proper typing
const getCustomStyles = (
    maxWidth?: string,
    errorMessage?: string,
    size?: string
): StylesConfig<OptionType, false> => ({
    control: (provided, state) => ({
        ...provided,
        maxWidth: maxWidth || "100%",
        borderRadius: "10px",
        minHeight: size === "small" ? "32px" : size === "large" ? "48px" : "40px",
        borderColor: errorMessage ? "#E63946" : state.isFocused ? "#00C2FF" : provided.borderColor,
        backgroundColor: "#0F1620",
        color: "#E6EEF3",
        "&:hover": {
            borderColor: errorMessage ? "#E63946" : "#00C2FF",
        },
    }),
    placeholder: (provided) => ({
        ...provided,
        color: "#9AA6B2",
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "#E6EEF3",
    }),
    input: (provided) => ({
        ...provided,
        color: "#E6EEF3",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#287DB8" : state.isFocused ? "#12171E" : "#0F1620",
        color: state.isSelected ? "#E6EEF3" : "#9AA6B2",
        "&:hover": {
            backgroundColor: "#12171E",
            color: "#E6EEF3",
        },
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: "#0F1620",
        borderRadius: "10px",
    }),
    menuList: (provided) => ({
        ...provided,
        padding: 0,
        borderRadius: "10px",
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        display: "none",
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: "#9AA6B2",
        "&:hover": {
            color: "#E6EEF3",
        },
    }),
});

const SelectElement: React.FC<PropsSelectElement> = ({
    defaultValue,
    id,
    name,
    label,
    size = "medium",
    onChange,
    value,
    values,
    maxWidth,
    errorMessage,
    className,
}) => {
    // Convert data for react-select
    const options: OptionType[] =
        values?.map((val) => ({
            value: val,
            label: val,
        })) || [];

    // Find current value
    const currentValue = value
        ? options.find((option) => option.value === value)
        : defaultValue
          ? options.find((option) => option.value === defaultValue)
          : null;

    const handleChange = (newValue: SingleValue<OptionType>) => {
        if (onChange && newValue) {
            const fakeEvent = {
                target: {
                    name: name,
                    value: newValue.value,
                },
            };
            onChange(fakeEvent);
        }
    };

    return (
        <div
            className={`select-element ${size} ${className || ""}`}
            style={
                {
                    ...(maxWidth && { "--max-width": maxWidth }),
                } as React.CSSProperties
            }
        >
            {label && <label className={`select-element__label ${size}`}>{label}</label>}

            <Select
                id={id}
                name={name}
                className={`select-element__select ${size}`}
                classNamePrefix="react-select"
                options={options}
                value={currentValue}
                onChange={handleChange}
                placeholder="Выберите значение"
                styles={getCustomStyles(maxWidth, errorMessage, size)}
                isSearchable={false}
            />

            {errorMessage && (
                <span className="select-element__error-message">
                    <span className="error-message_icon" />
                    <p className="error-message">{errorMessage}</p>
                </span>
            )}
        </div>
    );
};

export default SelectElement;
