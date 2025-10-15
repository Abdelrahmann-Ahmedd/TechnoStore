"use client";
import { Category, PaginatedData } from "@/models/Product";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CategorySlider({ data }: PaginatedData<Category>) {
  const sliderRef = useRef<Slider>(null);
  const [ready, setReady] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    swipeToSlide: true,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1400, settings: { slidesToShow: 4 } },
      { breakpoint: 1100, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 500, settings: { slidesToShow: 1 } },
    ],
  };

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!ready) return <div style={{ height: 250 }} />;

  return (
    <div className="slider-container w-100 py-4">
      <Slider ref={sliderRef} {...settings}>
        {data.map((cat) => (
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
