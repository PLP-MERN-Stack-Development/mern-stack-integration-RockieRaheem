// Home.jsx - Home page component

import { useState } from "react";
import { usePosts } from "../hooks/usePosts";
import { useCategories } from "../hooks/useCategories";
import PostCard from "../components/PostCard";
import "./Home.css";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { posts, loading, error, pagination } = usePosts(
    currentPage,
    9,
    selectedCategory
  );
  const { categories } = useCategories();

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Welcome to MERN Blog</h1>
        <p>Discover amazing stories and share your thoughts with the world</p>
      </div>

      {categories.length > 0 && (
        <div className="category-filter">
          <button
            className={`btn btn-sm ${
              !selectedCategory ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => handleCategoryFilter(null)}
          >
            All Posts
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              className={`btn btn-sm ${
                selectedCategory === category._id
                  ? "btn-primary"
                  : "btn-outline"
              }`}
              onClick={() => handleCategoryFilter(category._id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}

      {posts.length === 0 ? (
        <div className="no-posts">
          <h3>No posts found</h3>
          <p>Be the first to create a post!</p>
        </div>
      ) : (
        <>
          <div className="posts-grid">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>

          {pagination.pages > 1 && (
            <div className="pagination">
              <button
                className="btn btn-secondary"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <span className="pagination-info">
                Page {pagination.page} of {pagination.pages}
              </span>

              <button
                className="btn btn-secondary"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pagination.pages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
