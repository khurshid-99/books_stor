import PopulatAuthorCard from "../../../template/PopulatAuthorCard";

const PopularAuthors = () => {
  return (
    <section className="w-full h-[32vh] lg:h-[30vh] xl:h-[32vh] 2xl:h-[25vh] bg-[#ffffff] relative px-[5vw] ">
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
        <div className="mt-10 flex items-center justify-start flex-nowrap gap-5 overflow-x-hidden ">
          <PopulatAuthorCard />
          <PopulatAuthorCard />
          <PopulatAuthorCard />
          <PopulatAuthorCard />
          <PopulatAuthorCard />
          <PopulatAuthorCard />
        </div>
      </div>
    </section>
  );
};

export default PopularAuthors;
