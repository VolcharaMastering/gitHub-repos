import axiosInstance from "../../config/axiosInstance";
import { errorHandler } from "../errorHandler";
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
    const url = `user/repos`;
    const params: { sort: string; direction?: string } = {
        sort: sortBy,
        direction,
    };
    try {
        const response = await axiosInstance.get(url, { headers, params });
        const repos = response.data.map((r: Repository) => filterReposResponse(r));
        return repos;
    } catch (error: unknown | Error) {
        errorHandler.handleError(error, "Error fetching repositories");
        return []; // Return an empty array in case of error
    }
};

export const getRepoData = async (gitOwner: string, gitRepo: string, gitToken: string) => {
    const headers = { Authorization: `Bearer ${gitToken}`, Accept: "application/vnd.github+json" };
    const url = `repos/${gitOwner}/${gitRepo}`;
    try {
        const response = await axiosInstance.get(url, { headers });
        return response.data; // JSON object with repo details
    } catch (error: unknown | Error) {
        errorHandler.handleError(error, "Error fetching repository data");
    }
};
