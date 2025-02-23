import { useState, useEffect } from "react";
import milkshake from "../Assets/milkshake.jpg";
import "../style.css";
import { Modal } from "bootstrap";
import ReviewAppreciation from "./ReviewAppreciation";

function ViewOrder() {
  return (
    <>
      <div
        className="modal fade"
        id="viewOrder"
        tabIndex="-1"
        aria-labelledby="reviewOrderLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-orders">
          <div className="modal-content">
            <div className="modal-header">
              <div className="d-flex flex-row gap-3">
                <div className="view-order">
                  <img src={milkshake} alt="Milkshake" />
                </div>
                <div>
                  <h5 className="m-0">I Love Burger</h5>
                  <small>Delivered Fri, Feb 21, 2025, 7:32 PM</small>
                  <br />
                  <small>Order# FV-022325-1</small>
                </div>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body d-flex flex-column gap-3 justify-content-between">
              <div className="border rounded p-2">
                <div>
                  <p className="m-0">
                    <i class="bi bi-geo-alt"></i> Order from
                  </p>
                  <p className="ps-4 m-0 h6">Allen, Northern Samar</p>
                </div>
                <div>
                  <p className="m-0 mt-3">
                    <i class="bi bi-geo-alt"></i> Delivered to
                  </p>
                  <p className="ps-4 m-0 h6">Amoec Allen Main Branch</p>
                </div>
              </div>
              <div className="border rounded p-2">
                <h6>Order Summary</h6>
                <div>
                  <p>
                    <span>Item Z (x1)</span>
                    <span className="float-end">₱99 x 1 = ₱99</span>
                  </p>
                  <hr />
                  <p>
                    Subtotal: <span className="float-end">₱99</span>
                  </p>
                  <p>
                    Delivery Fee: <span className="float-end">₱0</span>
                  </p>
                  <hr />
                  <p className="fw-bold">
                    Total: <span className="float-end">₱99</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReviewAppreciation />
    </>
  );
}

export default ViewOrder;
