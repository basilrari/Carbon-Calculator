import React from "react";
import Header from "@/Components/landingpage/header";
import Image from "next/image";
import backgroundImage from "./../../public/images/background.jpg";

const Homepage = () => {
  return (
    <div className="relative h-screen w-full">
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
      <div className="relative z-10">
        <Header />
      </div>
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center text-white px-4">
        <p
          className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold"
          style={{ color: "#5BB8AE" }}
        >
          Empower. Trade. Sustain.
        </p>
        <p
          className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold mt-2"
          style={{ whiteSpace: "nowrap" }}
        >
          Your Path to a Greener Future.
        </p>
      </div>
    </div>
  );
};

export default Homepage;
