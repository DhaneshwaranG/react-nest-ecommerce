import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Navbar from "../Components/Navbar";

import type { RootState } from "../Redux/Store";

import { formatINR } from "../Utils/currency";

import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const deliveryFee = subtotal > 0 ? 40 : 0;

  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <Navbar />

        <main className="checkout-empty">
          <div className="checkout-empty-card">
            <h2>Your cart is empty</h2>

            <p>Add some products to continue to checkout.</p>

            <button type="button" onClick={() => navigate("/home")}>
              Continue Shopping
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <Navbar />

      <main className="checkout-container">
        <button
          type="button"
          className="checkout-back-button"
          onClick={() => navigate("/cart")}
        >
          ← Back to Cart
        </button>

        <h1>Checkout</h1>

        <div className="checkout-layout">
          <section className="checkout-form-section">
            <div className="checkout-card">
              <h2>Delivery Information</h2>

              <div className="checkout-form">
                <div className="checkout-field">
                  <label htmlFor="fullName">Full Name</label>

                  <input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="email">Email</label>

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="phone">Phone Number</label>

                  <input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="address">Address</label>

                  <textarea
                    id="address"
                    rows={4}
                    placeholder="Enter your delivery address"
                  />
                </div>

                <div className="checkout-row">
                  <div className="checkout-field">
                    <label htmlFor="city">City</label>

                    <input id="city" type="text" placeholder="Enter city" />
                  </div>

                  <div className="checkout-field">
                    <label htmlFor="pincode">Pincode</label>

                    <input
                      id="pincode"
                      type="text"
                      placeholder="Enter pincode"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="checkout-card">
              <h2>Payment Method</h2>

              <div className="payment-method">
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    defaultChecked
                  />

                  <span>Cash on Delivery</span>
                </label>

                <label>
                  <input type="radio" name="payment" value="online" />

                  <span>Online Payment</span>
                </label>
              </div>
            </div>
          </section>

          <aside className="checkout-summary">
            <h2>Order Summary</h2>

            <div className="checkout-items">
              {cartItems.map((item) => (
                <div className="checkout-item" key={item.product.id}>
                  <img src={item.product.thumbnail} alt={item.product.title} />

                  <div className="checkout-item-info">
                    <h3>{item.product.title}</h3>

                    <p>Qty: {item.quantity}</p>

                    <strong>
                      {formatINR(item.product.price * item.quantity)}
                    </strong>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row">
              <span>Subtotal</span>

              <span>{formatINR(subtotal)}</span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>

              <span>{formatINR(deliveryFee)}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total</span>

              <strong>{formatINR(total)}</strong>
            </div>

            <button
              type="button"
              className="place-order-button"
              onClick={() => {
                alert("Order placed successfully!");
              }}
            >
              Place Order
            </button>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Checkout;
