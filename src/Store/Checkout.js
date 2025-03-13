import "bootstrap/dist/css/bootstrap.min.css";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { GlobalContext } from "../GlobalContext";
import renderErrorMessages from "../errorHelper";
import { createOrder } from "../services/orderService";

const Checkout = () => {
  const navigate = useNavigate();
  const { user, setOrders, setCart } = useContext(GlobalContext);
  const { state } = useLocation();
  const restaurant = state?.restaurant;
  const cartItems = state?.cartItems;
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deliveryOption, setDeliveryOption] = useState("Delivery");
  const [pickupDetails, setPickupDetails] = useState({
    date: new Date().toISOString().split("T")[0],
    time: "",
  });
  const totalSum =
    cartItems.reduce(
      (sum, cartItem) => sum + cartItem?.product?.price * cartItem?.quantity,
      0
    ) + (deliveryOption === "Delivery" ? restaurant?.delivery_fee : 0);

  const generateTimeSlots = useCallback(() => {
    const slots = [];

    if (!restaurant?.opening_time || !restaurant?.closing_time) {
      console.log("Restaurant hours are missing.");
      return slots;
    }

    // Parse opening time
    const [openHours, openMinutes] = restaurant.opening_time
      .split(":")
      .map(Number);
    let startTime = openHours * 60 + openMinutes;

    // Parse closing time
    const [closeHours, closeMinutes] = restaurant.closing_time
      .split(":")
      .map(Number);
    let endTime = closeHours * 60 + closeMinutes;

    // Handle overnight operations (closing time is on the next day)
    if (endTime <= startTime) {
      endTime += 24 * 60; // Add 24 hours to closing time
    }

    // Format time helper
    const formatTime = (minutes) => {
      let hours = Math.floor(minutes / 60) % 24; // Ensure hours wrap around 24
      const mins = minutes % 60;
      const period = hours < 12 ? "AM" : "PM";
      hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM/PM
      return `${hours}:${mins.toString().padStart(2, "0")} ${period}`;
    };

    // Generate slots
    while (startTime < endTime) {
      const startFormatted = formatTime(startTime);
      const endFormatted = formatTime(startTime + 60);
      slots.push(`${startFormatted} - ${endFormatted}`);
      startTime += 60;
    }

    return slots;
  }, [restaurant?.opening_time, restaurant?.closing_time]);

  useEffect(() => {
    if (restaurant) {
      setIsLoading(false);
      const [firstSlot] = generateTimeSlots();
      if (firstSlot) {
        setPickupDetails((prev) => ({ ...prev, time: firstSlot }));
      }
    }
  }, [restaurant, generateTimeSlots]);

  const handleCheckOut = async () => {
    setError(null);
    try {
      // Construct order data based on delivery option
      const orderData = {
        store: restaurant?.id,
        type: deliveryOption,
      };

      // Add pickup details if delivery option is "Pick Up"
      if (deliveryOption === "Pick Up") {
        // Parse the pickup date and time into a Date object
        const [startTimeRange, endTimeRange] = pickupDetails.time.split(" - ");
        const [startHours, startMinutesAndPeriod] = startTimeRange.split(":");
        const [startMinutes, startPeriod] = startMinutesAndPeriod.split(" ");

        let hours = parseInt(startHours, 10);
        const minutes = parseInt(startMinutes, 10);

        // Convert to 24-hour format
        if (startPeriod === "PM" && hours !== 12) {
          hours += 12;
        }
        if (startPeriod === "AM" && hours === 12) {
          hours = 0;
        }

        // Create a Date object for the pickup datetime
        const pickupDateTime = new Date(pickupDetails.date);
        pickupDateTime.setHours(hours, minutes, 0, 0);

        // Format as ISO 8601 string (YYYY-MM-DDThh:mm:ss)
        orderData.pick_up_datetime = pickupDateTime.toISOString();
      }

      // Create order with constructed data
      const newOrder = await createOrder(orderData);

      // Update global state and navigate
      setOrders((prev) => [newOrder, ...prev]);
      setCart({});
      navigate("/", { state: { showOffCanvas: true } });
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
                value="Pick Up"
                checked={deliveryOption === "Pick Up"}
                onChange={() => setDeliveryOption("Pick Up")}
              />
              <label htmlFor="pickup" className="ms-2">
                Pick Up
              </label>
            </div>
          </div>

          {/* Pickup Date and Time */}
          {deliveryOption === "Pick Up" && (
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
                {generateTimeSlots().length > 0 ? (
                  generateTimeSlots().map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))
                ) : (
                  <option disabled>No available time slots</option>
                )}
              </select>
              {error && renderErrorMessages(error)}
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

          {/* Conditionally display the delivery fee */}
          {deliveryOption === "Delivery" && (
            <div className="d-flex justify-content-between mt-3">
              <strong>Delivery Fee:</strong>
              <span>₱{restaurant?.delivery_fee}</span>
            </div>
          )}

          {/* Total */}
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
      </div>
    </div>
  );
};

export default Checkout;
