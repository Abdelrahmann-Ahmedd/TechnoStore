"use client";

import  { useEffect } from "react";
import { fetchBrands, fetchCategories, fetchProducts, fetchWishlistProducts } from "@/store/slices/productSlice";
import { setToken } from "@/store/slices/authSlice";
import { BrandView } from "@/components/Sections/BrandSection";
import { CategoryView } from "@/components/Sections/CategorySection";
import { ProductView } from "@/components/Sections/ProductSection";
import { useAppDispatch } from "@/store/hooks";

export default function Home() {
    const dispatch = useAppDispatch();

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
