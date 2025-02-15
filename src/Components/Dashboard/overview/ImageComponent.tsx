import React from 'react'
import { ArrowRight } from 'lucide-react'

const ImageComponent = () => {
  return (
    <div className="relative bg-cover bg-[url('/images/sustainabilitybg.png')] bg-center rounded-xl text-white p-6 grow mt-4" >
    <div className=' w-full'>
    <p className="text-white font-medium text-lg absolute bottom-4">Today, Tomorrow & for the Future 
    <ArrowRight className=" w-5 h-5" />
    </p>
    </div>
    </div>
  )
}

export default ImageComponent