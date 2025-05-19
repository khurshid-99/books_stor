
const NewArrivalBookCard = () => {
  return (
    <div className="w-[11.5vw] h-[19vw] rounded-xl border-[.5px] border-[gray]/30 pt-5 drop-shadow bg-white shrink-0 ">
      <div className="flex justify-center w-full ">
        <img
          src="/HomePage/TrendingBooks/book-image.png"
          alt=""
          className="w-[7vw] h-[10.3vw] object-center object-cover "
        />
      </div>
      <div className="px-5 mt-5">
        <h4 className="font-semibold">এক নজরে কুরআন</h4>
        <h5 className="text-[.8rem] text-[gray]/70 ">মিজানুর রহমান আজহারি</h5>
        <div className="flex items-center justify-between mt-5 font-poppins font-medium ">
          <h3 className="font-medium">₹ 1590</h3>
          <button className="bg-[#FFF9F6] text-[#F37121] border-[#F37121] border-[1.5px] px-4 py-1 rounded-lg ">
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewArrivalBookCard;
