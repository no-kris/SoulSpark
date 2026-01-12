import Button from "../../components/Button/Button";

export default function ConfirmDeleteModal({
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Delete",
  onConfirm,
  onClose,
}) {
  return (
    <div className="confirm-modal">
      <h3 className="confirm-modal__title">{title}</h3>
      <p className="confirm-modal__message">{message}</p>
      <div className="confirm-modal__actions">
        <Button
          text="Cancel"
          onClick={onClose}
          className="button button--cancel"
        />
        <Button
          text={confirmText}
          onClick={onConfirm}
          className="button button--danger"
        />
      </div>
    </div>
  );
}
