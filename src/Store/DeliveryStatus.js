import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMotorcycle } from "@fortawesome/free-solid-svg-icons";

const orders = [
  { id: 1, item: "Burger", price: 5 },
  { id: 2, item: "Fries", price: 3 },
  { id: 3, item: "Soda", price: 2 },
];

function DeliveryStatus() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (e) => {
    e.stopPropagation(); // Prevent offcanvas from closing
    setIsOpen(!isOpen);
  };

  const total = orders.reduce((sum, order) => sum + order.price, 0);

  return (
    <div>
      {/* Offcanvas Component (Placed Outside the Button) */}
      <div
        className="offcanvas offcanvas-start"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        id="staticBackdrop"
        aria-labelledby="staticBackdropLabel"
      >
        <div className="offcanvas-header">
          <FontAwesomeIcon icon={faMotorcycle} className="h5 me-2" />
          <h5 id="staticBackdropLabel">Delivery</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body text-start d-flex flex-column gap-3">
          <div className="border p-2 rounded bg-white delivery-status">
            <div className="d-flex justify-content-between">
              <small>Order tracking</small>
              <small>FV-022025-1</small>
            </div>
            <h6>HUNGRY HURRY</h6>
            <small>Status</small>
            <div className="d-flex justify-content-between">
              <p className="m-0">Preparing your order</p> <span>6:15PM</span>
            </div>

            {/* Dropdown Orders Section */}
            <button
              className="delivery-dropdown-order-list"
              onClick={toggleDropdown}
            >
              View order details {isOpen ? "▲" : "▼"}
            </button>
            {isOpen && (
              <div
                className="bg-white  mt-2 p-2 shadow-md"
                onClick={(e) => e.stopPropagation()} // Prevent offcanvas from closing
              >
                <ul className="delivery-orders">
                  {orders.map((order) => (
                    <li
                      key={order.id}
                      className="py-1 border-b last:border-none"
                    >
                      {order.item} - ${order.price}
                    </li>
                  ))}
                </ul>
                <div className="mt-2 font-bold">Total: ${total}</div>
              </div>
            )}
          </div>

          <div className="border p-2 rounded bg-white delivery-status">
            <div className="d-flex justify-content-between">
              <small>Order tracking</small>
              <small>FV-022025-1</small>
            </div>
            <h6>HUNGRY HURRY</h6>
            <small>Status</small>
            <div className="d-flex justify-content-between">
              <p className="m-0">Preparing your order</p> <span>6:15PM</span>
            </div>

            {/* Dropdown Orders Section */}
            <button
              className="delivery-dropdown-order-list"
              onClick={toggleDropdown}
            >
              View order details {isOpen ? "▲" : "▼"}
            </button>
            {isOpen && (
              <div
                className="bg-white  mt-2 p-2 shadow-md"
                onClick={(e) => e.stopPropagation()} // Prevent offcanvas from closing
              >
                <ul className="delivery-orders">
                  {orders.map((order) => (
                    <li
                      key={order.id}
                      className="py-1 border-b last:border-none"
                    >
                      {order.item} - ${order.price}
                    </li>
                  ))}
                </ul>
                <div className="mt-2 font-bold">Total: ${total}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryStatus;
