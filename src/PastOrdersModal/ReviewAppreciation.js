import { Modal } from "bootstrap";

function ReviewAppreciation() {
  const handleClose = () => {
    const modalEl = document.getElementById("reviewAppreciation");
    const reviewAppreciationModal = Modal.getInstance(modalEl);

    if (reviewAppreciationModal) {
      reviewAppreciationModal.hide();
    }

    // Ensure modal backdrop disappears
    setTimeout(() => {
      document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
        backdrop.remove();
      });
      document.body.classList.remove("modal-open");
    }, 300); // Delay to allow Bootstrap's hide transition
  };

  return (
    <div
      className="modal fade"
      id="reviewAppreciation"
      tabIndex="-1"
      aria-labelledby="reviewAppreciationLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-orders">
        <div className="modal-content">
          <div className="modal-header d-flex flex-column">
            <h5 className="m-0">I Love Burger - Allen</h5>
            <small>Delivered Fri, Feb 21, 2025, 7:32 PM</small>
          </div>
          <div className="modal-body text-center">
            <i className="bi-star-fill text-warning h1" />
            <h5 className="my-3">Thank you for your review!</h5>
            <p>
              You've helped countless food lovers make their choice today.
              Thanks for sharing your experience on the community!
            </p>
          </div>
          <div className="modal-footer m-0 pt-0 pb-3 border-0">
            <button
              type="button"
              className="main-btn-primary w-100"
              onClick={handleClose}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewAppreciation;
