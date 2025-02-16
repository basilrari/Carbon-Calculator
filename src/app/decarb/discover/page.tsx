
import React from "react";
import Image from "next/image";
import CircularText from "@/Components/Dashboard/LearnMore/CircularText";
import RotatingText from "@/Components/Dashboard/LearnMore/RotatingText";
import Marquee from "react-fast-marquee";
import Link from "next/link";


const Discover = () => {

  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  
  const cards = [
    {
      title: "Building a sustainable future with Decarb and Toucan",
      link: "https://toucan.earth/",
    },
    {
      title: "Empowering a greener future",
      link: "https://www.goldstandard.org/",
    },
    {
      title: "Offsetting carbon emissions",
      link: "https://offsetguide.org/understanding-carbon-offsets/what-is-a-carbon-offset/",
    },
    {
      title: "Powering the world with sustainability",
      link: "https://sdgs.un.org/goals",
    },
    
  ];

  return (
    <div className="h-screen flex flex-col justify-between overflow-y-auto container mx-auto p-6">

      {/* Header Section */}
      <div className="flex items-center justify-between pb-6">
        <h1 className="text-2xl font-semibold text-left">
          Discover
          </h1>
        <div className="overflow-hidden rounded-full w-12 h-12">
                <Image src="/images/greenbg.png" alt="image" height={48} width={48} className='object-cover w-full h-full'/>
            </div> 
      </div>
    
               
        <RotatingText
                texts={['Advancing sustainability with Decarb to create a cleaner, greener future.', 'Building a carbon-neutral world with Decarb’s innovative solutions.', 'Empowering sustainability efforts through Decarb’s carbon offset initiatives.', 'Reducing emissions and driving eco-friendly change with Decarb.']}
                mainClassName="px-2 w-3/5 h-12 sm:px-2 md:px-3 bg-gradient-to-r from-[#FFE9C1] to-[#c0d3d8] text-[#2F4F4F] text-xl font-semibold overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center w-full rounded-lg"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={4000}
              />


       <div className="flex flex-row grow h-auto w-full mt-6 space-x-6">
          <div className="flex flex-col space-y-6 w-3/5">

           
              <div className ="flex grow relative bg-[url('/images/c7.png')] bg-bottom h-1/2  rounded-md overflow-hidden group">
              <Link href={cards[0].link}>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
              
                  <h3 className="text-xl font-medium text-white p-6 absolute bottom-0 ">{cards[0].title}</h3>
                 </Link>
              </div>
            

            <div className="flex flex-col justify-around items-center h-1/2 rounded-md pb-6">
              <h1 className="text-xl font-semibold pb-4">In Association with</h1>
              <div className="flex items-center">
                <Marquee >                 
                  <Image src="/images/goldstandard.png" alt="green" height={250} width={250} className="pr-12"/>
                  <Image src="/images/celocomp.png" alt="green" height={140} width={140} className="pr-12"/>
                  <Image src="/images/toucan.png" alt="green" height={200} width={200} className="pr-12" />
                  <Image src="/images/verra.png" alt="green" height={150} width={150} className="pr-6"/>
                </Marquee>
              </div>
            </div>
          </div>
          
          <div className="relative bg-[url('/images/c1.png')] bg-cover h-auto w-2/5 bg-slate-400 rounded-md overflow-hidden group">
             <Link href={cards[1].link}>
               <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
               
                <h3 className="text-xl font-medium text-white p-6 ">{cards[1].title}</h3>
             </Link>
            </div>
          
       </div>
     


        <div className="flex w-full mt-6 mb-2 justify-between">
           
           <div className="flex flex-row justify-between space-x-8 w-4/5">

           <div className="relative bg-[url('/images/c2.png')] bg-center h-auto w-2/5 bg-slate-400 rounded-md overflow-hidden group">
                    <Link href={cards[2].link}>
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
                      
                      <h3 className="text-xl font-medium text-white p-6 absolute bottom-0">{cards[2].title}</h3>
                    </Link>
                  </div>

                  <div className="relative bg-[url('/images/c4.png')] bg-cover h-auto w-3/5 bg-slate-400 rounded-md overflow-hidden group">
                    <Link href={cards[3].link}>
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
                      
                      <h3 className="text-xl font-medium text-white p-6 absolute bottom-0">{cards[3].title}</h3>
                    </Link>
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
