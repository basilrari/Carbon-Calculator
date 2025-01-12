import React from "react";
import Image from "next/image";
import Link from "next/link";

const Discover = () => {
  const cards = [
    {
      title: "Understanding Carbon Credits",
      imgUrl: "/images/c1.png",
      link: "https://www.worldbank.org/en/programs/pricing-carbon",
    },
    {
      title: "Carbon Markets",
      imgUrl: "/images/c2.png",
      link: "https://beeindia.gov.in/en/programmes/carbon-market",
    },
    {
      title: "Offsetting Your Carbon Footprint",
      imgUrl: "/images/c3.png",
      link: "https://www.carbonfootprint.com/",
    },
    {
      title: "The Future of Voluntary Carbon Markets",
      imgUrl: "/images/c4.png",
      link: "https://climatetrade.com/what-is-the-future-of-voluntary-carbon-markets/",
    },
    {
      title: "CO₂ emissions",
      imgUrl: "/images/c5.png",
      link: "https://ourworldindata.org/co2-emissions",
    },
    {
      title: "Innovative Solutions for Carbon Capture",
      imgUrl: "/images/c6.png",
      link: "https://www.globalccsinstitute.com/what-is-ccs/",
    },
  ];

  return (
    <div className="container mx-auto px-6 lg:px-12 py-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold text-left">Learn More</h1>
        {/* Blockchain Info */}
        <div className="flex items-center">
          <Image
            alt="celocomposition"
            loading="lazy"
            width="40"
            height="24"
            decoding="async"
            className="pl-2"
            src="/images/celocomp.png"
            style={{ color: "transparent" }}
          />
          <h1 className="font-semibold text-md pr-2">Celo Alfajores</h1>
        </div>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Feature Card */}
        <div className="lg:col-span-8">
          <div className="relative w-full group" style={{ paddingTop: "75%" }}>
            <Link
              href={cards[0].link}
              className="absolute inset-0 rounded-xl overflow-hidden group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={cards[0].imgUrl}
                alt={cards[0].title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:bg-black/30 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 p-6 flex items-center justify-between w-full">
                <h3 className="text-white text-xl font-semibold transition-transform duration-300 group-hover:-translate-y-2">
                  {cards[0].title}
                </h3>
                <span className="text-white text-4xl transition-transform duration-300 group-hover:-translate-y-2 group-hover:translate-x-2">
                  ↗
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Side Cards */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {cards.slice(1, 3).map((card, index) => (
            <div
              key={index}
              className="relative w-full group"
              style={{ paddingTop: "75%" }}
            >
              <Link
                href={card.link}
                className="absolute inset-0 rounded-xl overflow-hidden"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={card.imgUrl}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:bg-black/30 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 p-6 flex items-center justify-between w-full">
                  <h3 className="text-white text-xl font-semibold transition-transform duration-300 group-hover:-translate-y-2">
                    {card.title}
                  </h3>
                  <span className="text-white text-4xl transition-transform duration-300 group-hover:-translate-y-2 group-hover:translate-x-2">
                    ↗
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {cards.slice(3).map((card, index) => (
          <div
            key={index}
            className="relative w-full group"
            style={{ paddingTop: "75%" }}
          >
            <Link
              href={card.link}
              className="absolute inset-0 rounded-xl overflow-hidden"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={card.imgUrl}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:bg-black/30 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 p-6 flex items-center justify-between w-full">
                <h3 className="text-white text-xl font-semibold transition-transform duration-300 group-hover:-translate-y-2">
                  {card.title}
                </h3>
                <span className="text-white text-4xl transition-transform duration-300 group-hover:-translate-y-2 group-hover:translate-x-2">
                  ↗
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discover;