import React from "react";

const Footer = () => {
  return (
    <footer className="w-full h-[192vh] lg:h-[70vh] xl:h-[70vh] 2xl:h-[60vh] relative bg-black px-[5vw] ">
      <div className="max-w-screen-2xl h-full mx-auto relative pt-[4vw] ">
        {/* -- */}
        <div className="w-full lg:h-[50vh] xl:h-[45vh] 2xl:h-[40vh] flex flex-col lg:flex-row lg:items-start lg:justify-between  ">
          {/* left */}
          <div className="w-full h-full lg:w-1/3 lg:h-full ">
            <img
              src="/HomePage/header/logo-dark.png"
              alt=""
              className="w-[10rem] xl:w-[12rem] object-cover object-center "
            />
            <p className="text-white/70 font-poppins-light lg:text-[.8rem] xl:text-[.9rem] mt-5 lg:mt-10 ">
              Elevating communication, marketing,
              <br />
              Ux design into powerful digital experlences
              <br />
              targeted campaigns, brand identities that
              <br />
              drive results and transform businesses
            </p>
          </div>
          {/* -medil- */}
          <div className="w-full h-full lg:w-1/3 mt-10 lg:mt-0 flex justify-between lg:justify-around ">
            <div className="w-1/2 lg:w-[6vw] h-full shrink-0 text-nowrap ">
              <div>
                <h1 className="leading-none font-poppins-medium uppercase text-orange">
                  Quick link
                </h1>
                <span className="inline-block w-[2rem] h-[2px] bg-orange "></span>
              </div>
              <ul className="text-white/60 flex flex-col gap-3 capitalize mt-5 ">
                <li>Home</li>
                <li>About Us</li>
                <li>Careers</li>
                <li>Culture</li>
                <li>Blog</li>
                <li>Contact us</li>
              </ul>
            </div>
            {/* -- */}
            <div className="w-1/2 lg:w-[6vw] h-full lg:mt-0 shrink-0 text-nowrap">
              <div>
                <h1 className="leading-none font-poppins-medium uppercase text-orange">
                  CATEGORY
                </h1>
                <span className="inline-block w-[2rem] h-[2px] bg-orange "></span>
              </div>
              <ul className="text-white/60 flex flex-col gap-3 capitalize mt-5 ">
                <li>Home</li>
                <li>About Us</li>
                <li>Careers</li>
                <li>Culture</li>
                <li>Blog</li>
                <li>Contact us</li>
              </ul>
            </div>
          </div>
          {/* -right- */}
          <div className="w-full h-full lg:w-1/3 mt-10 lg:mt-0 flex justify-between lg:justify-around">
            <div className="w-1/2 lg:w-[6vw] h-full shrink-0 text-nowrap">
              <div>
                <h1 className="leading-none font-poppins-medium uppercase text-orange">
                  SERVICE
                </h1>
                <span className="inline-block w-[2rem] h-[2px] bg-orange "></span>
              </div>
              <ul className="text-white/60 flex flex-col gap-3 capitalize mt-5 ">
                <li>Lorem Ipsun</li>
                <li>Lorem Ipsun</li>
                <li>Lorem Ipsun</li>
                <li>Lorem Ipsun</li>
                <li>Lorem Ipsun</li>
                <li>Lorem Ipsun</li>
              </ul>
            </div>
            {/* -- */}
            <div className="w-1/2 lg:w-[6vw] h-full shrink-0 text-nowrap">
              <div>
                <h1 className="leading-none font-poppins-medium uppercase text-orange">
                  FOLLOW US
                </h1>
                <span className="inline-block w-[2rem] h-[2px] bg-orange "></span>
              </div>
              <ul className="text-white/60 flex flex-col gap-3 capitalize mt-5 ">
                <li className="text-nowrap">
                  <img
                    src="/HomePage/facebook-icon .png"
                    alt=""
                    className="inline-block mr-2"
                  />{" "}
                  Facebook
                </li>
                <li className="text-nowrap">
                  <img
                    src="/HomePage/Instagram-icon.png"
                    alt=""
                    className="inline-block mr-2"
                  />
                  Instagram
                </li>
                <li className="text-nowrap">
                  <img
                    src="/HomePage/linkedin-icon.png"
                    alt=""
                    className="inline-block mr-2"
                  />
                  Linkedlr
                </li>
                <li className="text-nowrap">
                  <img
                    src="/HomePage/Twitter-icon .png"
                    alt=""
                    className="inline-block mr-2"
                  />
                  Twitter
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* -Bottom- */}
        <div className="w-full py-5 text-white/70 font-poppins-light text-[.9rem] flex flex-col lg:flex-row lg:items-center lg:justify-between text-nowrap gap-5 lg:gap-0 mt-10 lg:mt-0 ">
          <div className="lg:w-3/5 xl::w-1/2 2xl:w-2/5 h-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 lg:gap-0 ">
            <h5 className="capitalize ">&copy; 2025 All Rights Reserved</h5>
            <div className=" flex ">
              <select
                name=""
                id=""
                className="appearance-none bg-[url(/HomePage/arrow-down-s-line.svg)] bg-no-repeat bg-[center_right_12px] border border-[#f1f1f156] rounded py-[6px] px-4 pr-15 outline-none mr-2 "
              >
                <option value="" className="text-black bg-gray-200">
                  Contact Us
                </option>
              </select>
              <select
                name=""
                id=""
                className="appearance-none bg-[url(/HomePage/arrow-down-s-line.svg)] bg-no-repeat bg-[center_right_8px] border border-[#f1f1f156] rounded py-[6px] px-4 pr-12 outline-none  "
              >
                <option value="">English</option>
              </select>
            </div>
          </div>
          {/* -- */}
          <div className="flex items-center gap-5 font-poppins-regular text-[1rem] text-orange capitalize ">
            <h5>Trems</h5>
            <h5>privacy</h5>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
