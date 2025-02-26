import "../style.css";

function MoreInfo() {
  return (
    <>
      <div
        className="modal fade"
        id="moreInfo"
        tabIndex="-1"
        aria-labelledby="moreInfoLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-orders">
          <div className="modal-content">
            <div className="modal-header border border-0">
              <div className="d-flex flex-row gap-3">
                <h5 className="m-0">I Love Burger</h5>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body d-flex flex-column gap-3 justify-content-between">
              <h6>
                <i class="bi bi-clock"></i> Now open until 10: 51 PM
              </h6>
              <h6>
                <i class="bi bi-geo-alt"></i> 46 Aurora Street Boulevard
                Barangay Salapan 4th District
              </h6>
              <div className="d-flex flex-row justify-content-start align-items-center">
                {" "}
                <h6 className="p-0 pe-2 m-0">Delivery fee: </h6>{" "}
                <span> &#8369; 50.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MoreInfo;
