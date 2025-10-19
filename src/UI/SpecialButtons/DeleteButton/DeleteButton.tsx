import { useFloating, FloatingPortal, offset, shift } from "@floating-ui/react";
import { useState } from "react";

// import ConfirmDeleteForm from "../components/ConfirmDeleteForm/ConfirmDeleteForm";

import CustomButton from "../../../UI/CustomButton/CustomButton";

// import { useOpenPopup } from "@/stores/popupState";

import deleteIcon from "../../../assets/delete-button.svg";

type PropsDeleteButton = {
    idToDelete: number;
    width?: string;
};
const DeleteButton: React.FC<PropsDeleteButton> = ({ idToDelete, width = "20px" }) => {
    // const { setIsOpen } = useOpenPopup();
    const [isHovered, setIsHovered] = useState(false);

    // Initialize floating UI logic with placement at the top and middleware for offset and shift
    const { refs, floatingStyles } = useFloating({
        placement: "top",
        middleware: [offset(1), shift()],
    });

    const handleOpenPopup = () => {
        // setIsOpen(true, {
        //     popupType: "form",
        //     formComponent: (
        //         <ConfirmApkDeleteForm
        //             typeToDelete={typeToDelete}
        //             idToDelete={idToDelete}
        //             stateToUpdate={stateToUpdate}
        //         />
        //     ),
        // });
    };

    return (
        <div
            className="delete-button"
            ref={refs.setReference} // Set reference for the floating element
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <CustomButton
                imageForButton={{ src: deleteIcon }}
                iconWidth={width}
                customWidth={width}
                border="none"
                // onClick={handleOpenPopup}
            />
            {isHovered && (
                <FloatingPortal>
                    <div
                        ref={refs.setFloating} // Set floating reference for tooltip
                        style={floatingStyles} // Apply styles for floating element
                        className="tooltip active"
                    >
                        Delete repo
                    </div>
                </FloatingPortal>
            )}
        </div>
    );
};
export default DeleteButton;
