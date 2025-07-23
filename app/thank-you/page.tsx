'use client'
import React from 'react'
import Link from 'next/link'

function ThankYouPage() {
    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-400 text-center p-6'>
            <h1 className='text-3xl font-bold mb-4'> Thank You!!!</h1>
            <p> Your Order has been placed successfully</p>
            <Link href='menu/Food' className='mt-4 text-blue-500 underline'>
                Back to Menu
            </Link>
        </div>
    )
}

export default ThankYouPage