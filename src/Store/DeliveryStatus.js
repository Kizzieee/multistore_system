import { faMotorcycle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";

function DeliveryStatus({ showOffCanvas, setShowOffCanvas }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  // Run once on mount if showOffCanvas in state is true
  useEffect(() => {
    if (state?.showOffCanvas) {
      setShowOffCanvas(true);
      // This "removes" the showOffCanvas entry from browser history,
      // so refreshing / reloading won't keep it set to true.
      navigate(location.pathname, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.showOffCanvas]);

  const { orders } = useContext(GlobalContext);
  const activeOrders = orders.filter(
    (order) => order?.status !== "Completed" && order?.status !== "Rejected"
  );

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = (e) => {
    e.stopPropagation(); // Prevent offcanvas from closing
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Offcanvas
        show={showOffCanvas}
        onHide={() => setShowOffCanvas(false)}
        className="offcanvas offcanvas-start"
      >
        <Offcanvas.Header closeButton>
          <FontAwesomeIcon icon={faMotorcycle} className="h5 me-2" />
          <Offcanvas.Title>
            <h5 id="staticBackdropLabel">Delivery</h5>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="offcanvas-body text-start d-flex flex-column gap-3">
          {activeOrders.map((order) => (
            <div
              className="border p-2 rounded bg-white delivery-status"
              key={order?.id}
            >
              <div className="d-flex justify-content-between">
                <small>Order tracking</small>
                <small>#{order?.id}</small>
              </div>
              <h6>{order?.store?.name}</h6>
              <small>Status</small>
              <div className="d-flex justify-content-between">
                <p className="m-0">{order?.status}</p>
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
                  className="bg-white mt-2 p-2 shadow-md"
                  onClick={(e) => e.stopPropagation()} // Prevent offcanvas from closing
                >
                  <ul className="delivery-orders">
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
                  </ul>
                </div>
              )}
            </div>
          ))}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default DeliveryStatus;
