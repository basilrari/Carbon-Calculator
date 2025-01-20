import React from "react";
import Image1 from "./../../public/images/Ellipse 196.png";
import Image2 from "./../../public/images/Ellipse 197.png";
import Image3 from "./../../public/images/Ellipse 198.png";
import Image4 from "./../../public/images/Ellipse 199.png";
import Image from "next/image";

const Goals = () => {
  return (
    <div className="relative p-6 overflow-hidden">
      {/* Section Heading */}
      <h2 className="text-center text-4xl font-semibold mb-8">Our Goals</h2>

      {/* Goals Section */}
      <div className="grid grid-cols-2 gap-y-16 gap-x-12 max-w-4xl mx-auto mb-16">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-48 h-48 rounded-full overflow-hidden">
            <Image src={Image1} alt="Impact" className="object-cover" />
          </div>
          <p className="text-lg font-medium">Impact</p>
        </div>
        <div className="flex flex-col items-center space-y-6">
          <div className="w-48 h-48 rounded-full overflow-hidden">
            <Image src={Image2} alt="Transparency" className="object-cover" />
          </div>
          <p className="text-lg font-medium">Transparency</p>
        </div>
        <div className="flex flex-col items-center space-y-6">
          <div className="w-48 h-48 rounded-full overflow-hidden">
            <Image src={Image3} alt="Sustainability" className="object-cover" />
          </div>
          <p className="text-lg font-medium">Sustainability</p>
        </div>
        <div className="flex flex-col items-center space-y-6">
          <div className="w-48 h-48 rounded-full overflow-hidden">
            <Image src={Image4} alt="Accessibility" className="object-cover" />
          </div>
          <p className="text-lg font-medium">Accessibility</p>
        </div>
      </div>

      {/* Gradient Box */}
      <div className="bg-gradient-to-b from-[#FEEDCCB2] to-[#3E8E8666] p-12 rounded-lg max-w-3xl mx-auto">
        <div className="grid grid-cols-2 gap-10 text-center">
          <div>
            <p className="text-lg font-medium text-gray-600">Carbon Credits Volume</p>
            <p className="text-2xl font-semibold">38.6K</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-600">Carbon Credits Sold</p>
            <p className="text-2xl font-semibold">38.6K</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-600">Carbon Credits Bought</p>
            <p className="text-2xl font-semibold">38.6K</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-600">Carbon Credits Retired</p>
            <p className="text-2xl font-semibold">38.6K</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;
