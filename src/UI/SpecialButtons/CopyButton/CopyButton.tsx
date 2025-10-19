import { useFloating, FloatingPortal, offset, shift } from "@floating-ui/react";
import { useEffect, useState, useCallback } from "react";
import CustomButton from "../../CustomButton/CustomButton";
import copyIcon from "../../../assets/copy.svg";
import "./CopyButton.scss";
import { errorHandler } from "../../../utils/errorHandler";

type PropsCopyButton = {
    textToCopy: string;
    width?: string;
};

const CopyButton: React.FC<PropsCopyButton> = ({ textToCopy, width = "20px" }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const { refs, floatingStyles } = useFloating({
        placement: "top",
        middleware: [offset(1), shift()],
    });

    useEffect(() => {
        if (isCopied) {
            const timer = setTimeout(() => setIsCopied(false), 1500);
            return () => clearTimeout(timer);
        }
    }, [isCopied]);

    // useCallback to prevent unnecessary re-renders
    const copyToClipboard = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setIsCopied(true);
        } catch (error) {
            errorHandler.handleError(error, "Failed to copy text to clipboard");
        }
    }, [textToCopy]);

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);

    return (
        <div
            className="copy"
            ref={refs.setReference}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <FloatingPortal>
                {(isCopied || isHovered) && (
                    <div ref={refs.setFloating} style={floatingStyles} className="tooltip active">
                        {isCopied ? "Copied!" : `Copy URL: ${textToCopy}`}
                    </div>
                )}
            </FloatingPortal>

            <CustomButton
                type="button"
                imageForButton={{ src: copyIcon }}
                iconWidth={width}
                customWidth={width}
                border="none"
                onClick={copyToClipboard}
            />
        </div>
    );
};

export default CopyButton;
