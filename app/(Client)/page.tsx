"use client";

import  { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { fetchBrands, fetchCategories, fetchProducts } from "@/store/slices/productSlice";
import { setToken } from "@/store/slices/authSlice";
import { BrandView } from "@/components/Sections/BrandSection";
import { CategoryView } from "@/components/Sections/CategorySection";
import { ProductView } from "@/components/Sections/ProductSection";

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
