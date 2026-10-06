import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Navbar from "../Components/Navbar";
import ProductCard from "../Components/ProductCard";

import type { RootState } from "../Redux/Store";

import { useGetProductsQuery } from "../Services/Api/productApi";

import "./Home.css";

function Home() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const [searchInput, setSearchInput] = useState("");

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const limit = 12;

  const { data, isLoading, isFetching, isError } = useGetProductsQuery({
    page,
    limit,
    search: search || undefined,
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const products = data?.data || [];

  const totalProducts = data?.meta?.total || 0;

  const totalPages = data?.meta?.totalPages || 1;

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();

    const value = searchInput.trim();

    setSearch(value);
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearch("");
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getPageNumbers = () => {
    const pages: number[] = [];

    const start = Math.max(1, page - 2);

    const end = Math.min(totalPages, page + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="home-page">
      <Navbar />

      <main className="home-content">
        <section className="home-hero">
          <div className="home-hero-content">
            <span className="home-badge">EXPLORE OUR STORE</span>

            <h1>
              Discover products
              <span> you'll love.</span>
            </h1>

            <p>
              Browse our collection of quality products, find what you need, and
              add your favorites to your cart.
            </p>
          </div>

          <form className="home-search" onSubmit={handleSearch}>
            <span className="search-icon">⌕</span>

            <input
              type="text"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search products..."
            />

            {searchInput && (
              <button
                type="button"
                className="search-clear"
                onClick={handleClearSearch}
              >
                ×
              </button>
            )}

            <button type="submit" className="search-submit">
              Search
            </button>
          </form>
        </section>

        <section className="products-section">
          <div className="products-heading">
            <div>
              <h2>{search ? `Results for "${search}"` : "All Products"}</h2>

              <p>{totalProducts} products found</p>
            </div>

            {search && (
              <button className="clear-search" onClick={handleClearSearch}>
                Clear Search
              </button>
            )}
          </div>

          {isError && (
            <div className="products-error">
              <h3>Unable to load products</h3>

              <p>Please check that the backend server is running.</p>
            </div>
          )}

          {isLoading && (
            <div className="products-loading">
              <div className="loading-spinner"></div>

              <p>Loading products...</p>
            </div>
          )}

          {!isLoading && !isError && products.length === 0 && (
            <div className="empty-products">
              <div className="empty-icon">?</div>

              <h3>No products found</h3>

              <p>Try searching with another keyword.</p>

              <button onClick={handleClearSearch}>View All Products</button>
            </div>
          )}

          {!isLoading && !isError && products.length > 0 && (
            <>
              <div
                className={`products-grid ${
                  isFetching ? "products-refreshing" : ""
                }`}
              >
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="pagination">
                <button
                  className="pagination-button"
                  disabled={page === 1 || isFetching}
                  onClick={() => handlePageChange(page - 1)}
                >
                  Previous
                </button>

                <div className="page-numbers">
                  {getPageNumbers().map((pageNumber) => (
                    <button
                      key={pageNumber}
                      className={`page-number ${
                        pageNumber === page ? "active" : ""
                      }`}
                      onClick={() => handlePageChange(pageNumber)}
                      disabled={isFetching}
                    >
                      {pageNumber}
                    </button>
                  ))}
                </div>

                <button
                  className="pagination-button"
                  disabled={page === totalPages || isFetching}
                  onClick={() => handlePageChange(page + 1)}
                >
                  Next
                </button>
              </div>

              <div className="pagination-info">
                Page {page} of {totalPages}
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default Home;
