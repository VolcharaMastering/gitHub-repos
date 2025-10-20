import axiosInstance from "../../config/axiosInstance";
import { errorHandler } from "../errorHandler";

export const updateRepo = async (
    gitLogin: string,
    gitToken: string,
    repoName: string,
    newData: { description?: string; visibility?: "public" | "private"; private: boolean }
) => {
    const headers = {
        Authorization: `Bearer ${gitToken}`,
        Accept: "application/vnd.github+json",
    };
    if (!gitLogin || !gitToken || !repoName) {
        throw new Error("Data (login, token, id) is required to update repository.");
    }
    const url = `repos/${gitLogin}/${repoName}`;
    const body: { description?: string; visibility?: "public" | "private"; private?: boolean } = {};

    try {
        if (newData.description !== undefined) body.description = newData.description;
        if (newData.visibility !== undefined) body.visibility = newData.visibility;
        if (newData.visibility === "private") body.private = true;
        const response = await axiosInstance.patch(url, body, { headers });
        return response.data;
    } catch (error: unknown | Error) {
        errorHandler.handleError(error, "Error updating repository");
    }
};
