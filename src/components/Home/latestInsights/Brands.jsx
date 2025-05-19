import "./BrandStyle.css";

const Brands = () => {
  return (
    <div className="w-full h-[20vw] lg:h-[18vh] flex justify-center flex-nowrap shrink-0 relative py-3  ">
      <div className="w-[100%] top-0 right-0 flex mt-[2px] shrink-0 relative brands  overflow-x-hidden ">
        <img
          src="/HomePage/Blog/company-image_2 .png"
          alt=""
          className="brand brand-1 w-[22vw] sm:w-[18vw]"
        />
        <img
          src="/HomePage/Blog/company-image_3 .png"
          alt=""
          className="brand brand-2 w-[22vw] sm:w-[18vw]"
        />
        <img
          src="/HomePage/Blog/company-image_4 .png"
          alt=""
          className="brand brand-3 w-[22vw] sm:w-[18vw]"
        />
        <img
          src="/HomePage/Blog/company-image_2 .png"
          alt=""
          className="brand brand-4 w-[22vw] sm:w-[18vw]"
        />
        <img
          src="/HomePage/Blog/company-image_3 .png"
          alt=""
          className="brand brand-5 w-[22vw] sm:w-[18vw]"
        />
      </div>
    </div>
  );
};

export default Brands;
