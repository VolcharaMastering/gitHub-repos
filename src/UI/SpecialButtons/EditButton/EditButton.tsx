import { useCallback, useState } from "react";
import { useFloating, FloatingPortal, offset, shift } from "@floating-ui/react";
import CustomButton from "../../../UI/CustomButton/CustomButton";
import editIcon from "../../../assets/edit-button.svg";
import EditForm from "../../../components/PopupForms/EditForm/EditForm";
import { useOpenPopup } from "../../../store/popupStore";

type PropsEditButton = {
    repoName: string;
    width?: string;
};
const EditButton: React.FC<PropsEditButton> = ({ repoName, width = "20px" }) => {
    const { setIsOpen } = useOpenPopup();
    const [isHovered, setIsHovered] = useState(false);

    const { refs, floatingStyles } = useFloating({
        placement: "top",
        middleware: [offset(1), shift()],
    });

    const handleOpenPopup = useCallback(() => {
        setIsOpen(true, {
            popupType: "form",
            formComponent: <EditForm repoName={repoName} />,
        });
    }, [setIsOpen, repoName]);

    return (
        <div
            ref={refs.setReference}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <CustomButton
                imageForButton={{ src: editIcon }}
                iconWidth={width}
                customWidth={width}
                border="none"
                onClick={handleOpenPopup}
            />
            {isHovered && (
                <FloatingPortal>
                    <div ref={refs.setFloating} style={floatingStyles} className="tooltip active">
                        Edit repo info
                    </div>
                </FloatingPortal>
            )}
        </div>
    );
};
export default EditButton;
