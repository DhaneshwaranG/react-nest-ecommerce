import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addToCart } from "../Redux/Slices/cartSlice";

import type { AppDispatch } from "../Redux/Store";
import type { Product } from "../Type/product";

import { formatINR } from "../Utils/currency";

import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    dispatch(addToCart(product));
  };

  return (
    <article
      className="product-card"
      onClick={handleProductClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleProductClick();
        }
      }}
    >
      <div className="product-image-container">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-image"
        />

        {(product.discountPercentage ?? 0) > 0 && (
          <span className="product-discount">
            {Math.round(product.discountPercentage ?? 0)}% OFF
          </span>
        )}
      </div>

      <div className="product-card-content">
        <span className="product-category">{product.category}</span>

        <h3 className="product-title" title={product.title}>
          {product.title}
        </h3>

        <p className="product-description">{product.description}</p>

        <div className="product-info">
          <div className="product-price">{formatINR(product.price)}</div>

          <div className="product-rating">
            <span className="rating-star">★</span>

            <span>{product.rating.toFixed(1)}</span>
          </div>
        </div>

        <button
          type="button"
          className="add-cart-button"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
