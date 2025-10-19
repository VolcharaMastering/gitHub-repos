import axiosInstance from "../../config/axiosInstance";

export const createRepo = async (gitLogin: string, gitToken: string, data: NewRepo) => {
    const headers = {
        Authorization: `Bearer ${gitToken}`,
        Accept: "application/vnd.github+json",
    };
    if (!gitLogin || !gitToken || !data.name) {
        throw new Error("Data (login, token, name of repo) is required to update repository.");
    }
    const url = `user/repos`;
    const body = {
        name: data.name,
        description: data.description || "",
        private: data.isPrivate || false,
    };
    try {
        const response = await axiosInstance.post(url, body, { headers });
        return response.data;
    } catch (error: unknown | Error) {
        if (error instanceof Error) {
            throw new Error(`Failed to create repository: ${error.message}`);
        } else {
            throw new Error(`Failed to create repository: ${String(error)}`);
        }
    }
};
