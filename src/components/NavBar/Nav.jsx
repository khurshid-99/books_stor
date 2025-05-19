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
            className="w-[7rem] lg:w-[10rem] object-cover object-center lg:border-r pr-5 "
          />
          {/* Time */}
          <div className="hidden lg:inline-block">
            <h4 className="font-poppins-semibold ">Delivery in 10 minutes</h4>
          </div>
        </div>
        {/*  */}
        <div className="hidden w-[40vw] bg-[#F8F8F8] py-3 lg:flex items-center rounded-xl px-5 gap-x-3 ">
          <img src="/HomePage/search-line.svg" alt="" />
          <input
            type="text"
            placeholder="Search your books"
            className="w-full placeholder:text-black placeholder:font-poppins-regular placeholder:text-[.8rem] "
          />
        </div>
        {/*  */}
        <div className="flex items-center gap-4 lg:gap-10">
          <button className="capitalize text-[.8rem] font-poppins-medium cursor-pointer">
            Login
          </button>
          <button className="bg-orange px-3 py-1 lg:px-5 lg:py-2 rounded-[8px] text-white capitalize text-[.7rem] lg:text-[.8rem] font-poppins-medium cursor-pointer text-nowrap ">
            My Cart
          </button>
        </div>
      </nav>
    </nav>
  );
};

export default Nav;
