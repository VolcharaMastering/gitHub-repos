import { useAllReposStore } from "../../store/allReposStore";
import SortingTableField from "../../UI/SortingTableField/SortingTableField";
import DeleteButton from "../../UI/SpecialButtons/DeleteButton/DeleteButton";
import EditButton from "../../UI/SpecialButtons/EditButton/EditButton";
import TableCell from "../../UI/TableCell/TableCell";
import { tableConfig } from "./tableConfig";
import { useMemo } from "react";

import "./TheTable.scss";

const TheTable = () => {
    const { repositories } = useAllReposStore();

    const columnCount = useMemo(() => Object.keys(tableConfig).length + 2, []);

    const tableStyle = useMemo(
        () => ({ "--columns-number": columnCount }) as React.CSSProperties,
        [columnCount]
    );

    // Выносим повторяющуюся логику
    const configEntries = Object.entries(tableConfig);

    return (
        <div className="table">
            {/* Table Header */}
            <div className="table__rows" style={tableStyle}>
                {configEntries.map(([key, sortField]) => (
                    <SortingTableField
                        fieldTitle={sortField.label}
                        key={key}
                        valueKey={key as keyof Repository}
                        sortable={sortField.sortable}
                    />
                ))}
                <SortingTableField fieldTitle="Edit" valueKey="" sortable={false} />
                <SortingTableField fieldTitle="Delete" valueKey="" sortable={false} />
            </div>

            {/* Table Body */}
            {repositories.map((item) => (
                <div key={item.id} className="table__rows" style={tableStyle}>
                    {configEntries.map(([key]) => (
                        <TableCell
                            key={`${item.id}-${key}`}
                            value={item[key as keyof Repository]}
                            copyUrl={key.toLowerCase().includes("url")}
                            justify={key.toLowerCase().includes("url") ? "center" : undefined}
                        />
                    ))}
                    <div className="table-cell justify-center">
                        <EditButton repoName={item.name} />
                    </div>
                    <div className="table-cell justify-center">
                        <DeleteButton repoName={item.name} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TheTable;
