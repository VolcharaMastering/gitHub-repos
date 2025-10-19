import { create } from "zustand";
import { devtools } from "zustand/middleware";

type GitUserState = {
    gitLogin: string | null;
    gitToken: string | null;
    setGitUser: (gitLogin: string, gitToken: string) => void;
};

export const useGitUserStore = create<GitUserState>()(
    devtools(
        (set) => ({
            gitLogin: null,
            gitToken: null,
            setGitUser: (gitLogin: string, gitToken: string) => {
                set({ gitLogin, gitToken });
            },
        }),
        {
            store: "gitUserStore",
            enabled: import.meta.env.DEV,
        }
    )
);
