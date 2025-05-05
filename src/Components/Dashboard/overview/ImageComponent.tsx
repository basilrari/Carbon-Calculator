import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const ImageComponent = () => {
  return (
    <div className="relative bg-cover bg-[url('/images/sustainabilitybg.png')] bg-center rounded-xl text-white p-4 sm:p-6 grow mt-4 overflow-hidden group">
      <Link href="/decarb/discover">
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
        <div className="w-full">
          <p className="text-white font-medium text-sm sm:text-lg absolute bottom-2 sm:bottom-4">
            Today, Tomorrow & for the Future 
            <ArrowRight className="inline w-4 sm:w-5 h-4 sm:h-5 ml-1" />
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ImageComponent;
