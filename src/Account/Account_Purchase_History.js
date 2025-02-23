import React, { useState } from "react";
import milkshake from "../Assets/milkshake.jpg";
import ReviewOrder from "../PastOrdersModal/ReviewOrder";
import ViewOrder from "../PastOrdersModal/ViewOrder";
import "../style.css";

const Account_Purchase_History = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [reviewedOrders, setReviewedOrders] = useState({});

  const handleReviewSubmit = (orderId) => {
    setReviewedOrders((prev) => ({ ...prev, [orderId]: true }));
  };

  const orders = [
    {
      id: "FV-022225-1",
      restaurant: "I Love Burger",
      deliveredDate: "Fri, Feb 21, 2025 8:08PM",
      price: 1035.3,
    },
  ];

  return (
    <div className="d-flex flex-row gap-2">
      <div className="col-6">
        <h4>Active orders</h4>
        <div className="col-12 active-order d-flex flex-column">
          <div className="d-flex flex-row gap-3">
            <img src={milkshake} alt="Order" />
            <div className="w-100 d-flex flex-row justify-content-between">
              <div className="d-flex flex-column justify-content-between">
                <small>Order from</small>
                <h5>{orders[0].restaurant}</h5>
                <small>Delivered on {orders[0].deliveredDate}</small>
                <small>Order# {orders[0].id}</small>
              </div>
              <div className="col-4 text-end mt-4">
                <h5>&#8369; {orders[0].price.toFixed(2)}</h5>
              </div>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-end gap-3">
            <button
              className="main-btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#viewOrder"
            >
              View order
            </button>
            <ViewOrder />
          </div>
        </div>
      </div>

      <div className="col-6">
        <h4>Past orders</h4>
        <div className="d-flex flex-column gap-2">
          {orders.map((order) => (
            <div key={order.id} className="col-12 past-order border rounded d-flex flex-column">
              <div className="d-flex flex-row gap-3">
                <img src={milkshake} alt="Order" />
                <div className="w-100 d-flex flex-row justify-content-between">
                  <div className="d-flex flex-column justify-content-between">
                    <small>Order from</small>
                    <h5>{order.restaurant}</h5>
                    <small>Delivered on {order.deliveredDate}</small>
                    <small>Order# {order.id}</small>
                  </div>
                  <div className="col-4 text-end mt-4">
                    <h5>&#8369; {order.price.toFixed(2)}</h5>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-between align-items-center gap-3">
                {reviewedOrders[order.id] ? (
                  <p className="text-success p-0 m-0">
                    You rated this 5 <i className="bi bi-star-fill text-color-main"></i>
                  </p>
                ) : (
                  <button
                    className="btn btn-outline-success"
                    data-bs-toggle="modal"
                    data-bs-target="#reviewOrder"
                    onClick={() => handleReviewSubmit(order.id)}
                  >
                    Review order
                  </button>
                )}
                <ReviewOrder />
                <div className="d-flex flex-row gap-3">
                  <button
                    className="main-btn-outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#viewOrder"
                  >
                    View order
                  </button>
                  <ViewOrder />
                  <button className="main-btn-primary">Reorder items</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Account_Purchase_History;
