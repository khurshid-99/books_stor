import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import LatestInsightsCard from "../../../template/LatestInsightsCard";
import Brands from "./Brands";

const LatestInsights = () => {
  // const [cardDetiles, setCardDetiles] = useState();
  // [
  //   {
  //     img: "img1",
  //     projectName: "Desigen",
  //     date: "30.01.2025",
  //     description: "Die grobten Marketing-Trends 2025: Was Unternehmen mussen",
  //     name: "John Doe",
  //     dot: "dot",
  //     time: "18 min",
  //   },
  //   {
  //     img: "img2",
  //     projectName: "Development",
  //     date: "30.01.2025",
  //     description: "Die grobten Marketing-Trends 2025: Was Unternehmen mussen",
  //     name: "John Doe",
  //     dot: "dot",
  //     time: "18 min",
  //   },
  //   {
  //     img: "img3",
  //     projectName: "Desigen",
  //     date: "30.01.2025",
  //     description: "Die grobten Marketing-Trends 2025: Was Unternehmen mussen",
  //     name: "John Doe",
  //     dot: "dot",
  //     time: "18 min",
  //   },
  //   {
  //     img: "img1",
  //     projectName: "Desigen",
  //     date: "30.01.2025",
  //     description: "Die grobten Marketing-Trends 2025: Was Unternehmen mussen",
  //     name: "John Doe",
  //     dot: "dot",
  //     time: "18 min",
  //   },
  // ];

  return (
    <div className="w-full h-[78vh] lg:h-[85vh] px-[5vw] pt-2 ">
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
        <div className="flex items-center gap-5  ">
          <LatestInsightsCard />
          <LatestInsightsCard />
          <LatestInsightsCard />
          <LatestInsightsCard />
        </div>
        <div className="w-full lg:mt-8 xl:mt-15 ">
          <Brands />
        </div>
      </div>
    </div>
  );
};

export default LatestInsights;
