import { useErrorStore } from "../../store/errorStore";
import CustomButton from "../../UI/CustomButton/CustomButton";
import "./ErrorPopup.scss";

const ErrorPopup = () => {
    const { isError, errorMessage, errorDetails, clearError } = useErrorStore();

    if (!isError) return null;

    const handleClose = () => {
        clearError();
    };

    const handleCopyDetails = () => {
        navigator.clipboard.writeText(
            `Error: ${errorMessage}\nDetails: ${errorDetails || "No details"}`
        );
    };

    return (
        <div className="error-popup-overlay">
            <div className="error-popup">
                <div className="error-popup__header">
                    <h2 className="error-popup__title">Error</h2>
                    <button className="error-popup__close" onClick={handleClose}>
                        ×
                    </button>
                </div>

                <div className="error-popup__content">
                    <p className="error-popup__message">{errorMessage}</p>

                    {errorDetails && (
                        <details className="error-popup__details">
                            <summary className="error-popup__details-summary">
                                Technical Details
                            </summary>
                            <pre className="error-popup__details-content">{errorDetails}</pre>
                        </details>
                    )}
                </div>

                <div className="error-popup__actions">
                    <CustomButton text="Copy Details" onClick={handleCopyDetails} border="thin" />
                    <CustomButton text="Close" onClick={handleClose} />
                </div>
            </div>
        </div>
    );
};

export default ErrorPopup;
