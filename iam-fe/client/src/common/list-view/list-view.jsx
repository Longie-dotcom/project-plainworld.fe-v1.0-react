import IconHover from "../icon-hover/icon-hover";

import EditIcon from '../../assets/icon/square-pen.png';
import EditIconContrast from '../../assets/icon/square-pen-1.png';
import DeleteIcon from '../../assets/icon/trash.png';
import DeleteIconContrast from '../../assets/icon/trash-1.png';
import DetailIcon from '../../assets/icon/list-collapse.png';
import DetailIconContrast from '../../assets/icon/list-collapse-1.png';
import "./list-view.css";

import React from "react";

function ListView({
    data = [],
    columns = [],
    onEdit,
    onDelete,
    onDetail,
    sortBy,
    onSort,
    fetchById,
    idField,
    rowActionConfig = [],
    columnTemplate
}) {
    // Build a template string for grid columns
    const gridTemplateColumns =
        columnTemplate ||
        columns.map(() => "minmax(auto, 1fr)").join(" ") + " 150px";

    return (
        <div className="list-view">
            {/* Header */}
            <div
                className="list-header"
                style={{ gridTemplateColumns }}
            >
                {columns.map((col) => (
                    <div
                        key={col.key}
                        className={`column-header ${col.sortable ? "sortable" : ""}`}
                        onClick={() => col.sortable && onSort(col.sortKey || col.key)}
                    >
                        {col.label} {sortBy === (col.sortKey || col.key) ? "▲" : ""}
                    </div>
                ))}
                <div className="column-header">Actions</div>
            </div>

            {/* Data rows */}
            {data && data.length > 0 ? (
                data.map((item, rowIndex) => {
                    const rowKey = item[idField] || rowIndex;
                    return (
                        <div
                            key={rowKey}
                            className={`list-row ${item.hasOwnProperty("isActive") && item.isActive === false ? "inactive-row" : ""}`}
                            style={{ gridTemplateColumns }}
                        >
                            {columns.map((col, colIndex) => (
                                <div
                                    key={`${rowKey}-${col.key}-${colIndex}`}
                                    className="column-cell"
                                >
                                    {item[col.key]}
                                </div>
                            ))}

                            <div className="list-actions">
                                {onEdit &&
                                    <IconHover
                                        onClick={() => onEdit(item)}
                                        className="action-icon"
                                        hoverSrc={EditIconContrast}
                                        src={EditIcon}
                                    />
                                }
                                {onDelete &&
                                    <IconHover
                                        onClick={() => onDelete(item)}
                                        className="action-icon"
                                        hoverSrc={DeleteIconContrast}
                                        src={DeleteIcon}
                                    />
                                }
                                {onDetail &&
                                    <IconHover
                                        onClick={() => onDetail(item)}
                                        className="action-icon"
                                        hoverSrc={DetailIconContrast}
                                        src={DetailIcon}
                                    />
                                }

                                {rowActionConfig.map((action, actionIndex) => (
                                    <button
                                        key={`${rowKey}-${action.label}-${actionIndex}`}
                                        onClick={async () => {
                                            const rowData = await fetchById(item[idField]);
                                            action.onClick(rowData);
                                        }}
                                        className={`black-button ${action.className || ""}`}
                                    >
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="list-empty">No data available</div>
            )}
        </div>
    );
}

export default ListView;
