import "../styles//Modal.css"; // Add your own styles for the modal
import PropTypes from "prop-types";
const Modal = ({ isVisible, message, onConfirm, onCancel }) => {
  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content w-25">
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};
Modal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
export default Modal;
