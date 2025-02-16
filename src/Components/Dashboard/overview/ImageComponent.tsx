import React from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const ImageComponent = () => {
  return (
    <div className="relative bg-cover bg-[url('/images/sustainabilitybg.png')] bg-center rounded-xl text-white p-6 grow mt-4 overflow-hidden group" >

      <Link href="https://www.iisd.org/articles">
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
            <div className=' w-full'>
            <p className="text-white font-medium text-lg absolute bottom-4">Today, Tomorrow & for the Future 
            <ArrowRight className=" w-5 h-5" />
            </p>
            </div>
      </Link>
    </div>
  )
}

export default ImageComponent

