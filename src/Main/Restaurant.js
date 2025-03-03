import { faMotorcycle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import renderErrorMessages from "../errorHelper";
import {
  addCartItem,
  deleteCartItem,
  fetchCartItems,
  updateCartItem,
} from "../services/cartItemService";
import { fetchProducts } from "../services/productService";
import CartQuantityAddMinus from "./CartQuantityAddMinus";

function Restaurant() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const restaurant = state?.restaurant;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchRestoProducts = async () => {
      try {
        setIsLoading(true);
        const storeProducts = await fetchProducts(restaurant?.id);
        setProducts(storeProducts);
        const myCartItems = await fetchCartItems();
        setCartItems(myCartItems);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestoProducts();
  }, [restaurant]);

  const formatTime = (timeStr) => {
    if (!timeStr) return "";

    const [hours, minutes] = timeStr.split(":");
    const hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
  };

  const handleAddToCart = async (productId) => {
    try {
      let cartItemExists = false;

      setCartItems((prevCartItems) => {
        const existingItem = prevCartItems.find(
          (cartItem) => cartItem?.product?.id === productId
        );
        if (existingItem) {
          cartItemExists = true;
          return prevCartItems.map((cartItem) =>
            cartItem?.product?.id === productId
              ? { ...cartItem, quantity: cartItem?.quantity + 1 }
              : cartItem
          );
        } else {
          return prevCartItems;
        }
      });
      if (!cartItemExists) {
        const addedCartItem = await addCartItem(productId);
        setCartItems((prevCartItems) => [addedCartItem, ...prevCartItems]);
      }
    } catch (error) {
      setError(error);
    }
  };

  const updateQuantity = async (cartItemId, quantity) => {
    try {
      if (quantity === 0) {
        await deleteCartItem(cartItemId);
      } else {
        await updateCartItem(cartItemId, quantity);
      }
      setCartItems((prevCart) =>
        prevCart
          .map((cartItem) =>
            cartItem.id === cartItemId
              ? { ...cartItem, quantity: quantity }
              : cartItem
          )
          .filter((cartItem) => cartItem.quantity > 0)
      );
    } catch (error) {
      setError(error);
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div className="my-5">
      <div id="RestaurantInfo" className="container mt-5">
        <div className="row d-flex border-bottom pb-3">
          <div className="col-2 p-0 m-0">
            <div className="square-image-resto">
              <img src={restaurant?.image} alt="restaurant_image" />
            </div>
          </div>

          <div className="col-10">
            <div className="ms-2">
              <h2>{restaurant?.display_name}</h2>
              <span className="mt-2 me-5">
                <i className="bi bi-geo-alt"></i> {restaurant?.address?.city},{" "}
                {restaurant?.address?.province}
              </span>
              <br />
              <span className="me-5">
                <FontAwesomeIcon icon={faMotorcycle} /> : &#8369;
                {restaurant?.delivery_fee} delivery fee
              </span>
              <span className="me-5">
                <br />
                <i className="bi bi-clock"></i> :{" "}
                {formatTime(restaurant?.opening_time)} -{" "}
                {formatTime(restaurant?.closing_time)}
              </span>
              <span className="me-5">
                <br />
                {restaurant?.is_open ? (
                  <>
                    <i className="bi bi-door-open"></i> OPEN
                  </>
                ) : (
                  <>
                    <i className="bi bi-door-closed"></i> CLOSED
                  </>
                )}
              </span>
            </div>
            {/* <span>
              <i className="bi bi-star-fill text-color-main"></i> 4.9 (100+)
              Reviews
            </span>
            <button
              type="button"
              className="btn-secondary-outline d-block mt-3"
              data-bs-toggle="modal"
              data-bs-target="#moreInfo"
            >
              <i className="bi bi-info-circle pe-2"></i> More info
            </button>
            <MoreInfo /> */}
          </div>
        </div>
      </div>
      {error ? (
        renderErrorMessages(error)
      ) : (
        <div id="RestaurantMenu" className="container mt-5">
          <div id="PopularMenu" className="row gap-1">
            <div
              className={`d-flex flex-wrap gap-3 p-0 ${
                restaurant?.is_open ? "col-8" : "col-12"
              }`}
            >
              {products.map((product) => (
                <div
                  key={product?.id}
                  className="card card-menu-item d-flex flex-row"
                >
                  <img
                    src={product?.image}
                    className="card-img-top"
                    alt={product?.name}
                  />
                  <div>
                    <div className="card-body">
                      <h5 className="card-title m-0">{product?.name}</h5>
                      <small>&#8369; {product?.price}</small>
                      <p className="card-text card-text-menu m-0">
                        {product?.description}
                      </p>
                      <strong>
                        {product?.is_available ? "Available" : "Unavailable"}
                      </strong>
                    </div>
                    {restaurant?.is_open && product?.is_available && (
                      <div>
                        <i
                          className="bi bi-plus-circle add-to-cart"
                          onClick={() => handleAddToCart(product?.id)}
                        ></i>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {restaurant?.is_open && (
              <div className="col-4 m-0 rounded p-0 bg-light cart-view">
                <h5 className="p-3 border rounded-top text-center">Cart</h5>
                <div className="w-100 cart-items">
                  {cartItems.length > 0 ? (
                    cartItems.map((cartItem) => (
                      <div
                        key={cartItem?.id}
                        className="cart-item d-flex flex-row justify-content-start px-2"
                      >
                        <div>
                          <img
                            src={cartItem?.product?.image}
                            alt={cartItem?.product?.name}
                          />
                        </div>
                        <div className="d-flex flex-column ps-2">
                          <h6>{cartItem?.product?.name}</h6>
                          <small>
                            &#8369;{" "}
                            {cartItem?.product?.price * cartItem?.quantity}
                          </small>
                          <CartQuantityAddMinus
                            quantity={cartItem?.quantity}
                            onChange={(newQuantity) =>
                              updateQuantity(cartItem?.id, newQuantity)
                            }
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center">Your cart is empty.</p>
                  )}
                </div>

                {cartItems.length > 0 && (
                  <button
                    type="button"
                    className="w-100 p-2 main-btn-primary"
                    onClick={() => navigate("/checkout")}
                  >
                    Checkout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Restaurant;
