import axiosInstance from "../../config/axiosInstance";
import { filterReposResponse } from "../filterReposResponce";

export const getAllIRepos = async (
    gitLogin: string,
    gitToken: string,
    sortBy: string = "updated_at",
    direction: "asc" | "desc" = "desc"
): Promise<Repository[]> => {
    const headers = {
        Authorization: `Bearer ${gitToken}`,
        Accept: "application/vnd.github+json",
    };
    if (!gitLogin) {
        throw new Error("Git login is required to fetch repositories.");
    }
    const url = `users/${gitLogin}/repos`;
    const params: { sort: string; direction?: string } = {
        sort: sortBy,
        direction,
    };
    try {
        const response = await axiosInstance.get(url, { headers, params });
        const repos = response.data.map((r: Repository) => filterReposResponse(r));
        return repos;
    } catch (error: unknown | Error) {
        if (error instanceof Error) {
            throw new Error(`Failed to get repository: ${error.message}`);
        } else {
            throw new Error(`Failed to get repository: ${String(error)}`);
        }
    }
};

export const getRepoData = async (gitOwner: string, gitRepo: string, gitToken: string) => {
    const headers = { Authorization: `Bearer ${gitToken}`, Accept: "application/vnd.github+json" };
    const url = `repos/${gitOwner}/${gitRepo}`;
    try {
        const response = await axiosInstance.get(url, { headers });
        return response.data; // JSON object with repo details
    } catch (error: unknown | Error) {
        if (error instanceof Error) {
            throw new Error(`Failed to get repository: ${error.message}`);
        } else {
            throw new Error(`Failed to get repository: ${String(error)}`);
        }
    }
};
