import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="button--close">
          <X size={24} />
        </button>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
}
