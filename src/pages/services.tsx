import React from "react";
import Image from "next/image";
import toucanLogo from "../../public/images/toucan.png";
import goldStandardLogo from "../../public/images/goldstandard.png";

const Services = () => {
  return (
    <div className="text-center p-6">
      <h2 className="text-2xl font-bold mt-16 mb-8">What We Offer</h2>
      <div className="px-4">
        <div className="px-4">
          <div className="grid grid-cols-7 gap-6 items-center mb-12">
            <div className="bg-gradient-to-b from-[#B0C4B1] to-[#2F4F4F] text-white p-6 h-[200px] flex items-center justify-center rounded-md shadow-lg col-span-7 md:col-span-2 mb-4 md:mb-0">
              Buy Carbon Credits
            </div>
            <div className="bg-gradient-to-b from-[#B0C4B1] to-[#2F4F4F] text-white p-6 h-[200px] flex items-center justify-center rounded-md shadow-lg col-span-7 md:col-span-3 mb-4 md:mb-0">
              Retire Carbon Credits
            </div>
            <div className="bg-gradient-to-b from-[#B0C4B1] to-[#2F4F4F] text-white p-6 h-[200px] flex items-center justify-center rounded-md shadow-lg col-span-7 md:col-span-2 mb-4 md:mb-0">
              Sell Carbon Credits
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-16 mb-8">In Collaboration With</h2>
      <div className="flex justify-center gap-6">
        <div className="relative w-[150px] h-[100px]">
          <Image
            src={toucanLogo}
            alt="Toucan Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="relative w-[200px] h-[90px]">
          <Image
            src={goldStandardLogo}
            alt="Gold Standard Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Services;
