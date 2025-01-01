import React from 'react'
import Image from 'next/image';

const CeloComp = () => {
  return (
    <div className='flex border bg-white rounded-md shadow-sm'> 
      <div className='flex items-center '>
        <Image
        src='/images/celocomp.png'
        className='w-10 h-6 pl-2' 
        alt='celocomposition'
        />

        <h1 className='font-semibold text-md pr-2'>Celo Alfajores</h1>
      </div>
    </div>
  )
}

export default CeloComp;