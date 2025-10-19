import axiosInstance from "../../config/axiosInstance";

export const deleteRepo = async (
    gitLogin: string,
    gitToken: string,
    repoName: string
): Promise<void> => {
    const headers = {
        Authorization: `Bearer ${gitToken}`,
        Accept: "application/vnd.github+json",
    };
    console.log("Deleting repo:", gitLogin, gitToken, repoName);
    if (!gitLogin || !gitToken || !repoName) {
        throw new Error("Data (login, token, name) is required to update repository.");
    }
    const url = `repos/${gitLogin}/${repoName}`;

    try {
        await axiosInstance.delete(url, { headers });
    } catch (error: unknown | Error) {
        if (error instanceof Error) {
            throw new Error(`Failed to delete repository: ${error.message}`);
        }
    }
};
