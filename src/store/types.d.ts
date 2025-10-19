interface Repository {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: {
        login: string;
    };
    description: string | null;
    html_url: string;
    url: string;
    created_at: string;
    updated_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    license: null | string;
    visibility: string;
    default_branch: string;
}

interface NewRepo {
    name: string;
    description?: string | null;
    private?: boolean;
}
interface ReposStoreState {
    repositories: Repository[];
    // loading: boolean;
    // error: string | null;
    getAllRepos: (
        gitLogin: string,
        gitToken: string,
        sortBy?: string,
        direction?: "asc" | "desc",
        per_page?: number,
        page?: number
    ) => Promise<void>;
}
