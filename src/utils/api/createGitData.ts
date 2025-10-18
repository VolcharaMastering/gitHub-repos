import axiosInstance from "../../config/axiosInstance";

export const createRepo = async (
    gitToken: string,
    data: { name: string; description?: string; private?: boolean }
) => {
    const headers = { Authorization: `Bearer ${gitToken}`, Accept: "application/vnd.github+json" };
    const url = `https://api.github.com/user/repos`;
    const body = {
        name: data.name,
        description: data.description || "",
        private: data.private || false,
    };
    const response = await axiosInstance.post(url, body, { headers });
    return response.data;
};
