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
  const [openOrderId, setOpenOrderId] = useState(null);

  const toggleOrder = (orderId) => {
    setOpenOrderId(openOrderId === orderId ? null : orderId);
  };

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
              <div className="w-100 d-flex flex-row  justify-content-between">
                <div className="d-flex flex-column justify-content-between">
                  <small>Order from</small>
                  <h5>{order?.store?.display_name}</h5>
                  <small
                    className={`${
                      order?.status === "Rejected" ? "text-danger" : ""
                    } d-flex flex-column`}
                  >
                    Status: {order?.status}
                  </small>
                  {order?.type === "Pick Up" ? (
                    <small className="d-flex flex-column">
                      <span>Type: {order?.type}</span>
                      <span>
                        Pick Up On:{" "}
                        {new Date(order?.pick_up_datetime).toLocaleString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          }
                        )}
                      </span>
                    </small>
                  ) : (
                    <small className="d-flex">Type: {order?.type}</small>
                  )}
                  <small>Order# {order?.id}</small>
                </div>
                <div className="col-4 text-end mt-4">
                  <h5>&#8369; {order?.total_price}</h5>
                </div>
              </div>
            </div>
            <div>
              <button
                className="delivery-dropdown-order-list"
                onClick={() => toggleOrder(order?.id)}
              >
                {openOrderId === order?.id
                  ? "Hide Order Summary  ▲"
                  : "Show Order Summary ▼"}
              </button>

              {openOrderId === order?.id && (
                <div className="mt-3 p-2 border rounded">
                  {order?.items.map((item) => (
                    <p key={item?.id}>
                      <span>{item?.product?.name}</span>
                      <span className="float-end">
                        ₱{item?.product?.price} x {item?.quantity} = ₱
                        {item?.product?.price * item?.quantity}
                      </span>
                    </p>
                  ))}
                  <p className="fw-bold">
                    Subtotal:{" "}
                    <span className="float-end">
                      ₱
                      {order?.items?.reduce(
                        (acc, item) =>
                          acc + item?.product?.price * item?.quantity,
                        0
                      )}
                    </span>
                  </p>
                  <p className="border-bottom">
                    Delivery Fee:
                    <span className="float-end">
                      ₱{order?.store?.delivery_fee}
                    </span>
                  </p>
                  <p className="fw-bold">
                    TOTAL:
                    <span className="float-end">₱{order?.total_price}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Past Orders */}
      <div className="col-6 d-flex flex-column gap-2">
        <h4>Past orders</h4>
        {pastOrders.map((order) => (
          <div
            className={`col-12 ${
              order?.status === "Rejected"
                ? "past-order-rejected"
                : "past-order"
            } d-flex flex-column`}
            key={order?.id}
          >
            <div className="d-flex flex-row gap-3">
              <img src={order?.store?.image} alt={order?.store?.name} />
              <div className="w-100 d-flex flex-row  justify-content-between">
                <div className="d-flex flex-column justify-content-between">
                  <small>Order from</small>
                  <h5>{order?.store?.display_name}</h5>
                  <small
                    className={`${
                      order?.status === "Rejected" ? "text-danger" : ""
                    } d-flex flex-column`}
                  >
                    Status: {order?.status}
                  </small>
                  {order?.type === "Pick Up" ? (
                    <small className="d-flex flex-column">
                      <span>Type: {order?.type}</span>
                      <span>
                        Pick Up On:{" "}
                        {new Date(order?.pick_up_datetime).toLocaleString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          }
                        )}
                      </span>
                    </small>
                  ) : (
                    <small className="d-flex">Type: {order?.type}</small>
                  )}
                  <small>Order# {order?.id}</small>
                </div>
                <div className="col-4 text-end mt-4">
                  <h5>&#8369; {order?.total_price}</h5>
                </div>
              </div>
            </div>
            {/* Past-order Summary */}
            <div>
              <button
                className="delivery-dropdown-order-list"
                onClick={() => toggleOrder(order?.id)}
              >
                {openOrderId === order?.id
                  ? "Hide Order Summary  ▲"
                  : "Show Order Summary ▼"}
              </button>

              {openOrderId === order?.id && (
                <div className="mt-3 p-2 border rounded">
                  {order?.items.map((item) => (
                    <p key={item?.id}>
                      <span>{item?.product?.name}</span>
                      <span className="float-end">
                        ₱{item?.product?.price} x {item?.quantity} = ₱
                        {item?.product?.price * item?.quantity}
                      </span>
                    </p>
                  ))}
                  <p className="fw-bold">
                    Subtotal:{" "}
                    <span className="float-end">
                      ₱
                      {order?.items?.reduce(
                        (acc, item) =>
                          acc + item?.product?.price * item?.quantity,
                        0
                      )}
                    </span>
                  </p>
                  <p className="border-bottom">
                    Delivery Fee:
                    <span className="float-end">
                      ₱{order?.store?.delivery_fee}
                    </span>
                  </p>
                  <p className="fw-bold">
                    TOTAL:
                    <span className="float-end">₱{order?.total_price}</span>
                  </p>
                </div>
              )}
            </div>

            {order.status === "Completed" && order.has_submitted_feedback && (
              <small>
                You rated this:{" "}
                {(() => {
                  if (order?.feedbacks[0]?.rating === 0) {
                    return (
                      <i
                        className="bi bi-star"
                        style={{
                          color: "#ff8427",
                          textShadow:
                            "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
                        }}
                      ></i>
                    );
                  } else if (order?.feedbacks[0]?.rating < 5) {
                    return (
                      <i
                        className="bi bi-star-half"
                        style={{
                          color: "#ff8427",
                          textShadow:
                            "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
                        }}
                      ></i>
                    );
                  } else if (order?.feedbacks[0]?.rating === 5) {
                    return (
                      <i
                        className="bi bi-star-fill"
                        style={{
                          color: "#ff8427",
                          textShadow:
                            "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
                        }}
                      ></i>
                    );
                  }
                })()}{" "}
                {order?.feedbacks[0]?.rating}
              </small>
            )}

            {/* Add Feedback - the button will only show when the order is complete */}
            {order.status === "Completed" && !order.has_submitted_feedback && (
              <button
                className="main-btn-primary"
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
                    color: "#ff8427",
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
          <Button
            className="p-2"
            variant="secondary"
            onClick={handleCancelCreateFeedback}
          >
            Cancel
          </Button>
          <Button className="main-btn-primary" onClick={handleSubmitFeedback}>
            Submit Feedback
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AccountPurchaseHistory;
