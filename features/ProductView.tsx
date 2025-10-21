"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts, fetchCategories } from "@/store/slices/productSlice";
import { Category, Product } from "@/models/Product";
import LoadingPage from "@/components/Layout/LoadingPage";
import toast from "react-hot-toast";
import {Card} from "@/components/Product/Card";

export default function ProductView() {
  const dispatch = useAppDispatch();
  const { products, categories, loading, error } = useAppSelector((state) => state.products);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const pageSize = 12;

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, selectedCategory, currentPage]);

  const memoCategory = useMemo(()=>{
    return categories;
  },[categories])

  const memoProduct = useMemo(()=>{
    return products
  },[products])
  // Filter products by category
  let filteredProducts: Product[] =
    selectedCategory === "all"
      ? [...memoProduct]
      : memoProduct.filter((p) => p.category._id === selectedCategory);

  // Sort products by price
  filteredProducts = [...filteredProducts].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  // Paginate products
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );



  if (loading) return <LoadingPage />;
  
  if (error) {
    toast.error(error);
    return <div className="text-center text-danger p-4">{error}</div>;
  }

  return (
    <div className="container my-5">
      {/* Filters */}
        <div className="m-auto mb-4 w-75 d-flex flex-column align-items-center">
          <h1 className="mb-2">Category</h1>
          <select
            className="form-select w-75 text-center"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All</option>
            {memoCategory.map((cat: Category) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      <div className="row mb-4 align-items-center">


        {/* Sort - Right side of category */}
        <div className="col-md-12 d-flex justify-content-center justify-content-md-end align-items-center mt-3 mt-md-0">
          <h5 className="ms-auto mb-0">Sort</h5>
          <i
            style={{cursor:"pointer"}}
            className={`fa-solid text-primary fa-filter fa-lg cursor-pointer`}
            onClick={() =>
              setSortOrder(sortOrder === "asc" ? "desc" : "asc")
            }
            title={sortOrder === "asc" ? "Low to High" : "High to Low"}
          ></i>
        </div>
      </div>

      {/* Products Grid */}
      <div className="row g-4">
        {paginatedProducts.map((product) => (
          <div
            key={product._id}
            className="col-12 col-xl-3 col-md-6 col-lg-4 d-flex justify-content-center"
          >
            <Card {...product} />
          </div>
        ))}
        {paginatedProducts.length === 0 && (
          <div className="col-12 text-center py-5">
            <h4>No products found in this category.</h4>
          </div>
        )}
      </div>

      {/* Pagination */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li
              key={page}
              className={`page-item ${currentPage === page ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
