import { useFloating, FloatingPortal, offset, shift } from "@floating-ui/react";
import { useState, useCallback } from "react";
import CustomButton from "../../../UI/CustomButton/CustomButton";
import deleteIcon from "../../../assets/delete-button.svg";
import { useOpenPopup } from "../../../store/popupStore";
import ConfirmDeleteForm from "../../../components/PopupForms/ConfirmDeleteForm/ConfirmDeleteForm";
import { useAllReposStore } from "../../../store/allReposStore";
import { useGitUserStore } from "../../../store/gitUserStore";

type PropsDeleteButton = {
    repoName: string;
    width?: string;
};

const DeleteButton: React.FC<PropsDeleteButton> = ({ repoName, width = "20px" }) => {
    const { setIsOpen } = useOpenPopup();
    const [isHovered, setIsHovered] = useState(false);
    const { deleteRepository } = useAllReposStore();
    const { gitLogin, gitToken } = useGitUserStore();

    const { refs, floatingStyles } = useFloating({
        placement: "top",
        middleware: [offset(1), shift()],
    });

    const handleDelete = useCallback(async (): Promise<void> => {
        if (!gitLogin || !gitToken) {
            console.error("Git login or token is missing");
            return;
        }

        try {
            await deleteRepository(gitLogin, gitToken, repoName);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error(`Failed to delete repository: ${errorMessage}`);
            throw error;
        }
    }, [gitLogin, gitToken, repoName, deleteRepository]);

    const handleOpenPopup = useCallback(() => {
        if (!gitLogin || !gitToken) {
            console.warn("Cannot open delete popup: missing credentials");
            return;
        }

        setIsOpen(true, {
            popupType: "form",
            formComponent: <ConfirmDeleteForm funcThatDeletes={handleDelete} />,
        });
    }, [gitLogin, gitToken, setIsOpen, handleDelete]);

    return (
        <div
            className="delete-button"
            ref={refs.setReference}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <CustomButton
                imageForButton={{ src: deleteIcon }}
                iconWidth={width}
                customWidth={width}
                border="none"
                onClick={handleOpenPopup}
                disabled={!gitLogin || !gitToken}
            />

            {isHovered && (
                <FloatingPortal>
                    <div ref={refs.setFloating} style={floatingStyles} className="tooltip active">
                        {gitLogin && gitToken ? "Delete repo" : "Authentication required"}
                    </div>
                </FloatingPortal>
            )}
        </div>
    );
};

export default DeleteButton;
