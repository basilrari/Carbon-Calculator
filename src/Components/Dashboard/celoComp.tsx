import React from 'react'
import Image from 'next/image';

const CeloComp = () => {
  return (
    <div className='flex border bg-white rounded-md shadow-sm'> 
      <div className='flex items-center '>
        <Image
        src='/images/celocomp.png'
        className='pl-2' 
        alt='celocomposition'
        width={40}
        height={24}
        />

        <h1 className='font-semibold text-md pr-2'>Celo Alfajores</h1>
      </div>
    </div>
  )
}

export default CeloComp;