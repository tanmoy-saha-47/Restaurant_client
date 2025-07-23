'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function ThankYouPage() {
    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-400 text-center p-6 relative'>
            <div className='absolute inset-0'>
                <Image
                    src='/food.jpg'
                    alt='Background'
                    fill
                    priority
                    className='overflow-hidden object-cover'
                />
            </div>
            <div className='relative px-10 py-10 z-10 backdrop-blur-lg'>
                <h1 className='text-3xl font-bold mb-4'> Thank You!!!</h1>
                <p> Your Order has been placed successfully</p>
                <Link href='menu/Food' className='mt-4 text-blue-500 underline'>
                    Back to Menu
                </Link>
            </div>
        </div>
    )
}

export default ThankYouPage