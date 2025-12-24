"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Carousel from "@/components/Ui/Carousel";
import LoadingPage from "@/components/Layout/LoadingPage";
import React from "react";
import { CarouselSkeleton } from "../Ui/CarouselSkeleton";

function BrandSection() {

    const brands = useSelector((state: RootState) => state.products.brands);
    const loading = useSelector((state: RootState) => state.products.loading);

    if (loading && !brands.length) return <CarouselSkeleton />;

    return (
        <section className="main container my-3">
            <Carousel images={brands.map((brand,ind) => brand.image)} />
        </section>
    );
}


export const BrandView = React.memo(BrandSection);