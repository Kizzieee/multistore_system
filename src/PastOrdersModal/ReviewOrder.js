import { useState, useEffect } from "react";
import milkshake from "../Assets/milkshake.jpg";
import "../style.css";
import { Modal } from "bootstrap";
import ReviewAppreciation from "./ReviewAppreciation";

function ReviewOrder() {
  const [review, setReview] = useState("");
  const maxChars = 200;
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const reviewOrderModalElement = document.getElementById("reviewOrder");
    if (!reviewOrderModalElement) return;

    const reviewOrderModal = Modal.getOrCreateInstance(reviewOrderModalElement);
    
    const handleHidden = () => {
      if (isSubmitted) {
        const reviewAppreciationModal = Modal.getOrCreateInstance(
          document.getElementById("reviewAppreciation")
        );
        reviewAppreciationModal.show();
        setIsSubmitted(false); // Reset after showing
      }
    };

    reviewOrderModalElement.addEventListener("hidden.bs.modal", handleHidden);

    return () => {
      reviewOrderModalElement.removeEventListener("hidden.bs.modal", handleHidden);
    };
  }, [isSubmitted]);

  const handleReviewSubmit = () => {
    setIsSubmitted(true);
    const reviewOrderModal = Modal.getInstance(document.getElementById("reviewOrder"));
    if (reviewOrderModal) {
      reviewOrderModal.hide();
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="reviewOrder"
        tabIndex="-1"
        aria-labelledby="reviewOrderLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-orders">
          <div className="modal-content">
            <div className="modal-header">
              <div className="d-flex flex-row gap-3">
                <div className="review-order">
                  <img src={milkshake} alt="Milkshake" />
                </div>
                <div>
                  <h5 className="m-0">I Love Burger</h5>
                  <small>Fri, February 21, 2025, 7:32 PM</small>
                </div>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body d-flex flex-column gap-1 justify-content-between">
              <div className="mb-2 border rounded p-2 d-flex flex-row align-items-center gap-1">
                <h6 className="me-5 p-0 m-0">You rate</h6>
                <div className="m-0 p-0 d-flex flex-row gap-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <i
                      key={i}
                      className={`bi ${
                        (hover || rating) > i
                          ? "bi-star-fill text-warning"
                          : "bi-star"
                      } review-star`}
                      onMouseEnter={() => setHover(i + 1)}
                      onMouseLeave={() => setHover(0)}
                      onClick={() => setRating(i + 1)}
                      style={{ cursor: "pointer" }}
                    ></i>
                  ))}
                </div>
              </div>

              <div className="mt-3">
                <label className="h6">
                  Tell others more about this restaurant
                </label>
                <textarea
                  className="form-control mt-2"
                  placeholder="Write a review"
                  rows="3"
                  maxLength={maxChars}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                ></textarea>
                <div className="text-end small text-muted">
                  {review.length}/{maxChars}
                </div>
              </div>
            </div>

            <div className="modal-footer border-0">
              <button
                type="submit"
                className="main-btn-primary w-100"
                onClick={handleReviewSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <ReviewAppreciation />
    </>
  );
}

export default ReviewOrder;
