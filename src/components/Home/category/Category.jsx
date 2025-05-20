import { CategoreCard } from "../../../template/CategoreCard";

import Image1 from "../../../../public/HomePage/Category/category-book.png";

const Category = () => {
  return (
    <section className="select-none w-full h-[235vh] lg:h-[45vh] xl:h-[50vh] 2xl:h-[50vh] relative bg-[#F9F9F9] px-[5vw]   ">
      <div className="max-w-screen-2xl h-full mx-auto relative flex flex-col justify-center lg:flex-row gap-5 ">
        <CategoreCard
          tital={"ইসলামি বই"}
          images={Image1}
          bookName={"ইসলামিক"}
        />
        <CategoreCard
          tital={"ইসলামি বই"}
          images={Image1}
          bookName={"ইসলামিক"}
        />
        <CategoreCard
          tital={"ইসলামি বই"}
          images={Image1}
          bookName={"ইসলামিক"}
        />
        <CategoreCard
          tital={"ইসলামি বই"}
          images={Image1}
          bookName={"ইসলামিক"}
        />
      </div>
    </section>
  );
};

export default Category;
