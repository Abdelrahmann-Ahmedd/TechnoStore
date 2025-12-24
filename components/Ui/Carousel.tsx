"use client"
import Image from "next/image";
import React, { useMemo } from "react";
import Slider from "react-slick";

function SimpleSlider({images}:{images:string[]}) {
    const settings = {
        dots: false,
        autoplay: true,
        autoplaySpeed: 5000,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const memoImages = useMemo(()=>{
        return images
    },[images])

    return (
        <div className="slider-container ">
            <Slider {...settings}>
                {memoImages.map((imag,ind)=> <figure key={ind} className="">
                    <Image 
                        priority={ind === 0}
                        loading={ind === 0 ? "eager" : "lazy"} 
                        width={200} 
                        height={200}  
                        className="w-100" 
                        src={imag} 
                        alt="product" 
                        style={{height:"400px"}} />
                </figure>)}
            </Slider>
        </div>
    );
}

const Carousel = React.memo(SimpleSlider);

export default Carousel;
