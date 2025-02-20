    import { useState } from "react";

function Orders() {
  // Initial mock data for demonstration
  const initialOrders = [
    {
      orderNumber: "R-001",
      date: "2025-01-01",
      customerName: "Alice",
      contactNumber: "1234567890",
      address: "123 Main St",
      deliveryOption: "Delivery",
      items: [
        { name: "Item A", quantity: 2, price: 100 },
        { name: "Item B", quantity: 1, price: 50 },
      ],
      deliveryFee: 20,
      status: "rejected",
    },
    {
      orderNumber: "C-002",
      date: "2025-01-02",
      customerName: "Bob",
      contactNumber: "0987654321",
      address: "456 Oak Ave",
      deliveryOption: "Pick up",
      items: [
        { name: "Item C", quantity: 1, price: 200 },
        { name: "Item D", quantity: 3, price: 75 },
      ],
      deliveryFee: 0,
      status: "completed",
    },
    {
      orderNumber: "A-003",
      date: "2025-01-03",
      customerName: "Charlie",
      contactNumber: "1112223333",
      address: "789 Pine Rd",
      deliveryOption: "Delivery",
      items: [
        { name: "Item X", quantity: 1, price: 150 },
        { name: "Item Y", quantity: 2, price: 80 },
      ],
      deliveryFee: 25,
      status: "accepted", // This is effectively "active"
    },
    {
      orderNumber: "N-004",
      date: "2025-01-04",
      customerName: "Diana",
      contactNumber: "4445556666",
      address: "101 Maple Dr",
      deliveryOption: "Pick up",
      items: [{ name: "Item Z", quantity: 1, price: 99 }],
      deliveryFee: 0,
      status: "new",
    },
  ];

  // We store the orders in state so that we can update them.
  const [orders, setOrders] = useState(initialOrders);

  // State for active tab
  const [activeTab, setActiveTab] = useState("new");

  // State for the modal
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(""); // e.g., "accept", "reject", or "updateStatus"
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedNextStatus, setSelectedNextStatus] = useState("");

  // ---- Derived data: filter orders based on status ----
  const newOrders = orders.filter((o) => o.status === "new");
  const activeOrders = orders.filter((o) =>
    ["accepted", "preparing", "outForDelivery"].includes(o.status)
  );
  const completedOrders = orders.filter((o) => o.status === "completed");
  const rejectedOrders = orders.filter((o) => o.status === "rejected");

  // All orders (including rejected)
  const allOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date));

  // --- Helpers for the linear status flow ---
  // We define the sequence of statuses in a linear path for "active" orders.
  const statusSequence = ["new", "accepted", "preparing", "outForDelivery", "completed"];
  // 'rejected' is standalone when a user rejects from 'new', or if we want to allow rejecting at other stages, you can adjust accordingly.

  // This function gets the next statuses you can move into from the current status
  // in a linear fashion. You can decide whether you want to allow skipping or only the next immediate step.
  const getNextAllowedStatuses = (currentStatus) => {
    // If the order is "completed" or "rejected", no further transitions
    if (currentStatus === "completed" || currentStatus === "rejected") return [];

    // If the order is still "new", you can show "accepted" or "rejected" as possible transitions:
    if (currentStatus === "new") {
      return ["accepted", "rejected"];
    }

    // Otherwise, find the current index in the main linear statuses:
    const currentIndex = statusSequence.indexOf(currentStatus);
    if (currentIndex < 0) return [];

    // Next statuses are everything after currentIndex, up until completed.
    // If you want to show only the immediate next status, you can do:
    //    return currentIndex + 1 < statusSequence.length
    //      ? [statusSequence[currentIndex + 1]]
    //      : [];
    //
    // If you want to show all subsequent statuses in a single dropdown, you can do this:
    return statusSequence.slice(currentIndex + 1);
  };

  // --- Modal handlers ---
  const handleTabClick = (tabName) => setActiveTab(tabName);

  const openConfirmModal = (order, action) => {
    setSelectedOrder(order);
    setModalAction(action); // e.g. "accept", "reject", "updateStatus"
    // If we are updating the status, we might pre-fill the next status:
    if (action === "updateStatus") {
      // By default, select the first allowed next status
      const nextOptions = getNextAllowedStatuses(order.status);
      setSelectedNextStatus(nextOptions?.[0] || "");
    } else {
      setSelectedNextStatus(""); // no specific next status for accept/reject
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
    setModalAction("");
    setSelectedNextStatus("");
  };

  const confirmAction = () => {
    if (!selectedOrder) return;

    // We'll update the status of the selected order based on modalAction
    setOrders((prevOrders) => {
      return prevOrders.map((o) => {
        if (o.orderNumber === selectedOrder.orderNumber) {
          // accept = set status to "accepted"
          // reject = set status to "rejected"
          // updateStatus = set status to selectedNextStatus
          if (modalAction === "accept") {
            return { ...o, status: "accepted" };
          } else if (modalAction === "reject") {
            return { ...o, status: "rejected" };
          } else if (modalAction === "updateStatus" && selectedNextStatus) {
            return { ...o, status: selectedNextStatus };
          }
        }
        return o;
      });
    });

    // Close the modal
    closeModal();
  };

  // --- Rendering helpers ---
  const calculateTotal = (order) => {
    const itemsTotal = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return itemsTotal + (order.deliveryFee || 0);
  };

  // Display a status label in uppercase or a small button for "Update Status"
  const renderOrder = (order) => {
    const { orderNumber, status } = order;

    return (
      <div className="col mb-4" key={orderNumber}>
        <div className="card shadow-sm w-100">
          <div className="card-header d-flex justify-content-between align-items-center">
            <strong>Order #{orderNumber}</strong>

            {/* Show label or button based on status */}
            {status === "rejected" && (
              <span className="badge bg-danger">REJECTED</span>
            )}
            {status === "completed" && (
              <span className="badge bg-success">COMPLETED</span>
            )}
            {/* If the order is 'new', show Accept/Reject buttons */}
            {status === "new" && (
              <div>
                <button
                  className="btn btn-sm btn-success me-2"
                  onClick={() => openConfirmModal(order, "accept")}
                >
                  Accept
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => openConfirmModal(order, "reject")}
                >
                  Reject
                </button>
              </div>
            )}
            {/* If the order is "active" (accepted/preparing/outForDelivery), show Update Status button */}
            {["accepted", "preparing", "outForDelivery"].includes(status) && (
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => openConfirmModal(order, "updateStatus")}
              >
                Update Status
              </button>
            )}
          </div>
          <div className="card-body">
            <div className="mb-2">
              <span className="fw-bold">Date:</span> {order.date}
            </div>
            <div className="mb-2">
              <span className="fw-bold">Customer:</span> {order.customerName}
            </div>
            <div className="mb-2">
              <span className="fw-bold">Contact:</span> {order.contactNumber}
            </div>
            <div className="mb-2">
              <span className="fw-bold">Address:</span> {order.address}
            </div>
            <div className="mb-2">
              <span className="fw-bold">Delivery Option:</span>{" "}
              {order.deliveryOption}
            </div>
            <hr />
            {/* Items */}
            {order.items.map((item, idx) => (
              <div key={idx} className="d-flex justify-content-between">
                <div>
                  {item.name} (x{item.quantity})
                </div>
                <div>
                  &#8369;{item.price} x {item.quantity} = &#8369;
                  {item.price * item.quantity}
                </div>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between">
              <span>Delivery Fee:</span>
              <span>&#8369;{order.deliveryFee}</span>
            </div>
            <div className="d-flex justify-content-between fw-bold">
              <span>Total:</span>
              <span>&#8369;{calculateTotal(order)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- JSX Rendering ---
  return (
    <div className="container py-4">
      <h2 className="mb-4">Orders</h2>

      {/* NAV PILLS */}
      <ul className="nav nav-pills mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "all" ? "active" : ""}`}
            onClick={() => handleTabClick("all")}
          >
            All Orders
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "new" ? "active" : ""}`}
            onClick={() => handleTabClick("new")}
          >
            New
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "active" ? "active" : ""}`}
            onClick={() => handleTabClick("active")}
          >
            Active
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "completed" ? "active" : ""}`}
            onClick={() => handleTabClick("completed")}
          >
            Completed
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "rejected" ? "active" : ""}`}
            onClick={() => handleTabClick("rejected")}
          >
            Rejected
          </button>
        </li>
      </ul>

      {/* TAB CONTENT */}
      <div>
        {/* ALL ORDERS TAB */}
        {activeTab === "all" && (
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {allOrders.map((order) => renderOrder(order))}
            {allOrders.length === 0 && (
              <div className="text-center my-5">No orders to display.</div>
            )}
          </div>
        )}

        {/* NEW TAB */}
        {activeTab === "new" && (
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {newOrders.map((order) => renderOrder(order))}
            {newOrders.length === 0 && (
              <div className="text-center my-5">No new orders.</div>
            )}
          </div>
        )}

        {/* ACTIVE TAB */}
        {activeTab === "active" && (
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {activeOrders.map((order) => renderOrder(order))}
            {activeOrders.length === 0 && (
              <div className="text-center my-5">No active orders.</div>
            )}
          </div>
        )}

        {/* COMPLETED TAB */}
        {activeTab === "completed" && (
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {completedOrders.map((order) => renderOrder(order))}
            {completedOrders.length === 0 && (
              <div className="text-center my-5">No completed orders.</div>
            )}
          </div>
        )}

        {/* REJECTED TAB */}
        {activeTab === "rejected" && (
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {rejectedOrders.map((order) => renderOrder(order))}
            {rejectedOrders.length === 0 && (
              <div className="text-center my-5">No rejected orders.</div>
            )}
          </div>
        )}
      </div>

      {/* CONFIRMATION MODAL (Bootstrap 5 style) */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Action</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                {modalAction === "updateStatus" ? (
                  <>
                    <p>
                      Choose the <strong>next status</strong> for Order #
                      {selectedOrder?.orderNumber}:
                    </p>
                    <div className="mb-3">
                      <select
                        className="form-select"
                        value={selectedNextStatus}
                        onChange={(e) => setSelectedNextStatus(e.target.value)}
                      >
                        {/* Get the next allowed statuses based on current status */}
                        {getNextAllowedStatuses(selectedOrder?.status).map(
                          (st) => (
                            <option value={st} key={st}>
                              {renderStatusLabel(st)}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </>
                ) : (
                  <p>
                    Are you sure you want to{" "}
                    <strong>{modalAction}</strong> Order #
                    {selectedOrder?.orderNumber}?
                  </p>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={confirmAction}>
                  Yes, Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to display a user-friendly label for each status
function renderStatusLabel(status) {
  switch (status) {
    case "accepted":
      return "Order Accepted (Status #1)";
    case "preparing":
      return "Preparing Order (Status #2)";
    case "outForDelivery":
      return "Out for Delivery / Ready for Pickup (Status #3)";
    case "completed":
      return "Completed (Status #4)";
    case "rejected":
      return "Rejected";
    default:
      return status;
  }
}

export default Orders;