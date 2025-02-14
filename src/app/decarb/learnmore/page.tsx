import React from "react";
import Image from "next/image";

const Discover = () => {
  const cards = [
    {
      title: "Building a Sustainable Future",
      imgUrl: "/images/c1.png",
      link: "https://www.worldbank.org/en/programs/pricing-carbon",
    },
    {
      title: "Track and offset emissions",
      imgUrl: "/images/c2.png",
      link: "https://beeindia.gov.in/en/programmes/carbon-market",
    },
    {
      title: "Every small step counts",
      imgUrl: "/images/c3.png",
      link: "https://www.carbonfootprint.com/",
    },
    {
      title: "Cleaner, greener tomorrow",
      imgUrl: "/images/c4.png",
      link: "https://climatetrade.com/what-is-the-future-of-voluntary-carbon-markets/",
    },
    {
      title: "The wind of change",
      imgUrl: "/images/c5.png",
      link: "https://ourworldindata.org/co2-emissions",
    },
    {
      title: "Farm for the future",
      imgUrl: "/images/c6.png",
      link: "https://www.globalccsinstitute.com/what-is-ccs/",
    },
  ];

  return (
    <div className="h-screen overflow-y-auto container mx-auto px-6 lg:px-12 py-6">
      {/* Header Section */}
      <div className="flex items-center justify-between ">
        <h1 className="text-2xl font-semibold text-left">
          Learn More</h1>
        <div className="overflow-hidden rounded-full w-12 h-12">
                <Image src="/images/greenbg.png" alt="image" height={48} width={48} className='object-cover w-full h-full'/>
            </div> 
      </div>

      {/* Card Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 mt-8 gap-6">
        {/* Large Feature Card */}
        <div className="lg:col-span-7 row-span-1">
          <div className="relative w-full pt-[60%]">
            <a
              href={cards[0].link}
              className="absolute inset-0 rounded-xl overflow-hidden group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={cards[0].imgUrl}
                alt={cards[0].title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
            </a>
          </div>
        </div>

        {/* Two Side Cards */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {cards.slice(1, 3).map((card, index) => (
            <div key={index} className="relative w-full pt-[40%]">
              <a
                href={card.link}
                className="absolute inset-0 rounded-xl overflow-hidden group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={card.imgUrl}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
              </a>
            </div>
          ))}
        </div>

        {/* Bottom Cards */}
        <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.slice(3).map((card, index) => (
            <div key={index} className="relative w-full pt-[50%]">
              <a
                href={card.link}
                className="absolute inset-0 rounded-xl overflow-hidden group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={card.imgUrl}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover;
