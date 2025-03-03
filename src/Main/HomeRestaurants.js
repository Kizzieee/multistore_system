import { faMotorcycle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import renderErrorMessages from "../errorHelper";
import { GlobalContext } from "../GlobalContext";
import { fetchStores } from "../services/storeService";
import "../style.css";

function HomeRestaurants() {
  const navigate = useNavigate();
  const { user } = useContext(GlobalContext);
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getStores = async () => {
      try {
        setIsLoading(true);
        const fetchedRestaurants = await fetchStores();
        setRestaurants(fetchedRestaurants);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getStores();
  }, [user]);

  const handleCardClick = (restaurant) => {
    navigate("/restaurant", {
      state: { restaurant },
    });
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "";

    const [hours, minutes] = timeStr.split(":");
    const hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (restaurants.length === 0 || error) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        {error ? (
          renderErrorMessages(error)
        ) : (
          <h2>No Restaurants right now ☹️</h2>
        )}
      </div>
    );
  }

  return (
    <div className="container-fluid m-0 p-0">
      <div className="row gap-1 d-flex justify-content-center my-5">
        <div className="col-10 p-0">
          <div className="row h2 px-3">All Restaurants</div>

          {/* Grid Container */}
          <div className="restaurant-grid">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant?.id}
                className="card card-grid position-relative"
                style={{ cursor: "pointer" }}
                onClick={() => handleCardClick(restaurant)}
              >
                {!restaurant?.is_open && (
                  <div className="availability-resto-cover">
                    <p className="text-white text-center">
                      Operating Hours: <br />
                      {formatTime(restaurant?.opening_time)} -{" "}
                      {formatTime(restaurant?.closing_time)}
                    </p>
                  </div>
                )}
                <div className="card-resto-img">
                  <img
                    src={restaurant?.image}
                    className="card-img-top"
                    alt={restaurant?.name}
                  />
                </div>
                <div className="card-body">
                  <div className="d-flex flex-row justify-content-between">
                    <h5 className="card-title">
                      <i className="bi bi-shop-window"></i> {restaurant?.name}
                    </h5>
                    {/* <span>
                      <i className="bi bi-star-fill text-color-main"></i>{" "}
                      {restaurant?.rating}
                    </span> */}
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    {/* <small>
                      <i className="bi bi-stopwatch"></i> {restaurant?.time}
                    </small> */}
                    <small>
                      <FontAwesomeIcon icon={faMotorcycle} /> : &#8369;
                      {restaurant?.delivery_fee}
                    </small>
                    <small>
                      <i className="bi bi-geo-alt-fill"></i>
                      {restaurant?.address?.city},{" "}
                      {restaurant?.address?.province}
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
