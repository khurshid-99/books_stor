
const PopulatAuthorCard = () => {
  return (
    <div className="lg:w-[26vw] lg:h-[8vw] xl:w-[21vw] xl:h-[8vw] 2xl:w-[14vw] 2xl:h-[4vw] bg-[#ffffff] rounded-xl border-[0.5px] border-[gray]/70 drop-shadow-lg flex items-center justify-between px-5 shrink-0 gap-2 ">
      <img src="/HomePage/popularAuthors/authors-image.png" alt="" />
      <div>
        <h5 className="text-[.9rem] ">মিজানুর রহমান আজহারি</h5>
        <h6 className="text-[.8rem] text-[gray]/50 ">নতুন বই</h6>
      </div>
    </div>
  );
};

export default PopulatAuthorCard;
