"use client";

import  { useEffect } from "react";
import { fetchBrands, fetchCategories, fetchProducts } from "@/store/slices/productSlice";
import { setToken } from "@/store/slices/authSlice";
import { BrandView } from "@/components/Sections/BrandSection";
import { CategoryView } from "@/components/Sections/CategorySection";
import { ProductView } from "@/components/Sections/ProductSection";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function Home() {
    return (
        <>
            <BrandView />
            <CategoryView />
            <ProductView />
        </>
    );
}
