import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useErrorStore = create<ErrorState>()(
    devtools(
        (set) => ({
            isError: false,
            errorMessage: "",
            errorDetails: undefined,

            setError: (message: string, details?: string) => {
                set(
                    {
                        isError: true,
                        errorMessage: message,
                        errorDetails: details,
                    },
                    false,
                    { type: "setError", payload: { isError: true, message, details } }
                );
            },

            clearError: () => {
                set(
                    {
                        isError: false,
                        errorMessage: "",
                        errorDetails: undefined,
                    },
                    false,
                    {
                        type: "clearError",
                        payload: { isError: false, errorMessage: "", errorDetails: undefined },
                    }
                );
            },
        }),
        { store: "errorStore", enabled: import.meta.env.DEV }
    )
);
