import { useEffect } from "react";
import "../style.css";
import Account_Login from "./Account_Login";

function AccountModal({ show, onClose, isModalOpen, setIsModalOpen }) {
  useEffect(() => {
    if (show) {
      document.body.classList.add("modal-open"); // Prevent scrolling when modal is open
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open"); // Cleanup on unmount
    };
  }, [show]);

  if (!show) return null; // Prevent rendering if not visible

  return (
    <>
      {/* Backdrop Overlay */}
      <div className="modal-backdrop fade show"></div>

      {/* Modal */}
      <div
        className={`modal fade show d-block d-flex justify-content-center`}
        tabIndex="-1"
      >
        <div className={`modal-dialog account-modal`}>
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title"> </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <Account_Login
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountModal;
