export default function Modal({ open, message, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{message}</p>

        <div className="modal-actions">
          <button className="btn danger" onClick={onConfirm}>
            Yes, Delete
          </button>
          <button className="btn secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
