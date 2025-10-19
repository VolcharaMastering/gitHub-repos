import { memo } from "react";
import "./CustomButton.scss";

type PropsButton = {
    type?: "button" | "submit";
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onSubmit?: (event: React.FormEvent<HTMLButtonElement>) => void;
    text?: string;
    disabled?: boolean;
    border?: "none" | "thin";
    className?: string;
    imageForButton?: {
        src: string;
        alt?: string;
    };
    iconWidth?: string;
    customWidth?: string;
    customHeight?: string;
};

const CustomButton: React.FC<PropsButton> = ({
    type,
    onClick,
    onSubmit,
    text,
    disabled = false,
    border = "thin",
    imageForButton,
    className = "",
    iconWidth,
    customWidth,
    customHeight = customWidth,
}) => {
    const buttonClassNames = [
        "custom-button",
        border,
        imageForButton && "image-button",
        (customWidth || customHeight) && "custom-size",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const style = {
        ...(customWidth && { "--button-width": customWidth }),
        ...(iconWidth && { "--icon-width": iconWidth }),
        ...(customHeight && { "--button-height": customHeight }),
        ...(imageForButton && {
            "--button-image": `url(${imageForButton.src})`,
        }),
    } as React.CSSProperties;

    return (
        <button
            className={buttonClassNames}
            style={style}
            type={type ? type : "button"} // default type is "button"
            onClick={onClick}
            onSubmit={onSubmit}
            disabled={disabled}
            aria-label={text || (imageForButton ? "Button with icon" : "Button")}
        >
            {text && <span className="button-text">{text}</span>}
            {imageForButton && (
                <img
                    src={imageForButton.src}
                    alt={imageForButton.alt || ""}
                    className="button-icon"
                />
            )}
        </button>
    );
};

export default memo(CustomButton);
