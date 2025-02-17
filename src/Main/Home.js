import { useState } from "react";
import Home_Restaurants from "./Home_Restaurants";
import Account_Modal from "../Account/Account_Modal";
import "../style.css";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <nav className="navbar navbar-expand-fluid bg-main">
        <div className="row container-fluid mx-5 my-2">
          <div className="col-4 h4">
            <strong> Multistore Logo</strong>
          </div>

          <div className="col-4 text-color-main">
            <i class="bi bi-geo-alt"></i> Allen, Northern Samar
          </div>

          <div className="col-4 d-flex justify-content-end gap-4">
            <button type="button" class="main-btn-primary" onClick={() => setIsModalOpen(true)}>
              Log in / Sign up
            </button>
            <Account_Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <div className="d-flex justify-content-center align-items-center gap-1">
              <i class="bi bi-cart"></i> <span>2</span>{" "}
            </div>
          </div>
        </div>
      </nav>

      <Home_Restaurants />
    </div>
  );
}

export default Home;
