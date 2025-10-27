// usePosts.js - Custom hook for posts

import { useState, useEffect } from "react";
import { postService } from "../services/api";

export const usePosts = (page = 1, limit = 10, category = null) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
  });

  useEffect(() => {
    fetchPosts();
  }, [page, limit, category]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await postService.getAllPosts(page, limit, category);
      setPosts(data.data);
      setPagination({
        page: data.page,
        pages: data.pages,
        total: data.total,
      });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData) => {
    try {
      const data = await postService.createPost(postData);
      setPosts([data.data, ...posts]);
      return data;
    } catch (err) {
      throw err;
    }
  };

  const updatePost = async (id, postData) => {
    try {
      const data = await postService.updatePost(id, postData);
      setPosts(posts.map((post) => (post._id === id ? data.data : post)));
      return data;
    } catch (err) {
      throw err;
    }
  };

  const deletePost = async (id) => {
    try {
      await postService.deletePost(id);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      throw err;
    }
  };

  return {
    posts,
    loading,
    error,
    pagination,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
  };
};
