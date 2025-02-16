import React from 'react'
import Link from 'next/link'

const BuyCharComp = () => {
  return (
    <div className='flex flex-row gap-4 h-full'>
               <div className=" bg-[url('/images/sellcharbg.png')] bg-cover text-white rounded-xl w-1/2 p-6 flex flex-col gap-4 relative ">
                <p className="text-lg font-medium">Offsetting Your Emissions With Decarb</p>

                <Link href="/decarb/contracts/sellassets">
                <button className="bg-[#b1b1b1] text-white hover:bg-[#9e9f9f] transition-colors duration-300 font-medium px-4 py-2 w-1/2 rounded-md shadow-md">Sell CHAR</button>
                </Link>

              </div>

                <div className=" bg-[url('/images/greenbg.png')] bg-cover text-white rounded-xl w-1/2 p-6 flex flex-col gap-4 relative ">
                <p className="text-lg font-medium">Accessing The Sustainable World With Decarb</p>

                <Link href="/decarb/contracts/buyassets">
                    <button className="bg-[#366E6A] text-white hover:bg-[#3c6262] transition-colors duration-300 font-medium px-4 py-2 w-1/2 rounded-md shadow-md">Buy CHAR</button>
                </Link>

                </div> 
    </div>
  )
}

export default BuyCharComp