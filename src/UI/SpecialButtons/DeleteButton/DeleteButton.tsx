import { useFloating, FloatingPortal, offset, shift } from "@floating-ui/react";
import { useState } from "react";

import ConfirmApkDeleteForm from "@/components/Forms/ConfirmApkDeleteForm/ConfirmApkDeleteForm";

import SimpleButton from "@/UI/SimpleButton/SimpleButton";

import { useOpenPopup } from "@/stores/popupState";

import deleteIcon from "@/assets/delete-button.svg";
import dictionary from "@/context/buttonLabels.json";

type PropsDeleteButton = {
    typeToDelete: string;
    idToDelete: string;
    width?: string;
    iconWidth?: string;
    stateToUpdate?: () => void;
};
const DeleteButton: React.FC<PropsDeleteButton> = ({
    typeToDelete,
    idToDelete,
    width = "30px",
    stateToUpdate,
}) => {
    const lang = "ru";
    const deleteLabel = dictionary[lang].delete;
    const { setIsOpen } = useOpenPopup();
    const [isHovered, setIsHovered] = useState(false);

    // Initialize floating UI logic with placement at the top and middleware for offset and shift
    const { refs, floatingStyles } = useFloating({
        placement: "top",
        middleware: [offset(1), shift()],
    });

    const handleOpenPopup = () => {
        setIsOpen(true, {
            popupType: "form",
            formComponent: (
                <ConfirmApkDeleteForm
                    typeToDelete={typeToDelete}
                    idToDelete={idToDelete}
                    stateToUpdate={stateToUpdate}
                />
            ),
        });
    };

    return (
        <div
            className="delete-button"
            ref={refs.setReference} // Set reference for the floating element
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <SimpleButton
                type="button"
                imageForButton={deleteIcon}
                background="transparent"
                iconWidth={width}
                customWidth={width}
                border="none"
                onClick={handleOpenPopup}
            />
            {isHovered && (
                <FloatingPortal>
                    <div
                        ref={refs.setFloating} // Set floating reference for tooltip
                        style={floatingStyles} // Apply styles for floating element
                        className="tooltip active"
                    >
                        {deleteLabel}
                    </div>
                </FloatingPortal>
            )}
        </div>
    );
};
export default DeleteButton;
