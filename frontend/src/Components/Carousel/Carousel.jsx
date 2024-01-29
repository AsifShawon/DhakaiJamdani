import React from "react";
import bgsharee1 from "./image/bg-sharee-1.png";
import bgsharee2 from "./image/bg-sharee-2.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCoverflow, Autoplay } from "swiper/modules";

// import 'swiper/swiper-bundle.min.css'
// import 'swiper/swiper.min.css'

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import "./Carousel.css";
import { useProductContext } from "../../Context/ProductContext";
import { Link } from "react-router-dom";

const Carousel = () => {
  const { allProducts } = useProductContext();
  return (
    <div className="carousel">
      <div>
        <div className="carousel-content">
          <span>discover</span>
          <h1>Dhakaia Jamdani</h1>
          <hr />
          <p>
            "Dhakaia Jamdani" offers a curated selection of timeless Jamdani
            weaves, blending traditional craftsmanship with contemporary
            elegance. A haven for those who appreciate the rich heritage and
            artistry of Bangladeshi textiles.
          </p>
          <a href="#" className="slider-btn">
            download app
          </a>
        </div>
      </div>

      <Swiper
        className="myswiper"
        modules={[Pagination, EffectCoverflow, Autoplay]}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 3,
          slideShadows: true,
        }}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 2,
          },
          1560: {
            slidesPerView: 3,
          },
        }}
      >
        {allProducts.slice(0, 5).map((data) => (
          <SwiperSlide
            key={data._id}
            style={{ backgroundImage: `url(${data.images[0].downloadURL})` }}
            className="myswiper-slider"
          >
            <div>
              <h2>{data.title}</h2>
              <p>{data.description}</p>
              <Link to={`/product/${data._id}`}>
                {" "}
                <p className="slider-btn">explore</p>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <img src={bgsharee1} alt="bg" className="bgdonut1" />
      <img src={bgsharee2} alt="bg" className="bgdonut2" />
    </div>
  );
};

export default Carousel;
