"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ProductList from "@/components/Product/ProductList";
import React from "react";
import LoadingPage from "@/components/Layout/LoadingPage";

function ProductSection() {
    const products = useSelector((state: RootState) => state.products.products);
    const loading = useSelector((state: RootState) => state.products.loading);

    if (loading&&!products.length)
        <LoadingPage />

    return (
        <section className="container">
            <ProductList data={products} results={0} />
        </section>
    );
}


export const ProductView = React.memo(ProductSection);


