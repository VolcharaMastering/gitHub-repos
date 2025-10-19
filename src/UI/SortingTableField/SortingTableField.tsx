import { useCallback, useState } from "react";
import { useAllReposStore } from "../../store/allReposStore";
import { useGitUserStore } from "../../store/gitUserStore";
import "./SortingTableField.scss";

type PropsSortingTableField = {
    fieldTitle: string;
    valueKey: string;
    sortable: boolean;
};

const SortingTableField = ({
    fieldTitle,
    valueKey,
    sortable,
}: PropsSortingTableField): React.ReactElement => {
    const [sortTable, setSortTable] = useState(true);
    const { gitLogin, gitToken } = useGitUserStore();
    const { getAllRepos } = useAllReposStore();

    const handleClick = useCallback(() => {
        if (!gitLogin || !gitToken || !sortable) return;
        const sortBy = valueKey;
        if (sortTable) {
            getAllRepos(gitLogin, gitToken, sortBy, "asc");
        } else {
            getAllRepos(gitLogin, gitToken, sortBy, "desc");
        }
        setSortTable(!sortTable);
    }, [sortTable, getAllRepos, gitLogin, gitToken, valueKey]);

    return (
        <label
            className={`sorting-field ${sortable ? "sortable" : ""}`}
            onClick={() => handleClick()}
        >
            <span className="sorting-field__title">{fieldTitle}</span>
        </label>
    );
};

export default SortingTableField;
