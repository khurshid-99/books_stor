const Hero = () => {
  return (
    <header className="relative w-full h-[40vh] lg:h-[40vh] xl:h-[45vh] 2xl:h-[50vh] bg-[#F9F9F9] py-[2vw] px-[5vw] ">
      <div className="relative max-w-screen-2xl h-full mx-auto bg-[url(/HomePage/banner/banner.jpg)] bg-cover bg-center bg-no-repeat rounded-2xl drop-shadow-xl pl-[5vw] flex items-center ">
        <div>
          <h1 className="text-[2rem] lg:text-[2.5vw] leading-none mb-2 font-poppins-regular ">
            Y<small>our</small> <small>on</small>l<small>ine</small>
          </h1>
          <h2 className="text-[2rem] lg:text-[2.8vw] font-poppins-bold leading-none mb-7 ">
            Book <span className="text-orange-light ">Haven</span>
          </h2>
          <p className="mb-8 font-poppins-medium text-[.9rem] ">
            Discover stories that stay with you. <br />
            <span className="text-orange ">Shop Books</span> you'll love at
            Boikini.com.
          </p>
          <button className="px-6 py-3 rounded-[10px] font-poppins-medium text-[.7rem] bg-orange text-white cursor-pointer ">
            Shop Now
          </button>
        </div>
      </div>
    </header>
  );
};

export default Hero;
