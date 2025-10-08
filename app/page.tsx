"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { fetchBrands, fetchCategories, fetchProducts } from "@/store/slices/productSlice";
import { setToken } from "@/store/slices/authSlice";
import { BrandView } from "@/features/BrandSection";
import { CategoryView } from "@/features/CategorySection";
import { ProductView } from "@/features/ProductSection";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchCategories());
    dispatch(fetchProducts());

    const token = localStorage.getItem("token");
    if (token) dispatch(setToken(token));
  }, [dispatch]);

  return (
    <>
      <BrandView />
      <CategoryView />
      <ProductView />
    </>
  );
}
