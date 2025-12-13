import ListView from "../list-view/list-view";
import DetailView from "../detail-view/detail-view";
import FilterToolbar from "../filter-toolbar/filter-toolbar";
import FormView from "../form-view/form-view";
import ConfirmBox from "../confirm-box/confirm-box";
import IconHover from "../icon-hover/icon-hover";

import './crud-page.css';

import React, { useState, useEffect } from "react";

function CrudPage({
  metadata,
  fetchList,
  fetchById,
  createEntity,
  updateEntity,
  deleteEntity,
  reload,

  columns = [],
  createConfig = {},
  updateConfig = {},
  detailFields = [],
  idField = "id",
  pageSize = 5,
  buildQueryParams,
  columnTemplate,
  rowActionConfig = [],
}) {
  // DATA
  const [data, setData] = useState([]);

  // FILTERS
  const [pendingFilters, setPendingFilters] = useState({});
  const [appliedFilters, setAppliedFilters] = useState({});

  // PAGINATION / SORTING
  const [sortBy, setSortBy] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  // MODAL STATES (single source of truth)
  const [creating, setCreating] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // FETCH LIST
  const fetchData = async () => {
    let params = {
      filters: appliedFilters,
      sortBy,
      pageIndex: currentPage,
      pageSize,
    };

    if (buildQueryParams) {
      params = buildQueryParams({
        filters: appliedFilters,
        sortBy,
        currentPage,
        pageSize,
      });
    }

    try {
      const list = await fetchList(params);
      setData(list);
      setIsLastPage(list.length < pageSize);
    } catch (err) {
      setData([]);
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [appliedFilters, sortBy, currentPage, reload]);

  // CRUD ACTION HANDLERS
  const handleDetail = async (item) => {
    const full = await fetchById(item[idField]);
    setSelectedItem(full);
  };

  const handleCreateSubmit = async (formData) => {
    await createEntity(formData);
    setCreating(false);
  };

  const handleUpdate = async (item) => {
    const full = await fetchById(item[idField]);
    setEditingItem(full);
  };

  const handleUpdateSubmit = async (formData) => {
    await updateEntity({ ...formData, id: editingItem[idField] });
    setEditingItem(null);
  };

  const handleDelete = (item) => {
    setDeletingItem(item);
  };

  const handleDeleteSubmit = async () => {
    await deleteEntity(deletingItem[idField]);
    setDeletingItem(null);
  };

  return (
    <div className="crud-page flex-col gap-lg">
      {/* HEADER */}
      <div className="crud-header">
        <div className="title">
          {metadata.title}
          <IconHover src={metadata.icon} allowHover={false} />
        </div>
        {metadata.description && <p className="crud-description">{metadata.description}</p>}

        {metadata.meta && (
          <div className="crud-meta flex-row gap-sm">
            {metadata.meta.map((m, i) => (
              <span key={i} className="crud-meta-item">
                <strong>{m.label}:</strong> {m.value}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* FILTER TOOLBAR */}
      <FilterToolbar
        filtersConfig={columns
          .filter((c) => c.filterable)
          .map((c) => ({
            name: c.key,
            label: c.label,
            type: c.filterType || "text",
            options: c.options || [],
          }))}
        pendingFilters={pendingFilters}
        onPendingChange={(name, value) =>
          setPendingFilters((prev) => ({ ...prev, [name]: value }))
        }
        onApply={() => {
          setAppliedFilters(pendingFilters);
          setCurrentPage(1);
        }}
      />

      {/* ACTIVE FILTER CHIP LIST */}
      <div className="flex-row flex-wrap">
        {Object.entries(appliedFilters).map(([key, value]) => {
          if (!value || value === "" || (typeof value === "object" && !value.from && !value.to))
            return null;

          return (
            <div
              key={key}
              className="filter-chip"
              onClick={() => {
                setAppliedFilters((prev) => ({ ...prev, [key]: "" }));
                setPendingFilters((prev) => ({ ...prev, [key]: "" }));
              }}
            >
              {key}: {typeof value === "object" ? `${value.from || ""} → ${value.to || ""}` : value}
            </div>
          );
        })}
        <span className="info-chip">Page size: {pageSize}</span>
      </div>

      {/* CREATE BUTTON */}
      <button className="blue-button float-button" onClick={() => setCreating(true)}>
        Create {metadata.entityName}
      </button>

      {/* TABLE */}
      <ListView
        data={data}
        columns={columns}
        sortBy={sortBy}
        onSort={(key) => {
          const col = columns.find((c) => c.key === key);
          setSortBy(col?.sortKey || key);
        }}
        onEdit={handleUpdate}
        onDelete={handleDelete}
        onDetail={handleDetail}
        fetchById={fetchById}
        idField={idField}
        rowActionConfig={rowActionConfig}
        columnTemplate={columnTemplate}
      />

      {/* PAGINATION */}
      <div className="flex-row flex-center gap-md mt-md">
        <button
          className="white-button disable-button"
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          ‹ Prev
        </button>

        <span>Page {currentPage}</span>

        <button
          className="white-button disable-button"
          onClick={() => setCurrentPage(p => p + 1)}
          disabled={isLastPage}
        >
          Next ›
        </button>
      </div>

      {/* CREATE FORM */}
      <FormView
        visible={creating}
        onClose={() => setCreating(false)}
        fields={createConfig.fields}
        onSubmit={handleCreateSubmit}
        title="Create Form"
      />

      {/* UPDATE FORM */}
      <FormView
        visible={!!editingItem}
        onClose={() => setEditingItem(null)}
        fields={updateConfig.fields}
        initialData={editingItem}
        onSubmit={handleUpdateSubmit}
        title="Update Form"
      />

      {/* DELETE CONFIRM */}
      <ConfirmBox
        visible={!!deletingItem}
        message="Are you sure you want to delete this?"
        onConfirm={handleDeleteSubmit}
        onCancel={() => setDeletingItem(null)}
      />

      {/* DETAIL VIEW */}
      <DetailView
        visible={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title={`${metadata.entityName} Detail`}
        fields={detailFields}
        data={selectedItem}
      />
    </div>
  );
}

export default CrudPage;
