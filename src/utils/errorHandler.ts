import { useErrorStore } from "../store/errorStore";

class ErrorHandler {
    private static instance: ErrorHandler;
    private errorStore: ReturnType<typeof useErrorStore>;

    private constructor() {
        // Store without hooking into React components
        this.errorStore = useErrorStore;
    }

    static getInstance(): ErrorHandler {
        if (!ErrorHandler.instance) {
            ErrorHandler.instance = new ErrorHandler();
        }
        return ErrorHandler.instance;
    }

    // Main error handling method
    handleError(error: unknown, context?: string): void {
        let errorMessage = "An unexpected error occurred";
        let errorDetails = "";

        // Detect error type and extract message/details
        if (error instanceof Error) {
            errorMessage = error.message;
            errorDetails = error.stack || "";
        } else if (typeof error === "string") {
            errorMessage = error;
        } else {
            errorMessage = String(error);
        }

        // Add context if exists
        if (context) {
            errorMessage = `[${context}] ${errorMessage}`;
        }

        console.error("Error handled:", errorMessage, error);

        // Save error to the store
        this.errorStore.getState().setError(errorMessage, errorDetails);
    }

    // For overriding console.error
    captureConsoleError(): void {
        const originalConsoleError = console.error;

        console.error = (...args: unknown[]) => {
            const errorMessage = args
                .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : String(arg)))
                .join(" ");

            this.handleError(errorMessage, "Console");
            originalConsoleError.apply(console, args);
        };
    }

    // For overriding global error handlers
    setupGlobalErrorHandling(): void {
        if (typeof window !== "undefined") {
            // Handle global errors in JavaScript
            window.addEventListener("error", (event) => {
                this.handleError(event.error, "Global");
            });

            // Handle unhandled promise rejections
            window.addEventListener("unhandledrejection", (event) => {
                this.handleError(event.reason, "Unhandled Promise");
            });
        }
    }
}

export const errorHandler = ErrorHandler.getInstance();
