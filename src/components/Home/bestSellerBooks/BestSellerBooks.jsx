import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Card from "../../../template/Card";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const BestSellerBooks = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [cadDetils, setCadDetils] = useState([
    {
      img: "/HomePage/TrendingBooks/book-image.png",
      titel: "এক নজরে কুরআন",
      author: "মিজানুর রহমান আজহারি",
      price: 1590,
    },
    {
      img: "/HomePage/TrendingBooks/book-image.png",
      titel: "এক নজরে কুরআন",
      author: "মিজানুর রহমান আজহারি",
      price: 1590,
    },
    {
      img: "/HomePage/TrendingBooks/book-image.png",
      titel: "এক নজরে কুরআন",
      author: "মিজানুর রহমান আজহারি",
      price: 1590,
    },
    {
      img: "/HomePage/TrendingBooks/book-image.png",
      titel: "এক নজরে কুরআন",
      author: "মিজানুর রহমান আজহারি",
      price: 1590,
    },
    {
      img: "/HomePage/TrendingBooks/book-image.png",
      titel: "এক নজরে কুরআন",
      author: "মিজানুর রহমান আজহারি",
      price: 1590,
    },
    {
      img: "/HomePage/TrendingBooks/book-image.png",
      titel: "এক নজরে কুরআন",
      author: "মিজানুর রহমান আজহারি",
      price: 1590,
    },
    {
      img: "/HomePage/TrendingBooks/book-image.png",
      titel: "এক নজরে কুরআন",
      author: "মিজানুর রহমান আজহারি",
      price: 1590,
    },
  ]);

  return (
    <section className="w-full h-[55vh] xl:h-[57vh] 2xl:h-[55vh] relative px-[5vw] bg-[#ffffff] ">
      <div className="max-w-screen-2xl h-full mx-auto relative bg-[#ffffff] pt-[2vw] ">
        <div className="mb-10 flex flex-col items-start gap-5 lg:flex-row lg:items-center lg:justify-between ">
          <div>
            <h1 className="text-[1.5rem] lg:text-[1.8rem] font-poppins-semibold ">
              Best Seller book
            </h1>
            <p className="text-[black]/70 font-poppins-medium text-[.8rem]">
              Stay ahead of the curve with the most-loved reads of the moment
            </p>
          </div>
          <button className="text-[.9rem] text-orange font-poppins-medium cursor-pointer ">
            See all
          </button>
        </div>
        {/* ---- */}
        <div className="relative flex items-center gap-4 flex-nowrap overflow-x-hidden  ">
          <div className="hidden lg:inline-block">
            <button
              ref={prevRef}
              className={`absolute left-0 top-1/2 -translate-y-1/2 p-4 rounded-full transition z-[50] drop-shadow-2xl bg-[white] `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="rgba(234,113,46,1)"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
              </svg>
            </button>
            <button
              ref={nextRef}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-4 rounded-full transition z-[50] bg-[white] drop-shadow-2xl `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="rgba(234,113,46,1)"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
              </svg>
            </button>
          </div>
          <Swiper
            modules={[Navigation]}
            spaceBetween={50}
            breakpoints={{
              300: {
                slidesPerView: 1.75,
              },
              1024: {
                slidesPerView: 4.5,
              },
              1280: {
                slidesPerView: 5.6,
              },
              1536: {
                slidesPerView: 6.6,
              },
            }}
            grabCursor={true}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
          >
            {cadDetils.map((item) => (
              <SwiperSlide>
                <Card
                  img={item.img}
                  titel={item.titel}
                  author={item.author}
                  price={item.price}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default BestSellerBooks;
