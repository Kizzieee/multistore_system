import React, { useState, useEffect } from "react";

function DeliveryStatus() {
  return (
    <div className="m-0 p-0">
      <button className="delivery-status px-3 py-2">
        <i className="bi bi-basket3 delivery-cart"></i>
        View Delivery Status
      </button>
    </div>
  );
}

export default DeliveryStatus;
