import { memo } from "react";
import "./CustomButton.scss";

type PropsButton = {
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    text?: string;
    disabled?: boolean;
    border?: "none" | "thin";
    className?: string;
    imageForButton?: {
        src: string;
    };
    imageWidth?: string;
    iconWidth?: string;
    customWidth?: string;
    customHeight?: string;
};

const CustomButton: React.FC<PropsButton> = ({
    onSubmit,
    text,
    disabled = false,
    border = "thin",
    imageForButton,
    className,
    imageWidth,
    iconWidth,
    customWidth,
    customHeight = customWidth ? customWidth : undefined,
}) => {
    // const { isLoading } = useLoader();
    // ${disabled || isLoading ? "disabled" : ""}
    return (
        <button
            className={`custom-button ${border}             ${imageForButton && "image-button"} 
            ${customWidth || customHeight ? "custom-size" : ""} ${className ? className : ""}
            `}
            // here we use CSS variables to send them to scss file
            style={
                {
                    ...(imageForButton && {
                        "--button-image": `url(${imageForButton.src})`,
                        "--button-width": imageWidth || "100px", // default value
                    }),
                    ...(customWidth && { "--button-width": customWidth }),
                    ...(iconWidth && { "--icon-width": iconWidth }),
                    ...(customHeight && { "--button-height": customHeight }),
                } as React.CSSProperties
            }
            type="submit"
            onSubmit={
                onSubmit &&
                ((event: React.FormEvent<HTMLButtonElement>) =>
                    onSubmit(event as unknown as React.FormEvent<HTMLFormElement>))
            }
            // disabled={isLoading ? true : disabled}
            disabled={disabled}
        >
            {text ? text : ""}
        </button>
    );
};

export default memo(CustomButton);
