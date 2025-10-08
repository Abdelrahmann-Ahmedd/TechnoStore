"use client"
import React from "react";
import Slider from "react-slick";

function SimpleSlider({images}:{images:string[]}) {
    const settings = {
        dots: false,
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className="slider-container ">
            <Slider {...settings}>
                {images.map((imag,ind)=> <figure key={ind} className="">
                    <img  className="w-100" src={imag} alt="product" style={{height:"350px"}} />
                </figure>)}
            </Slider>
        </div>
    );
}

const Carousel = React.memo(SimpleSlider);

export default Carousel;
