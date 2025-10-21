"use client";
import { Category, PaginatedData } from "@/models/Product";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CategorySlider({ data }: PaginatedData<Category>) {
  const [slidesToShow, setSlidesToShow] = useState(5);
  const sliderRef = useRef<Slider>(null);

  const handleResize = () => {
    const width = window.innerWidth;
    if (width <= 500) setSlidesToShow(1);
    else if (width <= 768) setSlidesToShow(2);
    else if (width <= 1100) setSlidesToShow(3);
    else if (width <= 1400) setSlidesToShow(4);
    else setSlidesToShow(5);
  };

  useEffect(() => {
    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const memoData = useMemo(()=>{
    return data;
  },[data])

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    swipeToSlide: true,
    pauseOnHover: true,
  };

  return (
    <div className="slider-container w-100 py-4">
      <Slider ref={sliderRef} {...settings}>
        {memoData.map((cat) => (
          <div key={cat._id} className="px-3">
            <div className="category-card text-center rounded-4 shadow-sm border border-light-subtle p-3 bg-white h-100 d-flex flex-column justify-content-center align-items-center">
              <div className="image-wrapper mb-2">
                <Image
                  width={200}
                  height={200}
                  src={cat.image}
                  alt={cat.name}
                  className="category-img rounded-circle"
                />
              </div>
              <h6 className="fw-semibold mt-2 text-truncate">{cat.name}</h6>
            </div>
          </div>
        ))}
      </Slider>

      <style jsx global>{`
        .slick-prev:before,
        .slick-next:before {
          color: #0d6efd;
          font-size: 25px;
        }
        .category-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
        }
        .image-wrapper {
          width: 160px;
          height: 160px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }
        .category-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        @media (max-width: 992px) {
          .image-wrapper {
            width: 130px;
            height: 130px;
          }
        }
        @media (max-width: 576px) {
          .image-wrapper {
            width: 100px;
            height: 100px;
          }
        }
      `}</style>
    </div>
  );
}

export default React.memo(CategorySlider);
