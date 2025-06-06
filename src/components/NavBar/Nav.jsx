const Nav = () => {
  return (
    <nav className="w-full relative bg-[#FFFFFF] drop-shadow-lg font-poppins-regular ">
      <nav className="max-w-[103rem] mx-auto relative z-[999] flex items-center justify-between py-3 px-5 ">
        {/*  */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <img
            src="/HomePage/header/logo.png"
            alt=""
            className="w-[7rem] lg:w-[7rem] xl:w-[10rem] object-cover object-center lg:border-r pr-5 "
          />
          {/* Time */}
          <div className="hidden lg:inline-block">
            <h4 className="font-poppins-semibold lg:text-[.8rem] 2xl:text-[1.1rem] leading-none ">
              Delivery in 10 minutes
            </h4>
            <select
              name=""
              id=""
              className={`outline-none appearance-none bg-[url(/HomePage/arrow-drop-down-line.png)] bg-no-repeat bg-[center_right_0px] pr-7 lg:text-[.6rem] 2xl:text-[.8rem] cursor-pointer `}
            >
              <option value=""> Barasat, Kolkata, West Bengol</option>
              <option value=""> Barasat, Kolkata, West Bengol</option>
            </select>
          </div>
        </div>
        {/*  */}
        <div className="hidden w-[40vw] bg-[#F8F8F8] lg:py-2 2xl:py-3 lg:flex items-center rounded-xl lg:px-3 2xl:px-5 gap-x-3 ">
          <label htmlFor="Search">
            <img src="/HomePage/search-line.svg" alt="" />
          </label>
          <input
            id="Search"
            type="text"
            placeholder="Search your books"
            className="w-full placeholder:text-black placeholder:font-poppins-regular placeholder:text-[.8rem] outline-none font-poppins-medium "
          />
        </div>
        {/*  */}
        <div className="flex items-center gap-4 lg:gap-10">
          <button className="capitalize text-[.8rem] font-poppins-medium cursor-pointer">
            Login
          </button>
          <button className="bg-orange px-3 py-1 lg:px-3 lg:py-2 xl:px-5 xl:py-2 rounded-[8px] text-white capitalize text-[.7rem] xl:text-[.8rem] font-poppins-medium cursor-pointer text-nowrap ">
            My Cart
          </button>
        </div>
      </nav>
    </nav>
  );
};

export default Nav;
