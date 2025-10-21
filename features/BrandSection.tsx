"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Carousel from "@/components/Ui/Carousel";
import LoadingPage from "@/components/Layout/LoadingPage";
import React, { useMemo } from "react";

function BrandSection() {

    const brands = useSelector((state: RootState) => state.products.brands);
    const loading = useSelector((state: RootState) => state.products.loading);

    const memoBrands = useMemo(()=>{
        return brands;
    },[brands]);

    if (loading && !memoBrands.length) return <LoadingPage />;

    return (
        <section className="main container my-3">
            <Carousel images={memoBrands.map((brand) => brand.image)} />
        </section>
    );
}


export const BrandView = React.memo(BrandSection);