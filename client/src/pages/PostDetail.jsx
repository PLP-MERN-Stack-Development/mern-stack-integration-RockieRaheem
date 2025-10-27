// PostDetail.jsx - Single post detail page

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { postService } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import "./PostDetail.css";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const data = await postService.getPost(id);
      setPost(data.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch post");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await postService.deletePost(post._id);
        navigate("/");
      } catch (err) {
        alert(err.response?.data?.error || "Failed to delete post");
      }
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      setSubmittingComment(true);
      const data = await postService.addComment(post._id, { content: comment });
      setPost({
        ...post,
        comments: [...post.comments, data.data],
      });
      setComment("");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add comment");
    } finally {
      setSubmittingComment(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!post) {
    return <div className="alert alert-danger">Post not found</div>;
  }

  const isAuthor = user && post.author._id === user.id;

  return (
    <div className="post-detail">
      <div className="post-header">
        {post.featuredImage && (
          <img
            src={`http://localhost:5000/uploads/${post.featuredImage}`}
            alt={post.title}
            className="post-featured-image"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/1200x400?text=No+Image";
            }}
          />
        )}

        <div className="post-meta-header">
          <span className="post-category">{post.category.name}</span>
          <span className="post-date">{formatDate(post.createdAt)}</span>
        </div>

        <h1>{post.title}</h1>

        <div className="post-author-info">
          <img
            src={`http://localhost:5000/uploads/${post.author.avatar}`}
            alt={post.author.name}
            className="author-avatar-large"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/60?text=" +
                post.author.name.charAt(0);
            }}
          />
          <div>
            <p className="author-name">{post.author.name}</p>
            <p className="author-bio">
              {post.author.bio || "No bio available"}
            </p>
          </div>
        </div>

        {isAuthor && (
          <div className="post-actions">
            <Link
              to={`/posts/${post._id}/edit`}
              className="btn btn-secondary btn-sm"
            >
              Edit Post
            </Link>
            <button onClick={handleDelete} className="btn btn-danger btn-sm">
              Delete Post
            </button>
          </div>
        )}
      </div>

      <div className="post-content-section card">
        <div className="post-content">
          {post.content.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="post-tags">
            {post.tags.map((tag, index) => (
              <span key={index} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="comments-section card">
        <h3>Comments ({post.comments.length})</h3>

        {isAuthenticated && (
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <div className="form-group">
              <textarea
                className="form-control"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="3"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submittingComment}
            >
              {submittingComment ? "Posting..." : "Post Comment"}
            </button>
          </form>
        )}

        {!isAuthenticated && (
          <p className="text-muted">
            Please <Link to="/login">login</Link> to leave a comment.
          </p>
        )}

        <div className="comments-list">
          {post.comments.length === 0 ? (
            <p className="text-muted">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            post.comments.map((comment) => (
              <div key={comment._id} className="comment">
                <img
                  src={`http://localhost:5000/uploads/${comment.user.avatar}`}
                  alt={comment.user.name}
                  className="comment-avatar"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/40?text=" +
                      comment.user.name.charAt(0);
                  }}
                />
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-author">{comment.user.name}</span>
                    <span className="comment-date">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p>{comment.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
