import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { GlobalContext } from "../GlobalContext";
import renderErrorMessages from "../errorHelper";
import { createOrder } from "../services/orderService";

const Checkout = () => {
  const navigate = useNavigate();
  const { user, setOrders } = useContext(GlobalContext);
  const { state } = useLocation();
  const restaurant = state?.restaurant;
  const cartItems = state?.cartItems;
  const [error, setError] = useState(null);
  const [deliveryOption, setDeliveryOption] = useState("Delivery");
  const [pickupDetails, setPickupDetails] = useState({
    date: new Date().toISOString().split("T")[0],
    time: "7:00 AM - 8:00 AM",
  });
  const totalSum =
    cartItems.reduce(
      (sum, cartItem) => sum + cartItem?.product?.price * cartItem?.quantity,
      0
    ) + restaurant?.delivery_fee;

  const generateTimeSlots = () => {
    const slots = [];
    let startTime = 7 * 60; // 7:00 AM in minutes
    const endTime = 21 * 60; // 9:00 PM in minutes
    while (startTime < endTime) {
      const hours = Math.floor(startTime / 60);
      const minutes = startTime % 60;
      const nextHours = hours + 1;
      const formattedTime = `${hours === 12 ? 12 : hours % 12}:${minutes
        .toString()
        .padStart(2, "0")} ${hours < 12 ? "AM" : "PM"} - ${
        nextHours === 12 ? 12 : nextHours % 12
      }:${minutes.toString().padStart(2, "0")} ${nextHours < 12 ? "AM" : "PM"}`;
      slots.push(formattedTime);
      startTime += 60;
    }
    return slots;
  };

  const handleCheckOut = async () => {
    try {
      const newOrder = await createOrder(restaurant?.id);
      setOrders((prev) => [newOrder, ...prev]);
      navigate("/", { state: { showOffCanvas: true } });
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="container my-5">
      <div className="col-6 m-auto">
        <form className="mt-5">
          <div className="order-from p-2">
            <p className="m-0 p-0">Your order from</p>
            <h3 className="m-0 p-0">{restaurant?.display_name}</h3>
          </div>
          {/* Customer Information */}
          <div className="mb-3 d-flex">
            <div className="col-6 pe-1">
              <label className="form-label">Name:</label>
              <input
                type="text"
                className="form-control"
                value={user?.first_name + " " + user?.last_name}
                disabled
              />
            </div>
            <div className="col-6">
              <label className="form-label">Contact Number:</label>
              <input
                type="text"
                className="form-control "
                value={user?.mobile_number}
                disabled
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Address:</label>
            <input
              type="text"
              className="form-control"
              value={user?.address}
              disabled
            />
          </div>

          {/* Delivery Options */}
          <div className="mb-3">
            <label className="form-label">Delivery Option:</label>
            <div>
              <input
                type="radio"
                id="delivery"
                name="deliveryOption"
                value="Delivery"
                checked={deliveryOption === "Delivery"}
                onChange={() => setDeliveryOption("Delivery")}
              />
              <label htmlFor="delivery" className="ms-2">
                Delivery
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="pickup"
                name="deliveryOption"
                value="Pick up"
                checked={deliveryOption === "Pick up"}
                onChange={() => setDeliveryOption("Pick up")}
                disabled
              />
              <label htmlFor="pickup" className="ms-2">
                Pick up (Currently not supported)
              </label>
            </div>
          </div>

          {/* Pickup Date and Time */}
          {deliveryOption === "Pick up" && (
            <div className="mb-3">
              <label className="form-label">Pickup Date:</label>
              <input
                type="date"
                className="form-control"
                value={pickupDetails.date}
                disabled
              />
              <label className="form-label mt-2">Pickup Time:</label>
              <select
                className="form-control"
                value={pickupDetails.time}
                onChange={(e) =>
                  setPickupDetails({ ...pickupDetails, time: e.target.value })
                }
              >
                {generateTimeSlots().map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Items List */}
          <h4>Items</h4>
          {cartItems.map((cartItem) => (
            <div
              key={cartItem?.id}
              className="d-flex justify-content-between mb-2"
            >
              <span>
                {cartItem?.product?.name} (x{cartItem?.quantity})
              </span>
              <span>₱{cartItem?.product?.price * cartItem?.quantity}</span>
            </div>
          ))}

          {/* Delivery Fee & Total */}
          <div className="d-flex justify-content-between mt-3">
            <strong>Delivery Fee:</strong>
            <span>₱{restaurant?.delivery_fee}</span>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <strong>Total:</strong>
            <span>₱{totalSum}</span>
          </div>

          {/* Checkout Button */}
          <button
            type="button"
            className="main-btn-primary mt-3 w-100"
            onClick={handleCheckOut}
          >
            Checkout
          </button>
        </form>
        {error && renderErrorMessages(error)}
      </div>
    </div>
  );
};

export default Checkout;
