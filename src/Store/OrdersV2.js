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
    "Preparing Order",
    "Out For Delivery",
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
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedFeedbackOrder, setSelectedFeedbackOrder] = useState(null);

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
    if (!selectedOrder || !selectedStatus) return;

    try {
      await updateOrderStatus(selectedOrder.id, selectedStatus);
      setOrderUpdated((prev) => !prev);
      handleCloseModal();
    } catch (error) {
      setError(error);
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
              {orders
                .filter((order) => order?.status === status)
                .map((order) => (
                  <Card className="mt-3" key={order?.id}>
                    <Card.Header>
                      Order #{order?.id} - {order?.store?.display_name}
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>
                        <strong>Customer: {order?.user?.name}</strong>
                      </Card.Text>
                      <ListGroup variant="flush">
                        {order?.items.map((item) => (
                          <ListGroup.Item key={item?.id}>
                            {item?.product?.name} X {item?.quantity} - ₱
                            {item?.price_per_item}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                      <Card.Text className="mt-3">
                        Delivery Fee: ₱{order?.store?.delivery_fee}
                      </Card.Text>
                      <Card.Text className="mt-3">
                        <strong>Total Price: ₱{order?.total_price}</strong>
                      </Card.Text>
                      <Card.Text>
                        Created At:{" "}
                        {new Date(order?.created_at).toLocaleString()}
                      </Card.Text>
                      {order?.status !== "Rejected" &&
                        order?.status !== "Completed" && (
                          <Button
                            variant="primary"
                            onClick={() => handleShowModal(order)}
                            className="mt-3"
                          >
                            Update Status
                          </Button>
                        )}
                      {order?.status === "Completed" && (
                        <Button
                          variant="info"
                          onClick={() => handleViewFeedbacks(order)}
                          className="mt-3 ms-2"
                        >
                          View Feedback
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                ))}
            </Tab>
          ))}
        </Tabs>
      </div>

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
                      return status === "Preparing Order";
                    }
                    if (selectedOrder?.status === "Preparing Order") {
                      return status === "Out For Delivery";
                    }
                    if (selectedOrder?.status === "Out For Delivery") {
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
            disabled={!selectedStatus}
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
                          color: "yellow",
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
