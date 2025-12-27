"use client";

import Carousel from "@/components/Ui/Carousel";
import React from "react";
import { CarouselSkeleton } from "../Ui/CarouselSkeleton";
import { useAppSelector } from "@/store/hooks";

function BrandSection() {

    const {brands, loading} = useAppSelector((state) => state.products);


    if (loading && !brands.length) return <CarouselSkeleton />;

    return (
        <section className="main container my-3">
            <Carousel images={brands.map((brand,ind) => brand.image)} />
        </section>
    );
}


export const BrandView = React.memo(BrandSection);