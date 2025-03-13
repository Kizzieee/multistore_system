import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import renderErrorMessages from "../errorHelper";
import {
  fetchStoreMyOrders,
  updateOrderStatus,
} from "../services/orderService";

function OrdersV2() {
  const orderStatuses = [
    "New",
    "Accepted",
    "Being Prepared",
    "Out For Delivery",
    "Ready For Pick Up",
    "Completed",
    "Rejected",
  ];

  const [orders, setOrders] = useState([]);
  const [orderUpdated, setOrderUpdated] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isUpdatingOrderStatus, setIsUpdatingOrderStatus] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedFeedbackOrder, setSelectedFeedbackOrder] = useState(null);
  const [openOrderId, setOpenOrderId] = useState(null);
  const [show, setShow] = useState(false);

  const toggleOrder = (orderId) => {
    setOpenOrderId(openOrderId === orderId ? null : orderId);
  };

  const handleClose = () => setShow(false);
  const handleShow = (order) => {
    setSelectedOrder(order); // Set the selected order
    setShow(true);
  };

  useEffect(() => {
    const fetchMyStoreOrders = async () => {
      try {
        setIsLoading(true);
        const myStoreOrders = await fetchStoreMyOrders();
        setOrders(myStoreOrders);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyStoreOrders();
  }, [orderUpdated]);

  const handleShowModal = (order) => {
    setSelectedOrder(order);
    setSelectedStatus(""); // Reset selected status
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
    setSelectedStatus("");
  };

  const handleUpdateStatus = async () => {
    setIsUpdatingOrderStatus(true);
    if (!selectedOrder || !selectedStatus) return;

    try {
      await updateOrderStatus(selectedOrder.id, selectedStatus);
      setOrderUpdated((prev) => !prev);
      handleCloseModal();
    } catch (error) {
      setError(error);
    } finally {
      setIsUpdatingOrderStatus(false);
    }
  };

  const handleViewFeedbacks = (order) => {
    setSelectedFeedbackOrder(order);
    setShowFeedbackModal(true);
  };

  const handleCloseFeedbackModal = () => {
    setShowFeedbackModal(false);
    setSelectedFeedbackOrder(null);
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        {renderErrorMessages(error)}
      </div>
    );
  }

  return (
    <div className="container-fluid mt-5">
      <div className="col-10 m-auto py-4 mt-5">
        <Tabs fill variant="pills" defaultActiveKey="New" id="orders-tabs">
          {orderStatuses.map((status) => (
            <Tab eventKey={status} title={status} key={status}>
              <div className="orders-grid">
                {orders
                  .filter((order) => order?.status === status)
                  .map((order) => (
                    <Card className="mt-3 card-grid" key={order?.id}>
                      <Card.Header className="d-flex justify-content-between">
                        <div> Order #{order?.id} </div>
                        <div>
                          {new Date(order?.created_at).toLocaleString()}
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <Card.Text>
                          <strong>Customer: {order?.user?.name}</strong>
                        </Card.Text>
                        <Card.Text>
                          <strong>Address: {order?.user?.address}</strong>
                        </Card.Text>
                        <Card.Text>
                          <span>Type: {order?.type}</span>
                        </Card.Text>
                        <ListGroup variant="flush">
                          <div className="p-2 border rounded">
                            TOTAL:
                            <span className="float-end">
                              ₱{order?.total_price}
                            </span>
                          </div>
                        </ListGroup>
                        <div className="d-flex flex-row gap-2 mt-3">
                          {order?.status !== "Rejected" &&
                            order?.status !== "Completed" && (
                              <Button
                                variant="outline-secondary"
                                onClick={() => handleShowModal(order)}
                                // className=" main-btn-outline-primary"
                              >
                                Update Status
                              </Button>
                            )}
                          {order?.status === "Completed" && (
                            <Button
                              variant="outline-success"
                              onClick={() => handleViewFeedbacks(order)}
                              className=" ms-2"
                            >
                              View Feedback
                            </Button>
                          )}
                          <Button
                            className="main-btn-primary"
                            onClick={() => handleShow(order)}
                          >
                            View Order
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
              </div>
            </Tab>
          ))}
        </Tabs>
      </div>

      {/* View Orders Modal */}
      <Modal show={show} onHide={handleClose} className="orders-modal" centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Details #{selectedOrder?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder?.type === "Pick Up" ? (
            <strong className="d-flex flex-column">
              Type: {selectedOrder?.type} (
              {new Date(selectedOrder?.pick_up_datetime).toLocaleString(
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
              )
            </strong>
          ) : (
            <strong className="d-flex flex-column">
              Type: {selectedOrder?.type}
            </strong>
          )}
          {selectedOrder ? (
            <div>
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder?.items.map((item) => (
                    <tr key={item?.id}>
                      <td>{item?.product?.name}</td>
                      <td>{item?.quantity}</td>
                      <td>{item?.product?.price} </td>
                      <td>₱ {item?.product?.price * item?.quantity}</td>
                    </tr>
                  ))}
                  <tr className="border-top">
                    <td colSpan={3}>Subtotal</td>
                    <td>
                      ₱{" "}
                      {selectedOrder?.items?.reduce(
                        (acc, item) =>
                          acc + item?.product?.price * item?.quantity,
                        0
                      )}
                    </td>
                  </tr>
                  {selectedOrder?.type === "Delivery" && (
                    <tr>
                      <td colSpan={3}>Delivery Fee</td>
                      <td>₱ {selectedOrder?.store?.delivery_fee}</td>
                    </tr>
                  )}
                  <tr className="table-warning">
                    <td colSpan={3}>
                      <strong>TOTAL</strong>
                    </td>
                    <td>₱ {selectedOrder?.total_price}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p>No order selected</p>
          )}
        </Modal.Body>
      </Modal>

      {/* Update Status Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Select New Status</Form.Label>
              <Form.Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">Select a status</option>
                {orderStatuses
                  .filter((status) => {
                    if (selectedOrder?.status === "New") {
                      return status === "Accepted" || status === "Rejected";
                    }
                    if (selectedOrder?.status === "Accepted") {
                      return status === "Being Prepared";
                    }
                    if (selectedOrder?.status === "Being Prepared") {
                      if (selectedOrder?.type === "Pick Up")
                        return status === "Ready For Pick Up";
                      return status === "Out For Delivery";
                    }
                    if (
                      selectedOrder?.status === "Out For Delivery" ||
                      selectedOrder?.status === "Ready For Pick Up"
                    ) {
                      return status === "Completed";
                    }
                    if (selectedOrder?.status === "Rejected") {
                      return null;
                    }
                    return true;
                  })
                  .map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={handleUpdateStatus}
            disabled={!selectedStatus || isUpdatingOrderStatus}
          >
            Confirm Update
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Feedback Modal */}
      <Modal
        show={showFeedbackModal}
        onHide={handleCloseFeedbackModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Feedback for Order #{selectedFeedbackOrder?.id}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "60vh", overflowY: "auto" }}>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Rating</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {selectedFeedbackOrder?.feedbacks?.map((feedback) => (
                <tr key={feedback?.id}>
                  <td>{feedback?.customer || "Anonymous"}</td>
                  <td>
                    {[...Array(feedback?.rating)].map((_, i) => (
                      <i
                        key={i}
                        className="bi bi-star-fill"
                        style={{
                          color: "#ff8427",
                          textShadow:
                            "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
                        }}
                      />
                    ))}
                  </td>
                  <td>{feedback.description || "No comment"}</td>
                </tr>
              ))}
              {!selectedFeedbackOrder?.feedbacks?.length && (
                <tr>
                  <td colSpan="3" className="text-center">
                    No feedback available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseFeedbackModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default OrdersV2;
