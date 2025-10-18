/* eslint-disable react-hooks/exhaustive-deps */
import { useFloating, FloatingPortal, offset, shift } from "@floating-ui/react";
import { useCallback, useState } from "react";

import EditUserForm from "@/components/Forms/EditUserForm/EditUserForm";

import SimpleButton from "@/UI/SimpleButton/SimpleButton";

import { useOpenPopup } from "@/stores/popupState";

import editIcon from "@/assets/edit-button.svg";
import dictionary from "@/context/buttonLabels.json";

type PropsEditButton = {
    typeForEdit: "user" | "apk";
    idToEdit: string;
    width?: string;
    iconWidth?: string;
};
const EditButton: React.FC<PropsEditButton> = ({
    typeForEdit,
    idToEdit,
    width = "30px",
    iconWidth = "20px",
}) => {
    const lang = "ru";
    const editLabel = dictionary[lang].edit;
    const { setIsOpen } = useOpenPopup();
    const [isHovered, setIsHovered] = useState(false);

    const { refs, floatingStyles } = useFloating({
        placement: "top",
        middleware: [offset(1), shift()],
    });

    const handleOpenPopup = useCallback(() => {
        switch (typeForEdit) {
            case "user":
                setIsOpen(true, {
                    popupType: "form",
                    formComponent: <EditUserForm editUser={idToEdit} />,
                });
                break;
            case "apk":
                break;
            default:
                break;
        }
    }, [setIsOpen]);

    return (
        <div
            ref={refs.setReference}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <SimpleButton
                type="button"
                imageForButton={editIcon}
                background="transparent"
                iconWidth={width}
                customWidth={width}
                border="none"
                onClick={handleOpenPopup}
            />
            {isHovered && (
                <FloatingPortal>
                    <div ref={refs.setFloating} style={floatingStyles} className="tooltip active">
                        {editLabel}
                    </div>
                </FloatingPortal>
            )}
        </div>
    );
};
export default EditButton;
