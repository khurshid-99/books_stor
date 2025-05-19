import React from "react";
import WhatPepolSayCard from "../../../template/WhatPepolSayCard";

const WhatPepoleAreSaying = () => {
  return (
    <section className="w-full h-[82vh] lg:h-[82vh] xl:h-[73vh] 2xl:h-[70vh] relative px-[5vw] py-[3vw] ">
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
        <div className="flex flex-row justify-start lg:justify-center gap-10 mt-10">
          <WhatPepolSayCard />
          <WhatPepolSayCard />
        </div>
      </div>
    </section>
  );
};

export default WhatPepoleAreSaying;
