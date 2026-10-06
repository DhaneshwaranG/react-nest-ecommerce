import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../Components/Navbar";
import { addToCart } from "../Redux/Slices/cartSlice";

import type { AppDispatch } from "../Redux/Store";

import { useGetProductByIdQuery } from "../Services/Api/productApi";

import { formatINR } from "../Utils/currency";

import "./Product.css";

function Product() {
  const { id } = useParams<{
    id: string;
  }>();

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const productId = Number(id);

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(productId, {
    skip: !id || Number.isNaN(productId),
  });

  const [selectedImage, setSelectedImage] = useState(0);

  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }

    navigate("/cart");
  };

  if (isLoading) {
    return (
      <div className="product-details-page">
        <Navbar />

        <div className="product-details-loading">
          <div className="details-spinner"></div>

          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="product-details-page">
        <Navbar />

        <div className="product-details-error">
          <h2>Product not found</h2>

          <p>We couldn't load this product.</p>

          <button type="button" onClick={() => navigate("/home")}>
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.thumbnail];

  const currentImage = productImages[selectedImage] || product.thumbnail;

  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <div className="product-details-page">
      <Navbar />

      <main className="product-details-container">
        <button
          type="button"
          className="back-products-button"
          onClick={() => navigate("/home")}
        >
          ← Back to Products
        </button>

        <section className="product-details-card">
          <div className="product-gallery">
            <div className="product-thumbnails">
              {productImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  className={`thumbnail-button ${
                    selectedImage === index ? "selected" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.title} ${index + 1}`} />
                </button>
              ))}
            </div>

            <div className="main-product-image">
              {product.discountPercentage > 0 && (
                <span className="details-discount">
                  {Math.round(product.discountPercentage)}% OFF
                </span>
              )}

              <img src={currentImage} alt={product.title} />
            </div>
          </div>

          <div className="product-details-info">
            <span className="details-category">{product.category}</span>

            <h1>{product.title}</h1>

            {product.brand && (
              <p className="details-brand">
                Brand: <strong>{product.brand}</strong>
              </p>
            )}

            <div className="details-rating">
              <span className="rating-box">★ {product.rating.toFixed(1)}</span>

              <span>Customer Rating</span>
            </div>

            <div className="details-divider"></div>

            <p className="details-description">{product.description}</p>

            <div className="details-price-section">
              <span className="details-price">
                {formatINR(discountedPrice)}
              </span>

              {product.discountPercentage > 0 && (
                <span className="details-original-price">
                  {formatINR(product.price)}
                </span>
              )}
            </div>

            {product.discountPercentage > 0 && (
              <p className="details-save">
                You save {formatINR(product.price - discountedPrice)}
              </p>
            )}

            <div className="stock-status">
              <span className={product.stock > 0 ? "in-stock" : "out-of-stock"}>
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>

              {product.stock > 0 && (
                <span>{product.stock} units available</span>
              )}
            </div>

            {product.stock > 0 && (
              <>
                <div className="quantity-section">
                  <span>Quantity</span>

                  <div className="quantity-control">
                    <button
                      type="button"
                      onClick={handleDecrease}
                      disabled={quantity <= 1}
                    >
                      −
                    </button>

                    <span>{quantity}</span>

                    <button
                      type="button"
                      onClick={handleIncrease}
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="details-add-cart"
                  onClick={handleAddToCart}
                >
                  Add {quantity > 1 ? `${quantity} Items` : "to Cart"}
                </button>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Product;
