import axiosInstance from "../../config/axiosInstance";

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
        const repos = response.data.map((r: Repository) => ({
            id: r.id,
            node_id: r.node_id,
            name: r.name,
            full_name: r.full_name,
            private: r.private,
            owner: { login: r.owner.login },
            description: r.description,
            html_url: r.html_url,
            url: r.url,
            created_at: r.created_at,
            updated_at: r.updated_at,
            git_url: r.git_url,
            ssh_url: r.ssh_url,
            clone_url: r.clone_url,
            license: r.license,
            visibility: r.visibility,
            default_branch: r.default_branch,
        }));

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
