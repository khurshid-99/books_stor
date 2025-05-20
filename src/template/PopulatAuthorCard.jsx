
const PopulatAuthorCard = ({img, author, book}) => {
  return (
    <div className="w-[70vw] h-[10vh] lg:w-[26vw] lg:h-[8vw] xl:w-[21vw] xl:h-[8vw] 2xl:w-[14vw] 2xl:h-[4vw] bg-[#ffffff] rounded-xl border-[0.5px] border-[gray]/70 drop-shadow-lg flex items-center justify-between px-5 shrink-0 gap-2 ">
      <img src={img} alt="" />
      <div>
        <h5 className="text-[.9rem] ">{author}</h5>
        <h6 className="text-[.8rem] text-[gray]/50 ">{book}</h6>
      </div>
    </div>
  );
};

export default PopulatAuthorCard;
