import { create } from "zustand";
import { devtools } from "zustand/middleware";

type State = {
    isLoading: boolean;
    isSuccess: boolean;
    setIsLoading: (isLoading: boolean) => void;
    setIsSuccess: (isSuccess: boolean) => void;
};

export const useLoader = create<State>()(
    devtools(
        (set) => ({
            isLoading: false,
            isSuccess: true,
            setIsLoading: (isLoading: boolean) =>
                set({ isLoading }, false, { type: "setIsLoading", payload: isLoading }),
            setIsSuccess: (isSuccess: boolean) =>
                set({ isSuccess }, false, { type: "setIsSuccess", payload: isSuccess }),
        }),
        { store: "loaderStore", enabled: import.meta.env.DEV }
    )
);
