const Card = ({ img, titel, author, price }) => {
  return (
    <div className="select-none h-[27vh] w-[55vw] lg:w-[19vw] lg:h-[36vh] xl:w-[15vw] xl:h-[50vh] 2xl:w-[11.5vw] 2xl:h-[19vw] rounded-xl border-[.5px] border-[gray]/30 pt-5 drop-shadow bg-white shrink-0 relative ">
      <div className="flex justify-center w-full ">
        <img
          src={img}
          alt=""
          className="w-[7vw] h-[10.3vw] object-center object-cover "
        />
      </div>
      <div className="px-5 mt-5">
        <h4 className="font-bangoli-a font-medium text-[1.1rem] ">{titel}</h4>
        <h5 className="text-[.9rem] text-[gray]/70 font-bangoli-b ">
          {author}
        </h5>
        <div className="flex items-center justify-between mt-5 font-poppins font-medium ">
          <h3 className="font-poppins-medium text-[1.1rem] ">₹ {price}</h3>
          <button className="bg-[#FFF9F6] font-poppins-medium text-orange border-orange border-[1.5px] px-4 py-1 rounded-lg cursor-pointer">
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
