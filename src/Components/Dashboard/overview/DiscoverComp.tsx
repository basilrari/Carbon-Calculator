import React from 'react'
import Link from 'next/link'

const DiscoverComp = () => {
  return (
            <div className=" bg-gradient-to-r from-[#FFE9C1] to-[#c0d3d8] rounded-xl p-6 flex flex-col gap-4 relative min-h-[120px] ">
            <p className="text-lg font-semibold text-[#2F4F4F]">Taking Leaps Toward Sustainability With Decarb</p>

            <Link href="/decarb/discover">
               <button className="bg-[#d9e4e7] text-black px-4 py-2 rounded-md shadow-md absolute right-4 bottom-4">Discover</button>
            </Link>
            
        </div>
  )
}

export default DiscoverComp