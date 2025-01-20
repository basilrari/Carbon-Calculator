import React from "react";
import Header from "@/Components/landingpage/header";
import Image from "next/image";
import backgroundImage from "./../../public/images/background.jpg";

const Homepage = () => {
  return (
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={backgroundImage}
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>

      {/* Header */}
      <div className="relative z-10">
        <Header />
      </div>

      {/* Centered Overlay Text */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center text-white px-4">
        <p
          className="text-3xl sm:text-4xl md:text-5xl font-bold"
          style={{ color: "#5BB8AE" }}
        >
          Empower. Trade. Sustain.
        </p>
        <p className="text-2xl sm:text-3xl md:text-5xl font-bold mt-2" style={{ whiteSpace: 'nowrap' }}>
          Your Path to a Greener Future.
        </p>
      </div>

      {/* Adjust height for small screens */}
      <div className="absolute inset-0 flex items-center justify-center px-4 md:px-8">
        {/* The content above is already centered */}
      </div>
    </div>
  );
};

export default Homepage;
