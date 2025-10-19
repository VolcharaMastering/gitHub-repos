import { useState } from "react";
import { useOpenPopup } from "../../../store/popupStore";
import CustomButton from "../../../UI/CustomButton/CustomButton";

type PropsConfirmDeleteForm = {
    funcThatDeletes: () => Promise<void>;
};

const ConfirmDeleteForm: React.FC<PropsConfirmDeleteForm> = ({ funcThatDeletes }) => {
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setIsOpen } = useOpenPopup();

    if (typeof funcThatDeletes !== "function") {
        console.error("funcThatDeletes is not a function:", funcThatDeletes);
        return (
            <div className="delete">
                <h3 className="subtitle">Error</h3>
                <p>Delete functionality is not available</p>
                <CustomButton text="Close" onClick={() => setIsOpen(false, null)} />
            </div>
        );
    }

    const handleItemDelete = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setDeleting(true);

        try {
            await funcThatDeletes();
            setDeleting(false);

            setTimeout(() => {
                setIsOpen(false, null);
            }, 800);
        } catch (err) {
            setDeleting(false);
            const errorMessage = err instanceof Error ? err.message : "Failed to delete repository";
            setError(errorMessage);
            console.error("Delete error:", err);
        }
    };

    const handleCancel = () => {
        setIsOpen(false, null);
    };

    if (deleting) {
        return (
            <div className="delete">
                <h3 className="subtitle">Deleting...</h3>
                <div className="delete__loading">Processing</div>
            </div>
        );
    }

    return (
        <form className="delete" onSubmit={handleItemDelete}>
            <h3 className="subtitle">Are you sure?</h3>
            <p className="delete__description">
                This action cannot be undone. The repository will be permanently deleted.
            </p>

            {error && (
                <div className="delete__error">
                    <span className="error-message_icon" />
                    <p className="error-message">{error}</p>
                </div>
            )}

            <div className="delete__buttons">
                <CustomButton text="Confirm" type="submit" disabled={deleting} />
                <CustomButton
                    text="Cancel"
                    type="button"
                    onClick={handleCancel}
                    disabled={deleting}
                />
            </div>
        </form>
    );
};

export default ConfirmDeleteForm;
