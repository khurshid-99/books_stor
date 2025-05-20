const LatestInsightsCard = ({
  img,
  projectName,
  date,
  description,
  name,
  time,
}) => {
  return (
    <div className="w-[98%] h-[45vh] lg:w-[30vw] lg:h-[32vw] xl:w-[23vw] xl:h-[27.5vw] 2xl:w-[22vw] 2xl:h-[21vw] rounded-t-2xl shrink-0 overflow-hidden ">
      <img
        src={img}
        alt=""
        className="w-full h-[24vh] lg:h-[17vw] xl:h-[15vw] 2xl:h-[13vw] object-top object-cover rounded-2xl "
      />
      <div className="w-full mt-2 ">
        <div className="flex items-center gap-4">
          <h5 className="bg-[#7D8387] px-5 py-[3px] rounded-[50px] font-poppins-regular text-[.8rem] text-[white] ">
            {projectName}
          </h5>
          <h5 className="font-poppins-regular text-[.9rem] text-[#adadad] ">
            {date}
          </h5>
        </div>

        <p className="mt-4 font-poppins-medium xl:text-[1rem] 2xl:text-[1.2rem] leading-6 ">
          {description}
        </p>

        <div className="flex items-center gap-5 mt-4">
          <h4 className="text-[#adadad] capitalize font-poppins-light text-[.9rem] ">
            {name}
          </h4>
          <h4 className="text-[#adadad] capitalize font-poppins-light text-[.9rem]">
            {time}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default LatestInsightsCard;
