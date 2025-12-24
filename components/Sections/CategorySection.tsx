"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import CategorySlider from "@/components/Ui/CategorySlider";
import React, { useMemo } from "react";
import LoadingPage from "@/components/Layout/LoadingPage";
import { CategorySliderSkeleton } from "../Ui/CategoryCardSkeleton";

function CategorySection() {
    const categories = useSelector((state: RootState) => state.products.categories);
    const loading = useSelector((state: RootState) => state.products.loading);


    const memoMetaData = useMemo(()=>{
        return {
                currentPage: 0,
                numberOfPages: 0,
                limit: 0,
                nextPage: 0
            };
    },[]);


    return (
        <section className="container my-5">
            <h2 className="fs-1 mb-3">Category</h2>
            {loading&&categories.length===0?(
                <CategorySliderSkeleton />
            ):(
                <CategorySlider results={3} data={categories} metadata={memoMetaData} />
            )}
        </section>
    );
}

export const CategoryView = React.memo(CategorySection);