'use client'
import React from 'react'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'

function ViewBillPage() {
    const { cartItems, clearCart } = useCart()
    const router = useRouter()

    const totalAmount = cartItems.reduce((acc, item) => {
        return (acc + (item.price * item.quantity))
    }, 0)

    const handlePlaceOrder = () => {
        console.log("Order Placed.", cartItems)

        clearCart()

        router.push('/thank-you')
    }

    return (
        <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
            <div className='bg-white shadow-lg rounded-lg p-6 max-w-2xl w-full'>
                <h1 className='text-3xl font-extrabold mb-6 text-center text-gray-800'>Order Summary</h1>

                {cartItems.length === 0 ? (
                    <div className='text-center py-10'>
                        <p className='text-xl text-gray-600 mb-6'>Your cart looks empty. Time to find some delicious food! </p>
                        <button
                            className='bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105'
                            onClick={() => router.push('/menu/Food')}
                        >
                            Go to Menu
                        </button>
                    </div>
                ) : (
                    <>
                        <div className='border border-gray-200 rounded-lg overflow-hidden mb-6'>
                            {cartItems.map((item, index) => (
                                <div key={index} className='flex justify-between items-center py-4 px-5 even:bg-gray-50'>
                                    <div>
                                        <h2 className='font-semibold text-lg text-gray-800'>{item.name}</h2>
                                        <p className='text-sm text-gray-500'> ₹{item.price} x {item.quantity} </p>
                                    </div>
                                    <div className='font-bold text-lg text-gray-700'> ₹{item.price * item.quantity} </div>
                                </div>
                            ))}
                        </div>

                        <div className='flex justify-between items-center border-t border-gray-200 pt-5 mt-5'>
                            <h2 className='text-2xl font-bold text-gray-800'>Total</h2>
                            <h2 className='text-2xl font-bold text-gray-900'> ₹{totalAmount} </h2>
                        </div>


                        <button
                            onClick={handlePlaceOrder}
                            className='w-full mt-8 bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105'
                        >
                            Place Order
                        </button>
                    </>
                )}

            </div>
        </div>
    )
}

export default ViewBillPage