import React, { useState } from "react";
import milkshake from "../Assets/milkshake.jpg";
import "../style.css";

const Account_Purchase_History = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="">
      <div>
        <h4> Active orders</h4>
      </div>
      <div>
        <h4> Past orders</h4>
        <div>
          <div className="past-order d-flex flex-row">
            <div>
              <img src={milkshake} />
            </div>
            <div>
              <h5>I Love Burger - Aurora Boulevard</h5>
            </div>
            <div>uiul</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account_Purchase_History;
