export const CategoreCard = ({ tital, images, bookName }) => {
  return (
    <div className="w-full h-[55vh] lg:w-[21vw] lg:h-[30vw] xl:w-[21.3vw] xl:h-[27vw]  2xl:w-[19.22vw] 2xl:h-[23vw] rounded-2xl bg-[#ffffff] drop-shadow-2xl overflow-hidden shrink-0 ">
      {/* --- */}
      <div className=" flex items-center gap-3 px-8 py-4 border-b-[0.5px] border-[#b8b8b84d]  ">
        <img src="/HomePage/Category/dot.png" alt="" />
        <h4 className="font-bangoli-a text-[1.2rem] ">{tital}</h4>
      </div>
      {/* CArd */}
      <div className="w-full gap-5 py-5 flex items-center justify-center flex-wrap  ">
        <div className="w-full h-1/2 flex justify-center gap-8 px-8 ">
          <div className="w-1/2 h-full overflow-hidden ">
            <img
              src={images}
              alt=""
              className="w-full object-cover object-center"
            />
            <h5 className="mt-2 font-bangoli-b text-[.8rem] ">{bookName}</h5>
          </div>
          <div className="w-1/2 h-full overflow-hidden">
            <img
              src="/HomePage/Category/category-book.png"
              alt=""
              className="w-full object-cover object-center"
            />
            <h5 className="mt-2 font-bangoli-b text-[.8rem] ">{bookName}</h5>
          </div>
        </div>
        <div className="w-full h-1/2 flex justify-center gap-8 px-8 ">
          <div className="w-1/2 h-full overflow-hidden">
            <img
              src="/HomePage/Category/category-book.png"
              alt=""
              className="w-full object-cover object-center"
            />
            <h5 className="mt-2 font-bangoli-b text-[.8rem] ">{bookName}</h5>
          </div>
          <div className="w-1/2 h-full overflow-hidden">
            <img
              src="/HomePage/Category/category-book.png"
              alt=""
              className="w-full object-cover object-center"
            />
            <h5 className="mt-2 font-bangoli-b text-[.8rem] ">{bookName}</h5>
          </div>
        </div>
      </div>
      <div className="px-8">
        <button className="text-orange font-poppins-medium capitalize cursor-pointer ">
          see more
          <img
            src="/HomePage/Category/arrow.png"
            alt=""
            className="inline-block"
          />
        </button>
      </div>
    </div>
  );
};
