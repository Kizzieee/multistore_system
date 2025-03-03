import React, { useEffect, useState } from "react";
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
                      <Button
                        variant="primary"
                        onClick={() => handleShowModal(order)}
                        className="mt-3"
                      >
                        Update Status
                      </Button>
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
                  .filter((status) => status !== "New") // Exclude "New" status
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
    </div>
  );
}

export default OrdersV2;
