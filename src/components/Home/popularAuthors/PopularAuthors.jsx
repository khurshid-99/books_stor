import { Swiper, SwiperSlide } from "swiper/react";
import PopulatAuthorCard from "../../../template/PopulatAuthorCard";
import { useRef, useState } from "react";

import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const PopularAuthors = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [cardDetils, setCardDetils] = useState([
    {
      img: "/HomePage/popularAuthors/authors-image.png",
      author: "মিজানুর রহমান আজহারি",
      book: "নতুন বই",
    },
    {
      img: "/HomePage/popularAuthors/authors-image.png",
      author: "মিজানুর রহমান আজহারি",
      book: "নতুন বই",
    },
    {
      img: "/HomePage/popularAuthors/authors-image.png",
      author: "মিজানুর রহমান আজহারি",
      book: "নতুন বই",
    },
    {
      img: "/HomePage/popularAuthors/authors-image.png",
      author: "মিজানুর রহমান আজহারি",
      book: "নতুন বই",
    },
    {
      img: "/HomePage/popularAuthors/authors-image.png",
      author: "মিজানুর রহমান আজহারি",
      book: "নতুন বই",
    },
    {
      img: "/HomePage/popularAuthors/authors-image.png",
      author: "মিজানুর রহমান আজহারি",
      book: "নতুন বই",
    },
  ]);

  return (
    <section className="w-full h-[32vh] lg:h-[35vh] xl:h-[45vh] 2xl:h-[25vh] bg-[#ffffff] relative px-[5vw] ">
      <div className="max-w-screen-2xl h-full mx-auto relative pt-[2vw] ">
        <div className="mb-10 flex flex-col lg:flex-row items-start lg:items-center lg:justify-between gap-5 ">
          <div>
            <h1 className="text-[1.5rem] lg:text-[1.8rem] font-poppins-semibold ">
              Popular Authors
            </h1>
            <p className="text-[black]/70 font-poppins-medium text-[.8rem] ">
              Stay ahead of the curve with the most-loved reads of the moment
            </p>
          </div>
          <button className="text-[.9rem] text-orange font-poppins-medium cursor-pointer ">
            See all
          </button>
        </div>
        {/* --- */}

        <div className="relative flex items-center gap-4 flex-nowrap overflow-x-hidden ">
          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            breakpoints={{
              300: {
                slidesPerView: 1.3,
              },
              1024: {
                slidesPerView: 3.2,
              },
              1280: {
                slidesPerView: 4,
              },
              1536: {
                slidesPerView: 5.5,
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
            <div className="hidden lg:inline-block">
              <button
                ref={prevRef}
                className={`absolute left-0 top-1/2 -translate-y-1/2 p-2 xl:p-4 rounded-full transition z-[50] drop-shadow-2xl bg-[white] `}
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
                className={`absolute right-2 top-1/2 -translate-y-1/2 lg:p-2 xl:p-4 rounded-full transition z-[50] bg-[white] drop-shadow-2xl `}
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

            {cardDetils.map((item) => (
              <SwiperSlide>
                <PopulatAuthorCard
                  img={item.img}
                  author={item.author}
                  book={item.book}
                />
              </SwiperSlide>
            ))}
            {/* <PopulatAuthorCard /> */}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default PopularAuthors;
