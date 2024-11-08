import React from "react";
import PackageCard from "../../../components/PackageCard";

const Package = () => {
  return (
    <div className="container mx-auto py-16">
      <div className="flex justify-center items-center pb-12">
        <h1 className="uppercase font-bold font-roboto text-4xl md:text-5xl text-center border-b-4 border-green-500 text-blue-700">
          Our Packages
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-center gap-8 mt-12">
        <PackageCard employees={5} price={5} />
        <PackageCard employees={10} price={8} />
        <PackageCard employees={20} price={15} />
      </div>
    </div>
  );
};

export default Package;
