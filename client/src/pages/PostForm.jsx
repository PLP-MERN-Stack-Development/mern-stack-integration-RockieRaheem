// PostForm.jsx - Create/Edit post form

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postService } from "../services/api";
import { useCategories } from "../hooks/useCategories";
import "./PostForm.css";

const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories } = useCategories();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    tags: "",
    isPublished: false,
  });
  const [featuredImage, setFeaturedImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const data = await postService.getPost(id);
      const post = data.data;
      setFormData({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt || "",
        category: post.category._id,
        tags: post.tags.join(", "),
        isPublished: post.isPublished,
      });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch post");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFeaturedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("excerpt", formData.excerpt);
      data.append("category", formData.category);
      data.append("isPublished", formData.isPublished);

      // Convert tags string to array
      if (formData.tags) {
        const tagsArray = formData.tags.split(",").map((tag) => tag.trim());
        tagsArray.forEach((tag) => data.append("tags[]", tag));
      }

      if (featuredImage) {
        data.append("featuredImage", featuredImage);
      }

      if (id) {
        await postService.updatePost(id, data);
      } else {
        await postService.createPost(data);
      }

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-form-page">
      <div className="post-form-container card">
        <h1>{id ? "Edit Post" : "Create New Post"}</h1>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="excerpt" className="form-label">
              Excerpt
            </label>
            <input
              type="text"
              id="excerpt"
              name="excerpt"
              className="form-control"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Brief description of your post"
            />
          </div>

          <div className="form-group">
            <label htmlFor="content" className="form-label">
              Content *
            </label>
            <textarea
              id="content"
              name="content"
              className="form-control"
              value={formData.content}
              onChange={handleChange}
              rows="15"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Category *
              </label>
              <select
                id="category"
                name="category"
                className="form-control"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="featuredImage" className="form-label">
                Featured Image
              </label>
              <input
                type="file"
                id="featuredImage"
                name="featuredImage"
                className="form-control"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="tags" className="form-label">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              className="form-control"
              value={formData.tags}
              onChange={handleChange}
              placeholder="javascript, react, nodejs (comma separated)"
            />
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
              />
              <span>Publish immediately</span>
            </label>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Saving..." : id ? "Update Post" : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
