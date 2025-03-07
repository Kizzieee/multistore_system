import { useEffect } from "react";
import "../style.css";
import AccountLogin from "./AccountLogin";

function AccountModal(props) {
  const {
    show,
    onClose,
    isModalOpen,
    setIsModalOpen,
    justLoggedIn,
    setJustLoggedIn,
  } = props;

  const accountLoginProps = {
    isModalOpen,
    setIsModalOpen,
    justLoggedIn,
    setJustLoggedIn,
  };
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
        <div className={`modal-dialog modal-dialog-centered account-modal`}>
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
              <AccountLogin {...accountLoginProps} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountModal;
