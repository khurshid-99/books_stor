import { useRef } from "react";
import WhatPepolSayCard from "../../../template/WhatPepolSayCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const WhatPepoleAreSaying = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);

  return (
    <section className="select-none w-full h-[85vh] lg:h-[92vh] xl:h-[90vh] 2xl:h-[70vh] relative px-[5vw] py-[3vw] ">
      <div className="max-w-screen-2xl h-full mx-auto relative bg-secondary py-[2.5vw] ">
        <div className="w-full">
          <h1 className="text-center font-poppins-medium text-[1.3rem] lg:text-[1.7rem] leading-none mb-6 ">
            Whart Pepole Are Saying
          </h1>
          <p className="text-center font-poppins-medium text-[black]/65 text-[.8rem] lg:text-[.95rem] ">
            Lorem lpsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been <br />
            the industry's standard dummy text ever since the 1500s
          </p>
        </div>
        {/* card */}
        <div className="relative flex flex-row justify-start lg:justify-center gap-10 mt-10 lg:w-[100%] 2xl:w-[88%] mx-auto ">
          <div className="hidden lg:inline-block">
            <button
              ref={prevRef}
              className={`absolute -left-7 top-1/2 -translate-y-1/2 p-4 rounded-full transition z-[50] drop-shadow-2xl bg-[white] cursor-pointer `}
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
              className={`absolute -right-7 top-1/2 -translate-y-1/2 p-4 rounded-full transition z-[50] bg-[white] drop-shadow-2xl cursor-pointer `}
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
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            pagination={{
              el: paginationRef.current,
              clickable: true,
            }}
            breakpoints={{
              300: { slidesPerView: 1 },
              1024: { slidesPerView: 2 },
              1280: { slidesPerView: 2.1 },
              1536: { slidesPerView: 2 },
            }}
            grabCursor={true}
            onInit={(swiper) => {
              setTimeout(() => {
                if (
                  prevRef.current &&
                  nextRef.current &&
                  paginationRef.current
                ) {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                  swiper.params.pagination.el = paginationRef.current;

                  swiper.navigation.init();
                  swiper.navigation.update();
                  swiper.pagination.init();
                  swiper.pagination.render();
                  swiper.pagination.update();
                }
              }, 0);
            }}
          >
            <SwiperSlide>
              <WhatPepolSayCard />
            </SwiperSlide>
            <SwiperSlide>
              <WhatPepolSayCard />
            </SwiperSlide>
            <SwiperSlide>
              <WhatPepolSayCard />
            </SwiperSlide>
          </Swiper>
        </div>
        <div
          ref={paginationRef}
          className="flex justify-center mt-4 space-x-2 w-full "
        ></div>
      </div>
    </section>
  );
};

export default WhatPepoleAreSaying;
