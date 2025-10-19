import type { JSX } from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type PopupContent = {
    popupType?: "inform" | "form" | "submit" | null;
    formComponent?: JSX.Element | null;
    textComponent?: JSX.Element | null;
    size?: string | null;
};

// Define a type for the Popup state
type PopupState = PopupContent & {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean, content: PopupContent | null) => void;
};

// Create the Zustand store
export const useOpenPopup = create<PopupState>()(
    devtools(
        (set) => ({
            isOpen: false,
            popupType: null,
            formComponent: null,
            textComponent: null,
            size: null,
            setIsOpen: (isOpen, content = null) => {
                if (isOpen && content) {
                    set({
                        isOpen,
                        ...content,
                    });
                } else {
                    set(
                        {
                            isOpen,
                            popupType: null,
                            formComponent: null,
                            textComponent: null,
                            size: null,
                        },
                        false,
                        { type: "setIsOpen", payload: isOpen }
                    );
                }
            },
        }),
        { store: "popupStore", enabled: import.meta.env.DEV }
    )
);
