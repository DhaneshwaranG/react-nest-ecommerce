import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../Redux/Slices/cartSlice";

import type { RootState, AppDispatch } from "../Redux/Store";

import Navbar from "../Components/Navbar";

import "./Cart.css";

function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const items = useSelector((state: RootState) => state.cart.items);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <>
        <Navbar />

        <div className="cart-page">
          <div className="empty-cart">
            <h1>Your Cart</h1>

            <p>Your cart is empty.</p>

            <button type="button" onClick={() => navigate("/home")}>
              Continue Shopping
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="cart-page">
        <div className="cart-header">
          <h1>Shopping Cart</h1>

          <p>
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <div className="cart-item" key={item.product.id}>
                <div className="cart-item-image">
                  <img src={item.product.thumbnail} alt={item.product.title} />
                </div>

                <div className="cart-item-details">
                  <h2>{item.product.title}</h2>

                  <p>{item.product.description}</p>

                  <span className="cart-item-price">₹{item.product.price}</span>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(decreaseQuantity(item.product.id))
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() =>
                        dispatch(increaseQuantity(item.product.id))
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-button"
                    type="button"
                    onClick={() => dispatch(removeFromCart(item.product.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Items</span>

              <span>{totalItems}</span>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>

              <span>₹{totalPrice.toFixed(2)}</span>
            </div>

            <div className="summary-divider" />

            <div className="summary-total">
              <span>Total</span>

              <span>₹{totalPrice.toFixed(2)}</span>
            </div>

            <button
              type="button"
              className="checkout-button"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>

            <button
              className="clear-cart-button"
              type="button"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
