import React from 'react'
import Image from 'next/image'

function OfferBox() {
  return (
    <div className='relative w-full h-100 overflow-hidden rounded-b-sm shadow-md  z-10 '>
      <Image
        src='/offer.jpg'
        alt='OfferBackGround'
        fill
        objectFit='cover'
        quality={50}
        className='absolute inset-0'
      />

    // </div >
  )
}

export default OfferBox