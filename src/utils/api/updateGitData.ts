import axiosInstance from "../../config/axiosInstance";

export const updateRepo = async (
    gitLogin: string,
    gitToken: string,
    repoName: string,
    newData: { description?: string; visibility?: "public" | "private" }
) => {
    const headers = {
        Authorization: `Bearer ${gitToken}`,
        Accept: "application/vnd.github+json",
    };
    if (!gitLogin || !gitToken || !repoName) {
        throw new Error("Data (login, token, id) is required to update repository.");
    }
    const url = `repos/${gitLogin}/${repoName}`;
    const body: { description?: string; visibility?: "public" | "private" } = {};

    try {
        if (newData.description !== undefined) body.description = newData.description;
        if (newData.visibility !== undefined) body.visibility = newData.visibility;
        const response = await axiosInstance.patch(url, body, { headers });
        return response.data;
    } catch (error: unknown | Error) {
        if (error instanceof Error) {
            throw new Error(`Failed to update repository: ${error.message}`);
        } else {
            throw new Error(`Failed to update repository: ${String(error)}`);
        }
    }
};
