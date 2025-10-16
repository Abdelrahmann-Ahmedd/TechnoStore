"use client"
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

function SimpleSlider({images}:{images:string[]}) {
    const settings = {
        dots: false,
        autoplay: true,
        autoplaySpeed: 2500,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className="slider-container ">
            <Slider {...settings}>
                {images.map((imag,ind)=> <figure key={ind} className="">
                    <Image priority width={200} height={200}  className="w-100" src={imag} alt="product" style={{height:"400px"}} />
                </figure>)}
            </Slider>
        </div>
    );
}

const Carousel = React.memo(SimpleSlider);

export default Carousel;
