import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../Redux/Slices/authSlice";
import type { RootState, AppDispatch } from "../Redux/Store";

import ThemeToggle from "./ThemeToggle";

import "./Navbar.css";

function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const handleLogout = () => {
    dispatch(logout());

    navigate("/login", {
      replace: true,
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="navbar-logo" onClick={() => navigate("/home")}>
          E-Products
        </h2>
      </div>

      <div className="navbar-right">
        <button
          className="navbar-cart"
          type="button"
          onClick={() => navigate("/cart")}
        >
          Cart
          {cartItemCount > 0 && (
            <span className="cart-count">{cartItemCount}</span>
          )}
        </button>

        <ThemeToggle />

        <button className="navbar-logout" type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
