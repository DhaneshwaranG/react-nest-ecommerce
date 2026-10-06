import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import Checkout from "./Pages/Checkout";

import type { RootState } from "./Redux/Store";

function App() {
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    document.body.classList.remove("dark-theme", "light-theme");

    document.body.classList.add(`${theme}-theme`);
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Home />} />

        <Route path="/product/:id" element={<Product />} />

        <Route path="*" element={<Navigate to="/login" replace />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
