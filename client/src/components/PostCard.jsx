// PostCard.jsx - Post card component

import { Link } from "react-router-dom";
import "./PostCard.css";

const PostCard = ({ post }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="post-card card">
      {post.featuredImage && (
        <div className="post-card-image">
          <img
            src={`http://localhost:5000/uploads/${post.featuredImage}`}
            alt={post.title}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x250?text=No+Image";
            }}
          />
        </div>
      )}

      <div className="post-card-content">
        <div className="post-card-meta">
          <span className="post-card-category">
            {post.category?.name || "Uncategorized"}
          </span>
          <span className="post-card-date">{formatDate(post.createdAt)}</span>
        </div>

        <h3 className="post-card-title">
          <Link to={`/posts/${post._id}`}>{post.title}</Link>
        </h3>

        <p className="post-card-excerpt">
          {post.excerpt || post.content.substring(0, 150) + "..."}
        </p>

        <div className="post-card-footer">
          <div className="post-card-author">
            <img
              src={`http://localhost:5000/uploads/${post.author?.avatar}`}
              alt={post.author?.name}
              className="author-avatar"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/40?text=" +
                  post.author?.name?.charAt(0);
              }}
            />
            <span>{post.author?.name}</span>
          </div>

          <div className="post-card-stats">
            <span>👁️ {post.viewCount || 0}</span>
            <span>💬 {post.comments?.length || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
