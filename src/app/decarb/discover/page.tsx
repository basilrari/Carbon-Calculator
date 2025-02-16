
import React from "react";
import Image from "next/image";
import CircularText from "@/Components/Dashboard/LearnMore/CircularText";
import RotatingText from "@/Components/Dashboard/LearnMore/RotatingText";
import Marquee from "react-fast-marquee";


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
    <div className="h-screen flex flex-col justify-between overflow-y-auto container mx-auto p-6">

      {/* Header Section */}
      <div className="flex items-center justify-between pb-6">
        <h1 className="text-2xl font-semibold text-left">
          Learn More
          </h1>
        <div className="overflow-hidden rounded-full w-12 h-12">
                <Image src="/images/greenbg.png" alt="image" height={48} width={48} className='object-cover w-full h-full'/>
            </div> 
      </div>
    
         
      
        
        <RotatingText
                texts={['React', 'Bits', 'Is', 'Cool!']}
                mainClassName="px-2 w-3/5 h-12 sm:px-2 md:px-3 bg-gradient-to-r from-[#FFE9C1] to-[#c0d3d8] text-[#2F4F4F] text-xl font-bold overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center w-full rounded-lg"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />


       <div className="flex flex-row grow h-auto w-full mt-6 space-x-6">
          <div className="flex flex-col space-y-6 w-3/5">
            <div className ="flex grow h-1/2 bg-yellow-100 rounded-md">

            </div>
            <div className="flex items-center h-1/2 bg-pink-100 rounded-md">
              <Marquee>
                <Image src="/images/decarblogo.png" alt="green" height={150} width={150}/>
              </Marquee>
            </div>
          </div>
          
          <div className="h-auto w-2/5 bg-slate-400 rounded-md">

          </div>
          
       </div>
     


        <div className="flex w-full mt-6 mb-2 justify-between">
           
           <div className="flex flex-row justify-between space-x-8 w-4/5">
             <div className="h-auto w-3/5 bg-slate-400 rounded-md">
             
             </div>
             <div className="h-auto w-2/5 bg-slate-400 rounded-md">
             
               </div>
           </div>
           <div className="overflow-clip pr-4">
             <CircularText
                text=" Decarb * Decarb * Decarb * Decarb * "
                onHover="speedUp"
                spinDuration={20}
                className="custom-class "
              />
           </div>
        </div>
    </div>
  );
};

export default Discover;
