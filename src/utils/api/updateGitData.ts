import axiosInstance from "../../config/axiosInstance";

export const updateRepo = async (
    gitOwner: string,
    gitRepo: string,
    gitToken: string,
    newData: { description?: string; visibility?: "public" | "private" }
) => {
    const headers = { Authorization: `Bearer ${gitToken}`, Accept: "application/vnd.github+json" };
    const url = `https://api.github.com/repos/${gitOwner}/${gitRepo}`;
    const body: any = {};
    if (newData.description !== undefined) body.description = newData.description;
    if (newData.visibility !== undefined) body.visibility = newData.visibility;
    const response = await axiosInstance.patch(url, body, { headers });
    return response.data;
};
