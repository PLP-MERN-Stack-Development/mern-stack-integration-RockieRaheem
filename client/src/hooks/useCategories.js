// useCategories.js - Custom hook for categories

import { useState, useEffect } from "react";
import { categoryService } from "../services/api";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoryService.getAllCategories();
      setCategories(data.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    loading,
    error,
    fetchCategories,
  };
};
