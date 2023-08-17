"use client";
import Image from "next/image";
import Slider from "react-slick";

const Carusel = ({ products }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {products?.map((pr) => {
        if (pr !== null) {
          return (
            <div
              key={pr}
              className="bg-white backdrop-blur-md bg-opacity-20 rounded"
            >
              <Image
                src={pr?.image?.url}
                alt="product img"
                height={200}
                width={300}
                style={{
                  objectFit: "cover",
                  height: "160px",
                  width: "100%",
                  borderRadius: "5px",
                }}
              />
              <p className="text-center py-2 text-white text-base">
                {pr?.title}
              </p>
            </div>
          );
        }
      })}
    </Slider>
  );
};

export default Carusel;
