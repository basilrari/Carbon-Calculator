import React from "react";
import Image from "next/image";
import logo from "../../public/images/decarblogo.png";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative">
      <div className="relative w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 z-10">
        <div className="bg-gradient-to-b from-[#FEEDCC] to-[#3E8E86] rounded-lg shadow-lg p-6 flex flex-col justify-center items-center">
          <h2 className="text-[#2F4F4F] text-4xl font-bold mb-4 text-center">
            About Us
          </h2>
          <div className="text-white w-full rounded-lg p-8">
            <p className="text-sm md:text-base leading-relaxed">
              At Decarb, we are committed to simplifying the complex world of
              carbon credits, making them accessible through innovative
              blockchain technology and decentralized finance (DeFi). Our
              platform offers a seamless marketplace for individuals and
              businesses to buy, sell, and retire carbon credits, ensuring
              secure and transparent transactions. Beyond trading, we prioritize
              education by providing a comprehensive resource hub that
              demystifies carbon credit processes and shares actionable insights
              on sustainability. By empowering users with the right tools and
              knowledge, Decarb drives positive environmental actions and
              supports a collective movement towards a cleaner, greener future.
              Join us and embrace sustainability with innovation.
            </p>
          </div>
        </div>
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 h-1/2 w-full bg-[#2F4F4F] rounded-2xl flex flex-col justify-end pt-16 pb-16">
        <div className="w-full max-w-4xl mx-auto px-8 flex flex-col items-start justify-between mt-8 pt-8">
          <div className="flex items-center justify-between w-full mb-4 border-b border-white pb-4">
            <div className="flex items-center gap-3">
              <Image src={logo} alt="Decarb Logo" width={50} height={50} />
              <span className="text-lg font-semibold text-white">Decarb</span>
            </div>
            <div className="flex gap-6 text-sm md:text-base">
              <span className="text-white">Legal</span>
              <span className="text-white">Company</span>
              <span className="text-white">Community</span>
            </div>
          </div>
          <div className="text-xs md:text-sm text-white text-left px-4">
            Decarb 2024. All rights reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
