import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getAllIRepos } from "../utils/api/getGitData";

export const useAllReposStore = create<ReposStoreState>()(
    devtools(
        (set) => ({
            repositories: [] as Repository[],

            getAllRepos: async (
                gitLogin: string,
                gitToken: string,
                sort?: string,
                direction?: "asc" | "desc"
            ) => {
                try {
                    const response = await getAllIRepos(gitLogin, gitToken, sort, direction);
                    const repositories = response;
                    set({ repositories }, false, { type: "getAllRepos", payload: repositories });
                } catch (error: unknown | Error) {
                    if (error instanceof Error) {
                        throw new Error(`Failed to fetch repositories: ${error.message}`);
                    } else {
                        throw new Error(`Failed to fetch repositories: ${String(error)}`);
                    }
                }
            },
        }),
        {
            store: "allReposStore",
            enabled: import.meta.env.DEV,
        }
    )
);
