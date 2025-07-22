import React from 'react'
import { MenuItem } from '@/data/menuData'
import { useCart } from '@/contexts/CartContext'

type Props = {
    item: MenuItem
}

function MenuItemCard({ item }: Props) {
    const { cartItems, addToCart, increment, decrement } = useCart()

    const foundItem = cartItems.find(i => i.name === item.name)


    return (
        <div className='flex justify-between items-center p-4 border-b bg-white'>
            <div className='flex items-start gap-2 flex-col'>
                <div className='flex items-center gap-2'>
                    <span className={`w-3 h-3 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></span>
                    <span className='text-lg font-semibold'>{item.name}</span>
                </div>
                <p className='text-sm font-medium text-gray-700'>₹{item.price}</p>
            </div>

            {foundItem ? (
                <div className='flex items-center gap-2'>
                    <button onClick={() => decrement(item)} className='bg-gray-300 text-black px-8 py-2 font-medium text-shadow-md rounded hover:bg-gray-500 transition transform active:bg-gray-700 active:scale-110 duration-200 ease-in-out'>-</button>
                    <button onClick={() => increment(item)} className='bg-gray-300 text-black px-8 py-2 font-medium text-shadow-md rounded hover:bg-gray-500 transition transform active:bg-gray-700 active:scale-110 duration-200 ease-in-out'>+</button>
                </div>
            ) : (

                <button onClick={() => addToCart(item)} className='bg-gray-300 text-black px-8 py-2 font-medium text-md   rounded hover:bg-gray-400 transition transform active:scale-110 active:bg-gray-700 hover:scale-95 duration-200 ease-in-out'>
                    Add
                </button>
            )}

        </div>
    )
}

export default MenuItemCard


