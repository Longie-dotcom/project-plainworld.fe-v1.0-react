import './filter-toolbar.css';

import React from "react";

function FilterToolbar({ 
  filtersConfig = [], 
  pendingFilters, 
  onPendingChange, 
  onApply, 
}) {
  if (!filtersConfig.length) return null;

  return (
    <div className="filter-toolbar flex-row flex-wrap align-center gap-sm p-sm border-rounded">
      {filtersConfig.map((f) => {
        switch (f.type) {
          case "select":
            return (
              <select
                key={f.name}
                value={pendingFilters[f.name] || ""}
                onChange={(e) => onPendingChange(f.name, e.target.value)}
                className="input-field"
              >
                <option value="">All {f.label}</option>
                {f.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            );

          case "text":
            return (
              <input
                key={f.name}
                type="text"
                placeholder={`Search ${f.label}`}
                value={pendingFilters[f.name] || ""}
                onChange={(e) => onPendingChange(f.name, e.target.value)}
                className="input-field"
              />
            );

          case "date-range":
            return (
              <div key={f.name} className="date-range flex-row gap-xs">
                <input
                  type="date"
                  value={pendingFilters[f.name]?.from || ""}
                  onChange={(e) =>
                    onPendingChange(f.name, { ...pendingFilters[f.name], from: e.target.value })
                  }
                  className="input-field"
                />
                <input
                  type="date"
                  value={pendingFilters[f.name]?.to || ""}
                  onChange={(e) =>
                    onPendingChange(f.name, { ...pendingFilters[f.name], to: e.target.value })
                  }
                  className="input-field"
                />
              </div>
            );

          default:
            return null;
        }
      })}

      <button className="black-button ml-auto" onClick={onApply}>
        Apply
      </button>
    </div>
  );
}

export default FilterToolbar;
