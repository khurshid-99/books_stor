import LatestInsightsCard from "../../../template/LatestInsightsCard";
import Brands from "./Brands";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const LatestInsights = () => {
  const [cardDetiles, setCardDetiles] = useState([
    {
      img: "/HomePage/Blog/blog-1.png",
      projectName: "Desigen",
      date: "30.01.2025",
      description:
        "Die größten Marketing-Trends 2025: Was Unternehmen wissen mussen",
      name: "John Doe",
      dot: "dot",
      time: "18 min",
    },
    {
      img: "/HomePage/Blog/blog-1.png",
      projectName: "Development",
      date: "30.01.2025",
      description: "Die grobten Marketing-Trends 2025: Was Unternehmen mussen",
      name: "John Doe",
      dot: "dot",
      time: "18 min",
    },
    {
      img: "/HomePage/Blog/blog-1.png",
      projectName: "Desigen",
      date: "30.01.2025",
      description: "Die grobten Marketing-Trends 2025: Was Unternehmen mussen",
      name: "John Doe",
      dot: "dot",
      time: "18 min",
    },
    {
      img: "/HomePage/Blog/blog-1.png",
      projectName: "Desigen",
      date: "30.01.2025",
      description: "Die grobten Marketing-Trends 2025: Was Unternehmen mussen",
      name: "John Doe",
      dot: "dot",
      time: "18 min",
    },
    {
      img: "/HomePage/Blog/blog-1.png",
      projectName: "Desigen",
      date: "30.01.2025",
      description: "Die grobten Marketing-Trends 2025: Was Unternehmen mussen",
      name: "John Doe",
      dot: "dot",
      time: "18 min",
    },
    {
      img: "/HomePage/Blog/blog-1.png",
      projectName: "Desigen",
      date: "30.01.2025",
      description: "Die grobten Marketing-Trends 2025: Was Unternehmen mussen",
      name: "John Doe",
      dot: "dot",
      time: "18 min",
    },
    {
      img: "/HomePage/Blog/blog-1.png",
      projectName: "Desigen",
      date: "30.01.2025",
      description: "Die grobten Marketing-Trends 2025: Was Unternehmen mussen",
      name: "John Doe",
      dot: "dot",
      time: "18 min",
    },
  ]);

  return (
    <div className="w-full h-[78vh] lg:h-[95vh] xl:h-[110vh] 2xl:h-[85vh] px-[5vw] pt-2 relative ">
      <div className="max-w-screen-2xl h-full mx-auto relative overflow-hidden ">
        <div className="mb-10 flex flex-col lg:flex-row items-start lg:items-center lg:justify-between gap-5 ">
          <div>
            <h1 className="text-[1.5rem] lg:text-[1.8rem] font-poppins-semibold ">
              Latest Insights
            </h1>
            <p className="text-[black]/70 font-poppins-medium text-[.8rem] ">
              Stay ahead of the curve with the most-loved reads of the moment
            </p>
          </div>
          <button className="text-[.9rem] text-orange font-poppins-medium cursor-pointer ">
            See all
          </button>
        </div>

        <div className="relative flex items-center justify-center gap-4 flex-nowrap overflow-x-hidden  ">
          <Swiper
            modules={Navigator}
            spaceBetween={10}
            breakpoints={{
              300: {
                slidesPerView: 1.1,
              },
              1024: {
                slidesPerView: 2.85,
              },
              1280: {
                slidesPerView: 3.7,
              },
              1536: {
                slidesPerView: 3.5,
              },
            }}
            grabCursor={true}
            className="relative flex items-center justify-center gap-4 flex-nowrap overflow-x-hidden  "
          >
            {cardDetiles.map((item) => (
              <SwiperSlide>
                <LatestInsightsCard
                  img={item.img}
                  projectName={item.projectName}
                  date={item.date}
                  description={item.description}
                  name={item.name}
                  time={item.time}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="w-full lg:mt-8 2xl:mt-15 ">
          <Brands />
        </div>
      </div>
    </div>
  );
};

export default LatestInsights;
