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
        <div className='min-h-screen bg-gray-200 p-6'>
            <h1 className='text-2xl font-bold mb-4 text-center'> Order Summary</h1>

            {cartItems.length === 0 ? (
                <>
                    <p className='text-2xl text-center text-gray-500'>Your Cart is Empty</p>
                    <div className='flex items-center justify-center mt-6'>
                        <button
                            className='bg-gray-600 px-5 py-2  hover:bg-gray-700 active:scale-95 duration-200 ease-in-out'
                            onClick={() => router.push("/menu/Food")}
                        > Go to Menu
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className='divide-y border rounded-md'>
                        {cartItems.map((item, index) => (
                            <div key={index} className='flex justify-between items-center py-3 px-4'>
                                <div>
                                    <h2 className='font-medium'> {item.name} </h2>
                                    <p className='text-sm text-gray-500'>₹{item.price} x {item.quantity} </p>
                                </div>
                                <div className='font-semibold'>₹{item.price * item.quantity}</div>
                            </div>
                        ))}
                    </div>


                    <div className='mt-6 flex justify-between items-center'>
                        <h2 className='text-xl font-bold'> Total</h2>
                        <h2 className='text-xl font-bold'> ₹{totalAmount}</h2>
                    </div>


                    <button
                        onClick={handlePlaceOrder}
                        className='mt-6 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-700 active:bg-red-800 active:scale-100 duration-200 ease-in-out transform transition'
                    >Place Order
                    </button>







                </>
            )}


        </div>
    )
}

export default ViewBillPage