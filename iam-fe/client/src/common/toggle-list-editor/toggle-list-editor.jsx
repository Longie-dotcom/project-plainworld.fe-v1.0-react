import Modal from "../modal/modal";

import "./toggle-list-editor.css";

import { useEffect, useState } from "react";

function ToggleListEditor({
  title,
  entity,
  sourceKey,
  idKey,
  valueKey = null,
  options,
  onSubmit,
  onClose,
  falseValue,
  trueValue
}) {
  const [items, setItems] = useState([]);
  const [availableSearch, setAvailableSearch] = useState("");
  const [selectedSearch, setSelectedSearch] = useState("");

  // Initialize
  useEffect(() => {
    const src = entity?.[sourceKey] || [];
    const initial = src.map(s => ({
      id: s[idKey],
      value: valueKey ? s[valueKey] : true
    }));
    setItems(initial);
  }, [entity, sourceKey, idKey, valueKey]);

  const selectedIDs = items.map(i => i.id);

  const availableList = options
    .filter(opt => !selectedIDs.includes(opt.value))
    .filter(opt => opt.label.toLowerCase().includes(availableSearch.toLowerCase()));

  const selectedList = options
    .filter(opt => selectedIDs.includes(opt.value))
    .filter(opt => opt.label.toLowerCase().includes(selectedSearch.toLowerCase()));

  const addItem = (id) => {
    setItems(prev => [
      ...prev,
      { id, value: valueKey ? true : true }
    ]);
  };

  const toggleItem = (id) => {
    if (!valueKey) return; // ignore if no toggle needed
    setItems(prev =>
      prev.map(i =>
        i.id === id ? { ...i, value: !i.value } : i
      )
    );
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const handleSave = () => {
    if (valueKey) {
      onSubmit(
        items.map(i => ({
          [idKey]: i.id,
          [valueKey]: i.value
        }))
      );
    } else {
      onSubmit(items.map(i => i.id));
    }
  };

  return (
    <Modal width="70vw" visible={true} onClose={onClose}>
      <h2 className="popup-title">{title}</h2>

      <div className="dual-lists scroll-hidden">
        {/* LEFT: Available */}
        <div className="list-column">
          <h3>Available</h3>
          <input
            type="text"
            placeholder="Search..."
            value={availableSearch}
            onChange={(e) => setAvailableSearch(e.target.value)}
            className="search-input mb-sm"
          />
          <ul className="item-list scroll-list">
            {availableList.map(opt => (
              <li key={opt.value} className="clickable" onClick={() => addItem(opt.value)}>
                {opt.label}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT: Selected */}
        <div className="list-column">
          <h3>Selected</h3>
          <input
            type="text"
            placeholder="Search..."
            value={selectedSearch}
            onChange={(e) => setSelectedSearch(e.target.value)}
            className="search-input mb-sm"
          />
          <ul className="item-list scroll-list">
            {selectedList.map(opt => {
              const item = items.find(i => i.id === opt.value);
              return (
                <li key={opt.value} className="selected-item">
                  <span>{opt.label}</span>
                  <div className="item-buttons">
                    {valueKey && (
                      <button
                        className={`toggle-button ${item.value ? "toggle-on" : "toggle-off"}`}
                        onClick={() => toggleItem(opt.value)}
                      >
                        {item.value ? trueValue : falseValue}
                      </button>
                    )}
                    <button className="blue-button" onClick={() => removeItem(opt.value)}>Remove</button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="popup-actions">
        <button className="black-button" onClick={handleSave}>Save</button>
        <button className="black-button" onClick={onClose}>Cancel</button>
      </div>
    </Modal>
  );
}

export default ToggleListEditor;
