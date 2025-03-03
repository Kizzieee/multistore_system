import React, { useContext } from "react";
import milkshake from "../Assets/milkshake.jpg";
import { GlobalContext } from "../GlobalContext";
import "../style.css";

const AccountPurchaseHistory = () => {
  const { orders } = useContext(GlobalContext);
  const activeOrders = orders.filter(
    (order) => order?.status !== "Completed" && order?.status !== "Rejected"
  );
  const pastOrders = orders.filter(
    (order) => order?.status === "Completed" || order?.status === "Rejected"
  );

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
              <div className="w-100 d-flex flex-row justify-content-between">
                <div className="d-flex flex-column justify-content-between">
                  <small>Order from</small>
                  <h5>{order?.store?.display_name}</h5>
                  <small>Status: {order?.status}</small>
                  <small>Order# {order?.id}</small>
                  <div>
                    <h6>Order Summary</h6>
                    {order?.items.map((item) => (
                      <p key={item?.id}>
                        <span>{item?.product?.name}</span>
                        <span className="float-end">
                          ₱{item?.product?.price} x {item?.quantity} = ₱
                          {item?.product?.price * item?.quantity}
                        </span>
                      </p>
                    ))}
                    <p>
                      Delivery Fee:{" "}
                      <span className="float-end">
                        ₱{order?.store?.delivery_fee}
                      </span>
                    </p>
                    <p className="fw-bold">
                      Total:{" "}
                      <span className="float-end">₱{order?.total_price}</span>
                    </p>
                  </div>
                </div>
                <div className="col-4 text-end mt-4">
                  <h5>&#8369; {order?.total_price}</h5>
                </div>
              </div>
            </div>
            {/* <div className="d-flex flex-row justify-content-end gap-3">
              <button
                className="main-btn-outline-primary"
                data-bs-toggle="modal"
                data-bs-target="#viewOrder"
              >
                View order
              </button>
              <ViewOrder key={order?.id} order={order} />
            </div> */}
          </div>
        ))}
      </div>

      {/* Past Orders */}
      <div className="col-6 d-flex flex-column gap-2">
        <h4>Past orders</h4>
        {pastOrders.map((order) => (
          <div
            className="col-12 active-order d-flex flex-column"
            key={order?.id}
          >
            <div className="d-flex flex-row gap-3">
              <img src={milkshake} alt="Order" />
              <div className="w-100 d-flex flex-row justify-content-between">
                <div className="d-flex flex-column justify-content-between">
                  <small>Order from</small>
                  <h5>{order?.store?.display_name}</h5>
                  <small>Status: {order?.status}</small>
                  <small>Order# {order?.id}</small>
                  <div>
                    <h6>Order Summary</h6>
                    {order?.items.map((item) => (
                      <p key={item?.id}>
                        <span>{item?.product?.name}</span>
                        <span className="float-end">
                          ₱{item?.product?.price} x {item?.quantity} = ₱
                          {item?.product?.price * item?.quantity}
                        </span>
                      </p>
                    ))}
                    <p>
                      Delivery Fee:{" "}
                      <span className="float-end">
                        ₱{order?.store?.delivery_fee}
                      </span>
                    </p>
                    <p className="fw-bold">
                      Total:{" "}
                      <span className="float-end">₱{order?.total_price}</span>
                    </p>
                  </div>
                </div>
                <div className="col-4 text-end mt-4">
                  <h5>&#8369; {order?.total_price}</h5>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountPurchaseHistory;
