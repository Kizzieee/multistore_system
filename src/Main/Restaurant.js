import { useEffect, useState } from "react";
import milkshake from "../Assets/milkshake.jpg";
import food1 from "../Assets/food (1).jpeg";
import food2 from "../Assets/food (2).jpg";
import food3 from "../Assets/food (3).jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMotorcycle } from "@fortawesome/free-solid-svg-icons";
import CartQuantityAddMinus from "./CartQuantityAddMinus";
import { useNavigate } from "react-router-dom";

function Restaurant() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((item) =>
            item.id === productId ? { ...item, quantity: quantity } : item
          )
          .filter((item) => item.quantity > 0) // Remove item if quantity is 0
    );
  };

  const menuItems = [
    {
      id: 1,
      name: "Panda Milk Tea",
      image: milkshake,
      price: 125,
      description:
        "A delicious blend of milk tea with chewy black and white pearls, perfect for any time of the day.",
    },
    {
      id: 2,
      name: "Abodo",
      image: food1,
      price: 140,
      description:
        "Tender pork adobo with pineapple and boiled egg, served with steamed rice and atchara on the side.",
    },
    {
      id: 3,
      name: "Strawberry Smoothie",
      image: food2,
      price: 130,
      description:
        "Refreshing strawberry smoothie made from real strawberries, blended to perfection.",
    },
    {
      id: 4,
      name: "Burgeer Overload",
      image: food3,
      price: 150,
      description:
        "Burger patty topped with cheese, lettuce, tomatoes, and special sauce, served with fries on the side.",
    },
  ];

  return (
    <div className="my-5">
      <div id="RestaurantInfo" className="container mt-5">
        <div className="row d-flex border-bottom pb-3">
          <div className="col-2 p-0 m-0">
            <div className="square-image-resto">
              <img src={milkshake} alt="Restaurant" />
            </div>
          </div>

          <div className="col-10">
            <p>
              <i className="bi bi-geo-alt"></i> Allen, Northern Samar
            </p>
            <h2>Hungry Hurry - Allen</h2>
            <span className="me-5">
              <FontAwesomeIcon icon={faMotorcycle} /> : &#8369;60 delivery fee
            </span>
            <span>
              <i className="bi bi-star-fill text-color-main"></i> 4.9 (100+)
              Reviews
            </span>
            <button
              type="button"
              className="btn-secondary-outline d-block mt-3"
            >
              <i className="bi bi-info-circle pe-2"></i> More info
            </button>
          </div>
        </div>
      </div>

      <div id="RestaurantMenu" className="container mt-5">
        <div id="PopularMenu" className="row gap-1">
          <div className="col-8 gap-3 p-0 d-flex flex-wrap">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="card card-menu-item d-flex flex-row"
              >
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.name}
                />
                <div>
                  <div className="card-body">
                    <h5 className="card-title m-0">{item.name}</h5>
                    <small>&#8369; {item.price}</small>
                    <p className="card-text card-text-menu">
                      {item.description}
                    </p>
                  </div>
                  <div>
                    <i
                      className="bi bi-plus-circle add-to-cart"
                      onClick={() => addToCart(item)}
                    ></i>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-3 m-0 rounded p-0 bg-light cart-view">
            <h5 className="p-3 border rounded-top text-center">Cart</h5>
            <div className="w-100 cart-items">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="cart-item d-flex flex-row justify-content-start px-2"
                  >
                    <div>
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="d-flex flex-column ps-2">
                      <h6>{item.name}</h6>
                      <small>&#8369; {item.price}</small>
                      <CartQuantityAddMinus
                        quantity={item.quantity}
                        onChange={(newQuantity) =>
                          updateQuantity(item.id, newQuantity)
                        }
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">Your cart is empty.</p>
              )}
            </div>

            {cart.length > 0 && (
              <button
                type="button"
                className="w-100 p-2 main-btn-primary"
                onClick={() => navigate("/checkout")}
              >
                Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Restaurant;
