import Modal from "../modal/modal";

import './confirm-box.css';

import React, { useEffect } from "react";

function ConfirmBox({
  visible,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  onConfirm,
  onCancel,
  autoClose = false,
  duration = 5000,
}) {
  useEffect(() => {
    if (!autoClose || !visible) return;
    const timer = setTimeout(() => onCancel?.(), duration);
    return () => clearTimeout(timer);
  }, [autoClose, duration, visible, onCancel]);

  if (!visible) return null;

  return (
    <Modal visible={visible} onClose={onCancel}>
      <div className="flex-col flex-col-center p-md">
        <h2 className="my-md">{title}</h2>

        <div className="mb-md">{message}</div>

        <div className="flex-row flex-between mt-md">
          <button className="black-button" onClick={onConfirm}>
            Yes
          </button>
          <button className="black-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmBox;
