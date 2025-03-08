import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import milkshake from "../Assets/milkshake.jpg";
import { GlobalContext } from "../GlobalContext";
import renderErrorMessages from "../errorHelper";
import { createFeedback } from "../services/feedbackService";
import "../style.css";

const AccountPurchaseHistory = () => {
  const { orders, setOrders } = useContext(GlobalContext);
  const [error, setError] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const activeOrders = orders.filter(
    (order) => order?.status !== "Completed" && order?.status !== "Rejected"
  );
  const pastOrders = orders.filter(
    (order) => order?.status === "Completed" || order?.status === "Rejected"
  );

  const handleSubmitFeedback = async () => {
    try {
      await createFeedback({
        order: selectedOrder?.id,
        rating: rating,
        description: comment,
      });

      setOrders((prev) =>
        prev.map((order) =>
          order.id === selectedOrder.id
            ? { ...order, has_submitted_feedback: true }
            : order
        )
      );
      setShowFeedbackModal(false);
      setSelectedOrder(null);
      setRating(0);
      setComment("");
    } catch (error) {
      setError(error);
    }
  };

  const handleCancelCreateFeedback = () => {
    setSelectedOrder(null);
    setRating(0);
    setComment("");
    setShowFeedbackModal(false);
  };

  if (orders.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        No orders yet.
      </div>
    );
  }

  return (
    <div className="d-flex flex-row gap-2">
      {/* Active Orders */}
      <div className="col-6 d-flex flex-column gap-2">
        <h4>Active orders</h4>
        {activeOrders.map((order) => (
          <div
            className="col-12 active-order d-flex flex-column"
            key={order?.id}
          >
            <div className="d-flex flex-row gap-3">
              <img src={milkshake} alt="Order" />
              <div className="w-100 d-flex flex-row justify-content-between">
                <div className="d-flex flex-column justify-content-between">
                  <small>Order from</small>
                  <h5>{order?.store?.display_name}</h5>
                  <small>Status: {order?.status}</small>
                  <small>Order# {order?.id}</small>
                  <div>
                    <h6>Order Summary</h6>
                    {order?.items.map((item) => (
                      <p key={item?.id}>
                        <span>{item?.product?.name}</span>
                        <span className="float-end">
                          ₱{item?.product?.price} x {item?.quantity} = ₱
                          {item?.product?.price * item?.quantity}
                        </span>
                      </p>
                    ))}
                    <p>
                      Delivery Fee:{" "}
                      <span className="float-end">
                        ₱{order?.store?.delivery_fee}
                      </span>
                    </p>
                    <p className="fw-bold">
                      Total:{" "}
                      <span className="float-end">₱{order?.total_price}</span>
                    </p>
                  </div>
                </div>
                <div className="col-4 text-end mt-4">
                  <h5>&#8369; {order?.total_price}</h5>
                </div>
              </div>
            </div>
            {/* <div className="d-flex flex-row justify-content-end gap-3">
              <button
                className="main-btn-outline-primary"
                data-bs-toggle="modal"
                data-bs-target="#viewOrder"
              >
                View order
              </button>
              <ViewOrder key={order?.id} order={order} />
            </div> */}
          </div>
        ))}
      </div>

      {/* Past Orders */}
      <div className="col-6 d-flex flex-column gap-2">
        <h4>Past orders</h4>
        {pastOrders.map((order) => (
          <div
            className="col-12 active-order d-flex flex-column"
            key={order?.id}
          >
            <div className="d-flex flex-row gap-3">
              <img src={milkshake} alt="Order" />
              <div className="w-100 d-flex flex-row justify-content-between">
                <div className="d-flex flex-column justify-content-between">
                  <small>Order from</small>
                  <h5>{order?.store?.display_name}</h5>
                  <small>Status: {order?.status}</small>
                  <small>Order# {order?.id}</small>
                  <div>
                    <h6>Order Summary</h6>
                    {order?.items.map((item) => (
                      <p key={item?.id}>
                        <span>{item?.product?.name}</span>
                        <span className="float-end">
                          ₱{item?.product?.price} x {item?.quantity} = ₱
                          {item?.product?.price * item?.quantity}
                        </span>
                      </p>
                    ))}
                    <p>
                      Delivery Fee:{" "}
                      <span className="float-end">
                        ₱{order?.store?.delivery_fee}
                      </span>
                    </p>
                    <p className="fw-bold">
                      Total:{" "}
                      <span className="float-end">₱{order?.total_price}</span>
                    </p>
                  </div>
                </div>
                <div className="col-4 text-end mt-4">
                  <h5>&#8369; {order?.total_price}</h5>
                </div>
              </div>
            </div>
            {order.status === "Completed" && !order.has_submitted_feedback && (
              <button
                className="btn btn-sm btn-warning mt-2"
                onClick={() => {
                  setSelectedOrder(order);
                  setShowFeedbackModal(true);
                }}
              >
                Add Feedback
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Feedback Modal */}
      <Modal
        show={showFeedbackModal && selectedOrder}
        onHide={handleCancelCreateFeedback}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Rate Your Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Rating</label>
            <div className="d-flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <i
                  key={star}
                  className={`bi ${
                    star <= rating ? "bi-star-fill" : "bi-star"
                  }`}
                  style={{
                    color: "yellow",
                    textShadow:
                      "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
                    cursor: "pointer",
                    fontSize: "1.5rem",
                  }}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Comment (optional)</label>
            <textarea
              className="form-control"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          {error && renderErrorMessages(error)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelCreateFeedback}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSubmitFeedback}>
            Submit Feedback
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AccountPurchaseHistory;
