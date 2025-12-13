import IconHover from "../icon-hover/icon-hover";

import Close from '../../assets/icon/square-x.png';
import CloseContrast from '../../assets/icon/square-x-1.png';
import "./modal.css";

import React from "react";

function Modal({ visible, onClose, children, width, maxWidth }) {
  if (!visible) return null;

  return (
    <div className="modal-wrapper">
      <div className="modal-overlay" onClick={onClose}></div>

      <div
        className="modal-container"
        style={{
          width: width || undefined,
          maxWidth: maxWidth || undefined,
        }}
      >

        <IconHover className="modal-close-btn" onClick={onClose} src={Close} hoverSrc={CloseContrast} />

        <div className="modal-content-area">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
