import React from "react";
import Image1 from "./../../public/images/impact.png";
import Image2 from "./../../public/images/transparency.png";
import Image3 from "./../../public/images/sustainability.png";
import Image4 from "./../../public/images/accessibility.png";
import Image from "next/image";

const Goals = () => {
  return (
    <div className="relative p-6 overflow-hidden">
      <h2 className="text-center text-4xl font-semibold mb-14 pt-16">Our Goals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-x-12 max-w-4xl mx-auto mb-16">
        <div className="grid grid-rows-2 gap-y-16 bg-[#3E8E8626] p-8 rounded-lg">
          <div className="flex flex-col items-center space-y-6">
            <div className="w-48 h-48 rounded-full overflow-hidden">
              <Image src={Image1} alt="Impact" className="object-cover" />
            </div>
            <p className="text-xl font-bold">Impact</p>
          </div>
          <div className="flex flex-col items-center space-y-6">
            <div className="w-48 h-48 rounded-full overflow-hidden">
              <Image src={Image3} alt="Sustainability" className="object-cover" />
            </div>
            <p className="text-xl font-bold">Sustainability</p>
          </div>
        </div>
        <div className="grid grid-rows-2 gap-y-16 p-8 rounded-lg">
          <div className="flex flex-col items-center space-y-6">
            <div className="w-48 h-48 rounded-full overflow-hidden">
              <Image src={Image2} alt="Transparency" className="object-cover" />
            </div>
            <p className="text-xl font-bold">Transparency</p>
          </div>
          <div className="flex flex-col items-center space-y-6">
            <div className="w-48 h-48 rounded-full overflow-hidden">
              <Image src={Image4} alt="Accessibility" className="object-cover" />
            </div>
            <p className="text-xl font-bold">Accessibility</p>
          </div>
        </div>
      </div>
      <div className="relative bg-gradient-to-b from-[#FEEDCCB2] to-[#3E8E8666] p-12 rounded-lg max-w-5xl mx-auto">
        <div className="absolute bg-[#FEEDCC] w-60 h-10 rounded-lg top-[-1.5rem] right-[1.5rem]"></div>
        <div className="absolute bg-[#FEEDCC] w-60 h-10 rounded-lg bottom-[-1.5rem] left-[1.5rem]"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-14 text-center">
          <div>
            <p className="text-lg font-medium text-black">Carbon Credits Volume</p>
            <p className="text-2xl font-semibold" style={{ color: "#2F4F4F" }}>
              38.6K
            </p>
          </div>
          <div>
            <p className="text-lg font-medium text-black">Carbon Credits Sold</p>
            <p className="text-2xl font-semibold" style={{ color: "#2F4F4F" }}>
              38.6K
            </p>
          </div>
          <div>
            <p className="text-2xl font-semibold" style={{ color: "#2F4F4F" }}>
              38.6K
            </p>
            <p className="text-lg font-medium text-black">Carbon Credits Bought</p>
          </div>
          <div>
            <p className="text-2xl font-semibold" style={{ color: "#2F4F4F" }}>
              38.6K
            </p>
            <p className="text-lg font-medium text-black">Carbon Credits Retired</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;
