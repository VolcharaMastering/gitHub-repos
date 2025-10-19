interface Repository {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    owner: {
        login: string;
    };
    description?: string | null;
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
    isPrivate: boolean;
}
interface ReposStoreState {
    repositories: Repository[];
    getAllRepos: (
        gitLogin: string,
        gitToken: string,
        sortBy?: string,
        direction?: "asc" | "desc",
        per_page?: number,
        page?: number
    ) => Promise<void>;
    updateRepository: (
        gitLogin: string,
        gitToken: string,
        repoName: string,
        newData: {
            description?: string;
            visibility: "public" | "private";
        }
    ) => Promise<void>;
    createRepository: (gitLogin: string, gitToken: string, data: NewRepo) => Promise<void>;
    deleteRepository: (gitLogin: string, gitToken: string, repoName: string) => Promise<void>;
}

interface ErrorState {
    isError: boolean;
    errorMessage: string;
    errorDetails?: string;
    setError: (message: string, details?: string) => void;
    clearError: () => void;
}
