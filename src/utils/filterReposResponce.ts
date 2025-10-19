export const filterReposResponse = (repo: Repository): Repository => {
    return {
        id: repo.id,
        node_id: repo.node_id,
        name: repo.name,
        full_name: repo.full_name,
        owner: { login: repo.owner.login },
        description: repo.description,
        html_url: repo.html_url,
        url: repo.url,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        git_url: repo.git_url,
        ssh_url: repo.ssh_url,
        clone_url: repo.clone_url,
        license: repo.license,
        visibility: repo.visibility,
        default_branch: repo.default_branch,
    };
};
