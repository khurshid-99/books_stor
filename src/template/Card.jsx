const Card = () => {
  return (
    <div className="h-[27vh] w-[55vw] lg:w-[19vw] lg:h-[26vw] xl:w-[15vw] xl:h-[23vw] 2xl:w-[11.5vw] 2xl:h-[19vw] rounded-xl border-[.5px] border-[gray]/30 pt-5 drop-shadow bg-white shrink-0 ">
      <div className="flex justify-center w-full ">
        <img
          src="/HomePage/TrendingBooks/book-image.png"
          alt=""
          className="w-[7vw] h-[10.3vw] object-center object-cover "
        />
      </div>
      <div className="px-5 mt-5">
        <h4 className="font-bangoli-a font-medium text-[1.1rem] ">
          এক নজরে কুরআন
        </h4>
        <h5 className="text-[.9rem] text-[gray]/70 font-bangoli-b ">
          মিজানুর রহমান আজহারি
        </h5>
        <div className="flex items-center justify-between mt-5 font-poppins font-medium ">
          <h3 className="font-poppins-medium text-[1.1rem] ">₹ 1590</h3>
          <button className="bg-[#FFF9F6] font-poppins-medium text-orange border-orange border-[1.5px] px-4 py-1 rounded-lg ">
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
