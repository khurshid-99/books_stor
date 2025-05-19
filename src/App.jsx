import {
  Category,
  Hero,
  NewArrivalBooks,
  PopularAuthors,
  BestSellerBooks,
  RecentlySoldProducts,
  TrendingBooks,
  WhatPepoleAreSaying,
  UpComminBooks,
  LatestInsights,
  StayCnnected,
} from "./components/Home";

const App = () => {
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <Hero />
      <Category />
      <TrendingBooks />
      <RecentlySoldProducts />
      <NewArrivalBooks />
      <PopularAuthors />
      <BestSellerBooks />
      <WhatPepoleAreSaying />
      <UpComminBooks />
      <LatestInsights />
      <StayCnnected />
    </div>
  );
};

export default App;
