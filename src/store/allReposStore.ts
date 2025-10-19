import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getAllIRepos } from "../utils/api/getGitData";
import { updateRepo } from "../utils/api/updateGitData";
import { createRepo } from "../utils/api/createGitData";
import { filterReposResponse } from "../utils/filterReposResponce";
import { deleteRepo } from "../utils/api/deleteGitData";

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
            updateRepository: async (gitLogin, gitToken, repoName, newData) => {
                try {
                    await updateRepo(gitLogin, gitToken, repoName, newData);
                } catch (error: unknown | Error) {
                    if (error instanceof Error) {
                        throw new Error(`Failed to update repository: ${error.message}`);
                    } else {
                        throw new Error(`Failed to update repository: ${String(error)}`);
                    }
                }
                set(
                    (state) => {
                        const updatedRepositories = state.repositories.map((repo) =>
                            repo.name === repoName ? { ...repo, ...newData } : repo
                        );
                        return { repositories: updatedRepositories };
                    },
                    false,
                    { type: "addRepository", payload: { repoName, newData } }
                );
            },
            createRepository: async (gitLogin, gitToken, data) => {
                try {
                    const newRepo = await createRepo(gitLogin, gitToken, data);
                    set(
                        (state) => ({
                            repositories: [filterReposResponse(newRepo), ...state.repositories],
                        }),
                        false,
                        { type: "createRepository", payload: newRepo }
                    );
                } catch (error: unknown | Error) {
                    if (error instanceof Error) {
                        throw new Error(`Failed to create repository: ${error.message}`);
                    } else {
                        throw new Error(`Failed to create repository: ${String(error)}`);
                    }
                }
            },
            deleteRepository: async (gitLogin, gitToken, repoName) => {
                try {
                    console.log("Deleting repo store:", gitLogin, gitToken, repoName);
                    await deleteRepo(gitLogin, gitToken, repoName);
                    set(
                        (state) => ({
                            repositories: state.repositories.filter(
                                (repo) => repo.name !== repoName
                            ),
                        }),
                        false,
                        { type: "deleteRepository", payload: repoName }
                    );
                } catch (error: unknown | Error) {
                    if (error instanceof Error) {
                        throw new Error(`Failed to delete repository: ${error.message}`);
                    } else {
                        throw new Error(`Failed to delete repository: ${String(error)}`);
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
