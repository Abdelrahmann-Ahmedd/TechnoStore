"use client"
import { Category, PaginatedData } from "@/models/Product";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

function SwipeToSlide( {data}:PaginatedData<Category>) {
    const settings = {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 5,
         responsive: [
            {
                breakpoint: 1200,
                settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                },
            },
            {
                breakpoint: 990,
                settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                },
            },
            {
                breakpoint: 765,
                settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                },
            },
            {
                breakpoint: 526,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                },
            },
            ],
        swipeToSlide: true,
        afterChange: function(index:number) {
        console.log(
            `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
        );
        }
    };
    return (
        <div className="slider-container w-100">
            <Slider {...settings}>
            {data.map((cat)=> <figure className="w-100" key={cat._id}> <Image width={250} height={250} alt={cat.name} src={cat.image} /> </figure>)}
            </Slider>
        </div>
    );
}

const CategorySlider = React.memo(SwipeToSlide);

export default CategorySlider;
