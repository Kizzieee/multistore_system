import sizzling from "../Assets/sizzling.jpg";
import milkshake from "../Assets/milkshake.jpg";
import { useNavigate } from "react-router-dom";
import "../style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMotorcycle } from "@fortawesome/free-solid-svg-icons";

function HomeRestaurants() {
  const navigate = useNavigate();

  const restaurants = [
    { name: "Hungry Hurry", image: sizzling, rating: "4.9 (100+)", time: "40-60 mins", fee: 60 },
    { name: "The Secret Cafe", image: milkshake, rating: "4.8 (200+)", time: "30-50 mins", fee: 50 },
    { name: "Pasta Paradise", image: sizzling, rating: "4.7 (150+)", time: "35-55 mins", fee: 70 },
    { name: "Burgers & More", image: milkshake, rating: "4.6 (250+)", time: "25-45 mins", fee: 40 },
    { name: "Pizza Delight", image: sizzling, rating: "4.9 (300+)", time: "30-50 mins", fee: 65 },
    { name: "Sweet Tooth Haven", image: milkshake, rating: "4.8 (120+)", time: "20-40 mins", fee: 30 },
    { name: "Grill Master", image: sizzling, rating: "4.7 (180+)", time: "45-60 mins", fee: 80 },
    { name: "Sushi Express", image: milkshake, rating: "4.9 (220+)", time: "35-50 mins", fee: 55 },
    { name: "Taco Fiesta", image: sizzling, rating: "4.6 (130+)", time: "25-40 mins", fee: 45 },
    { name: "Vegan Bites", image: milkshake, rating: "4.8 (170+)", time: "30-45 mins", fee: 50 },
  ];

  return (
    <div className="container-fluid">
      <div className="row gap-1 d-flex justify-content-center my-5">
        <div className="col-9 p-0">
          <div className="row h2 px-3">All Restaurants</div>
          <div className="d-flex flex-row flex-wrap gap-3">
            {restaurants.map((resto, index) => (
              <div key={index} className="card" onClick={() => navigate("/restaurant")}> 
                <div className="card-resto-img">
                  <img src={resto.image} className="card-img-top" alt={resto.name} />
                </div>
                <div className="card-body">
                  <div className="d-flex flex-row justify-content-between">
                    <h5 className="card-title">{resto.name}</h5>
                    <span>
                      <i className="bi bi-star-fill text-color-main"></i> {resto.rating}
                    </span>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <small>
                      <i className="bi bi-stopwatch"></i> {resto.time}
                    </small>
                    <small>
                      <FontAwesomeIcon icon={faMotorcycle} /> : &#8369;{resto.fee}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeRestaurants;
