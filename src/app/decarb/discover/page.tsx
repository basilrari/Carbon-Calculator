
import React from "react";
import Image from "next/image";
import CircularText from "@/Components/Dashboard/LearnMore/CircularText";
import RotatingText from "@/Components/Dashboard/LearnMore/RotatingText";


const Discover = () => {

  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  
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
    <div className="h-screen overflow-y-auto container mx-auto p-6">

      {/* Header Section */}
      <div className="flex items-center justify-between ">
        <h1 className="text-2xl font-semibold text-left">
          Learn More
          </h1>
        <div className="overflow-hidden rounded-full w-12 h-12">
                <Image src="/images/greenbg.png" alt="image" height={48} width={48} className='object-cover w-full h-full'/>
            </div> 
      </div>
    
         

        <div>
           
        <RotatingText
  texts={['React', 'Bits', 'Is', 'Cool!']}
  mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
  staggerFrom={"last"}
  initial={{ y: "100%" }}
  animate={{ y: 0 }}
  exit={{ y: "-120%" }}
  staggerDuration={0.025}
  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
  transition={{ type: "spring", damping: 30, stiffness: 400 }}
  rotationInterval={2000}
/>

           <CircularText
              text=" Decarb * Decarb * Decarb * Decarb * "
              onHover="speedUp"
              spinDuration={20}
              className="custom-class"
            />
        </div>
    </div>
  );
};

export default Discover;
