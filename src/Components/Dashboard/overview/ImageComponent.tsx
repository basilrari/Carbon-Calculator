import React from 'react'
import { ArrowRight } from 'lucide-react'

const ImageComponent = () => {
  return (
    <div className="relative bg-cover bg-[url('/images/sustainabilitybg.png')] bg-slate-400 bg-center rounded-xl text-white p-6 flex items-end h-40" >
    <div className=' w-full'>
    <p className="text-white font-medium text-lg">Today, Tomorrow & for the Future 
    <ArrowRight className=" w-5 h-5" />
    </p>
    </div>
  )
}

export default ImageComponent