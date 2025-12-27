"use client";


import {ProductList} from "@/components/Product/ProductList";
import React, { useMemo } from "react";
import ProductCardSkeleton from "../Ui/ProductCardSkeleton";
import { useAppSelector } from "@/store/hooks";

function ProductSection() {
    const {products, wishlistproducts, loading} = useAppSelector((state) => state.products);
    const memoMeta = useMemo(()=>{
        return { currentPage: 1, totalPages: 1 }
    },[])

    

    return (
        <section className="container">
            <h2 className="fs-1 mb-3">Best Selling</h2>
            {loading&&products.length===0?(
                <ProductCardSkeleton />
            ):(
                <ProductList allData={{data:products , results:0 , metadata:memoMeta}} compare={wishlistproducts}  />
            )}
        </section>
    );
}


export const ProductView = React.memo(ProductSection);


