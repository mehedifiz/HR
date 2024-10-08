import React from "react";
import PackageCard from "../../../components/PackageCard";

const Package = () => {
  return (
    <div className="container mx-auto py-12">
      <div className="flex justify-center items-center pb-12">
        <h1 className="uppercase font-bold font-roboto lg:text-5xl md:text-3xl text-2xl pb-3 border-b-4 border-blue-600">
          Our Packages
        </h1>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-8 md:gap-5 gap-3 mt-8">
        <PackageCard employees={5} price={5} />
        <PackageCard employees={10} price={8} />
        <PackageCard employees={20} price={15} />
      </div>
    </div>
  );
};

export default Package;
