import Modal from "../modal/modal";

import './detail-view.css';

import React from "react";

function DetailView({ visible, onClose, title = "Detail", fields = [], data }) {
  if (!visible || !data) return null;

  return (
    <Modal visible={visible} onClose={onClose}>
      <h2 className="detail-title mb-md">{title}</h2>

      <div className="modal-body scroll-hidden flex-col gap-sm">
        {fields.map((f) => {
          const value = data[f.key];

          if (f.type === "list" && Array.isArray(value)) {
            return (
              <div key={f.key} className={`flex-col gap-xs ${f.listClass || ""}`}>
                <strong>{f.label}:</strong>
                {value.map((item, idx) => (
                  <div key={idx} className={f.itemClass || "flex-row gap-xs"}>
                    {f.renderItem ? f.renderItem(item) : JSON.stringify(item)}
                  </div>
                ))}
              </div>
            );
          }

          return (
            <div key={f.key} className="detail-row flex-row justify-between gap-sm">
              <strong>{f.label}: </strong>
              <span>{f.transform ? f.transform(value) : value}</span>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

export default DetailView;
