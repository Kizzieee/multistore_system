function Checkout() {
  return (
    <div className="container-fluid d-flex flex-column gap-3">
      <div className="col-5 m-auto">
        <div className="border rounded p-3">
          <h3>Your order from</h3>
          <div>
            <div className="d-flex justify-content-between border-bottom">
              <div className="col-10">Binalof</div>
              <div>&#8369; 245</div>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="col-10">Subtotal</div>
            <div>&#8369; 245</div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="col-8">
              <h3>Total</h3>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="ps-3">&#8369; 245</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="col-5 m-auto">
        <div className="border rounded p-3 d-flex flex-column gap-2">
          <h3>Delivery options</h3>
          <div className="border rounded p-2">
            <input
              type="radio"
              id="cod"
              name="delivery_option"
              value="Cash on delivery"
            />
             <label for="cod">Cash on delivery</label>
          </div>
          <div className="border rounded p-2">
            <input
              type="radio"
              id="Pickup"
              name="delivery_option"
              value="Pickup"
            />
             <label for="Pickup">Pickup</label>
          </div>
        </div>
      </div>

      <div className="col-5 m-auto">
        <div className="border rounded p-3 d-flex flex-column gap-2">
          <h3>Personal details</h3>
          <div className="p-2 lh-1">
            <p className="p-0 m-0">
              Kizzelyn M. Floralde
              <br />
              kizseaf@gmail.com
              <br />
              09452486417
              <br />
              Quezon City, Metro Manila
            </p>
          </div>
        </div>
      </div>

      <div className="col-5 m-auto">
        <button className="w-100 p-2 main-btn-primary">Place order</button>
      </div>
    </div>
  );
}

export default Checkout;
