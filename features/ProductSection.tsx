"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {ProductList} from "@/components/Product/ProductList";
import React, { useMemo } from "react";
import LoadingPage from "@/components/Layout/LoadingPage";

function ProductSection() {
    const products = useSelector((state: RootState) => state.products.products);
    const loading = useSelector((state: RootState) => state.products.loading);

    const memoMeta = useMemo(()=>{
        return { currentPage: 1, totalPages: 1 }
    },[])

    if (loading&&!products.length) return <LoadingPage />

    return (
        <section className="container">
            <h2 className="fs-1 mb-3">Best Selling</h2>
            <ProductList data={products} results={0}  metadata={memoMeta} />
        </section>
    );
}


export const ProductView = React.memo(ProductSection);


