import sizzling from "../Assets/sizzling.jpg";
import milkshake from "../Assets/milkshake.jpg";
import "../style.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMotorcycle } from "@fortawesome/free-solid-svg-icons";

function Home_Restaurants() {
  return (
    <div>
      <div className="container-fluid ">
        <div className="row gap-1 d-flex justify-content-center">
          <div className="col-2 border">
            <h2>Filters</h2>
          </div>
          <div className="col-9">
            <div className="row h2 px-3">All Restaurants</div>
            <div className="d-flex flex-row flex-wrap gap-3">
              <div className="card">
                <div className="card-resto-img">
                  <img src={sizzling} className="card-img-top" alt="..." />
                </div>
                <div className="card-body">
                  <div className="d-flex flex-row justify-content-between">
                    <h5 className="card-title">Hungry Hurry</h5>
                    <span>
                      <i class="bi bi-star-fill text-color-main"></i> 4.9 (100+){" "}
                    </span>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <small>
                      <i class="bi bi-stopwatch"></i> 40-60 mins
                    </small>
                    <small>
                      <FontAwesomeIcon icon={faMotorcycle} /> : &#8369;60
                    </small>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-resto-img">
                  <img src={milkshake} className="card-img-top" alt="..." />
                </div>
                <div className="card-body">
                  <div className="d-flex flex-row justify-content-between">
                    <h5 className="card-title">The Secret Cafe</h5>
                    <span>
                      <i class="bi bi-star-fill text-color-main"></i> 4.9 (100+){" "}
                    </span>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <small>
                      <i class="bi bi-stopwatch"></i> 40-60 mins
                    </small>
                    <small>
                      <FontAwesomeIcon icon={faMotorcycle} /> : &#8369;60
                    </small>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-resto-img">
                  <img src={sizzling} className="card-img-top" alt="..." />
                </div>
                <div className="card-body">
                  <div className="d-flex flex-row justify-content-between">
                    <h5 className="card-title">Hungry Hurry</h5>
                    <span>
                      <i class="bi bi-star-fill text-color-main"></i> 4.9 (100+){" "}
                    </span>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <small>
                      <i class="bi bi-stopwatch"></i> 40-60 mins
                    </small>
                    <small>
                      <FontAwesomeIcon icon={faMotorcycle} /> : &#8369;60
                    </small>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-resto-img">
                  <img src={sizzling} className="card-img-top" alt="..." />
                </div>
                <div className="card-body">
                  <div className="d-flex flex-row justify-content-between">
                    <h5 className="card-title">Hungry Hurry</h5>
                    <span>
                      <i class="bi bi-star-fill text-color-main"></i> 4.9 (100+){" "}
                    </span>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <small>
                      <i class="bi bi-stopwatch"></i> 40-60 mins
                    </small>
                    <small>
                      <FontAwesomeIcon icon={faMotorcycle} /> : &#8369;60
                    </small>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-resto-img">
                  <img src={sizzling} className="card-img-top" alt="..." />
                </div>
                <div className="card-body">
                  <div className="d-flex flex-row justify-content-between">
                    <h5 className="card-title">Hungry Hurry</h5>
                    <span>
                      <i class="bi bi-star-fill text-color-main"></i> 4.9 (100+){" "}
                    </span>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <small>
                      <i class="bi bi-stopwatch"></i> 40-60 mins
                    </small>
                    <small>
                      <FontAwesomeIcon icon={faMotorcycle} /> : &#8369;60
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home_Restaurants;
