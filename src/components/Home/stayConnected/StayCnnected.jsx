const StayCnnected = () => {
  return (
    <div className="w-full h-[70vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[50vh] relative bg-[#EDEDED] px-[5vw] overflow-hidden ">
      <div className="max-w-screen-2xl h-full mx-auto relative flex flex-col lg:flex-row lg:items-center lg:justify-between ">
        {/* --- */}
        <div className="w-full h-1/2 lg:w-1/2 lg:h-full pt-5 flex flex-col justify-center ">
          <h2 className="flex items-center uppercase font-poppins-light text-[1rem] mb-6 gap-x-4 ">
            Stay Connect
            <span className="w-[2rem] h-[1.6px] bg-[black] inline-block "></span>
          </h2>
          <h1 className="leading-none mb-3 font-poppins-light text-[2rem] lg:text-[2.7rem] ">
            Sign up to
          </h1>
          <h1 className="leading-none mb-7 font-poppins-medium text-[2.5rem] lg:text-[3.2rem] ">
            Our Newsletter
          </h1>
          <p className="font-poppins-regular text-[black]/80 text-[.77rem] lg:text-[1rem] ">
            We're a national and international moving company
            <br />
            located in the US .. Our target audience are people
            <br />
            moving state to state and overseas.
          </p>
        </div>
        {/* -- */}
        <div className="w-full h-1/2 lg:w-1/2 lg:h-full flex flex-col justify-center relative z-[50] ">
          <div className="w-full relative z-[55] lg:pl-[10vw] xl:pl-[7vw] 2xl:pl-0 ">
            <h1 className="font-poppins-regular text-[2rem] leading-none ">
              Enter Your
              <br />
              email-address
            </h1>
            <h4 className="uppercase font-poppins-medium my-5 lg:my-9 text-[.9rem] leading-none ">
              stay i touch
            </h4>
            <form action="" className="flex gap-3 ">
              <input
                type="email"
                required
                placeholder="Enter you email address"
                className="placeholder:font-poppins-regular w-full lg:w-[20vw] border-b-[1.7px] outline-none py-2 "
              />
              <button className="bg-orange rounded-full p-4 cursor-pointer ">
                <img
                  src="/HomePage/arrow-right-long-line.png"
                  alt=""
                  className="w-[2rem] "
                />
              </button>
            </form>
          </div>
          <div className="w-[80vw] h-[80vw] lg:w-[35vw] lg:h-[35vw] xl:w-[28vw] xl:h-[28vw] 2xl:w-[23vw] 2xl:h-[23vw] bg-[#F8F8F8] z-[40] rounded-full absolute -bottom-20 -right-0 lg:-bottom-27 lg:-right-5 xl:right-15 2xl:right-57 " />
        </div>
      </div>
    </div>
  );
};

export default StayCnnected;
