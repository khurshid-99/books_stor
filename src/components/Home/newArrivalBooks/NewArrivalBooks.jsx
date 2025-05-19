import Card from "../../../template/Card";
import NewArrivalBookCard from "../../../template/NewArrivalBookCard";

const NewArrivalBooks = () => {
  return (
    <section className="w-full h-[55vh] xl:h-[57vh] 2xl:h-[55vh] relative px-[5vw] bg-[#ffffff] ">
      <div className="max-w-screen-2xl h-full mx-auto relative bg-[#ffffff] pt-[2vw] ">
        <div className="mb-10 flex flex-col items-start gap-5 lg:flex-row lg:items-center lg:justify-between ">
          <div>
            <h1 className="text-[1.5rem] lg:text-[1.8rem] font-poppins-semibold ">
              New Arrival Books
            </h1>
            <p className="text-[black]/70 font-poppins-medium text-[.8rem] ">
              Stay ahead of the curve with the most-loved reads of the moment
            </p>
          </div>
          <button className="text-[.9rem] text-orange font-poppins-medium cursor-pointer ">
            See all
          </button>
        </div>
        {/* ---- */}
        <div className="flex items-center gap-4 flex-nowrap overflow-x-hidden ">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </section>
  );
};

export default NewArrivalBooks;
