
const WhatPepolSayCard = () => {
  return (
    <div className="w-full lg:w-[39vw] lg:h-[31vw] xl:w-[37vw] xl:h-[17vw] 2xl:w-[32vw] 2xl:h-[11vw] shrink-0 bg-primary rounded-xl drop-shadow-xl p-8 flex gap-5 flex-wrap xl:flex-nowrap ">
      {/* img- */}
      <div className="w-[13rem]  ">
        <img
          src="/HomePage/popularAuthors/authors-image.png"
          alt=""
          className="w-[5.5rem] object-center object-cover  "
        />
      </div>
      {/* review */}
      <div className="flex flex-col">
        <div className="flex gap-[1px]">
          <img
            src="/HomePage/testimonial/star.png"
            alt=""
            className="w-[1rem] h-[1rem]  "
          />
          <img
            src="/HomePage/testimonial/star.png"
            alt=""
            className="w-[1rem] h-[1rem]  "
          />
          <img
            src="/HomePage/testimonial/star.png"
            alt=""
            className="w-[1rem] h-[1rem]  "
          />
          <img
            src="/HomePage/testimonial/star.png"
            alt=""
            className="w-[1rem] h-[1rem]  "
          />
          <img
            src="/HomePage/testimonial/star.png"
            alt=""
            className="w-[1rem] h-[1rem]  "
          />
        </div>
        <div>
          <p className="mt-3 text-[gray]/90 text-[.9rem] xl:leading-5 2xl:leading-7 font-poppins-regular ">
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            deleniti impedit cum repudiandae magnam modi quos neque maxime!"
          </p>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-8 mt-5 text-nowrap ">
          <h2 className="font-poppins-medium text-[1.1rem]  ">Johan Smith.</h2>
          <h3 className="border-b border-black w-fit text-[1rem] font-poppins-regular text-[gray]/90 leading-none ">
            kolkata, West Bangal
          </h3>
        </div>
      </div>
    </div>
  );
};

export default WhatPepolSayCard;
