import axiosInstance from "../../config/axiosInstance";

export const deleteRepo = async (
    gitOwner: string,
    gitRepo: string,
    gitToken: string
): Promise<void> => {
    const headers = {
        Authorization: `Bearer ${gitToken}`,
        Accept: "application/vnd.github+json",
    };

    const url = `https://api.github.com/repos/${gitOwner}/${gitRepo}`;

    try {
        await axiosInstance.delete(url, { headers });
    } catch (error: unknown | Error) {
        if (error instanceof Error) {
            throw new Error(`Failed to delete repository: ${error.message}`);
        }
    }
};
