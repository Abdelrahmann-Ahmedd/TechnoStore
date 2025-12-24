"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {ProductList} from "@/components/Product/ProductList";
import React, { useMemo } from "react";
import LoadingPage from "@/components/Layout/LoadingPage";
import ProductCardSkeleton from "../Ui/ProductCardSkeleton";

function ProductSection() {
    const products = useSelector((state: RootState) => state.products.products);
    const loading = useSelector((state: RootState) => state.products.loading);

    const memoMeta = useMemo(()=>{
        return { currentPage: 1, totalPages: 1 }
    },[])

    return (
        <section className="container">
            <h2 className="fs-1 mb-3">Best Selling</h2>
            {loading&&products.length===0?(
                <ProductCardSkeleton />
            ):(
                <ProductList data={products} results={0}  metadata={memoMeta} />
            )}
        </section>
    );
}


export const ProductView = React.memo(ProductSection);


