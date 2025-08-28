import React from 'react'
import { MenuItem } from '@/data/menuData'
import { useCart } from '@/contexts/CartContext'

type Props = {
    item: MenuItem
    onSelect: (item: MenuItem) => void
}

function MenuItemCard({ item, onSelect }: Props) {
    const { cartItems, addToCart, increment, decrement } = useCart()

    const foundItem = cartItems.find(i => i.name === item.name)

    const quantity = foundItem ? foundItem.quantity : 0;

    return (
        <div className='flex justify-between items-center p-4 border-b bg-white cursor-pointer  '
            onClick={() => onSelect(item)}>
            <div className='flex flex-col gap-2 w-3/5 pr-4'>
                <div className='flex items-center gap-2'>
                    <span
                        className={`w-3 h-3 rounded-full ${item.isVeg ? 'bg-green-600 border-green-600' : 'bg-red-600 border-red-600'}`}
                    ></span>
                    <span className='text-lg font-serif '>{item.name}</span>
                </div>
                <p className='text-xs font-medium text-gray-700'>{item.description}  </p>
                <p className='text-sm font-medium text-gray-700'>₹{item.price}</p>
            </div>

            <div className='relative flex flex-col items-center w-2/5 max-w-[140px]'>
                {/* Conditionally render the image */}
                {item.imageUrl && (
                    <img
                        src={item.imageUrl}
                        alt={item.name}
                        className='w-full h-24 object-cover rounded-lg'
                    />
                )}

                <div className={item.imageUrl ? 'absolute -bottom-2' : 'mt-2'}>
                    {foundItem ? (
                        <div className='flex items-stretch w-[120px] rounded-full shadow-md overflow-hidden'>

                            <button
                                onClick={(e) => { e.stopPropagation(); decrement(item); }}
                                className='w-10 h-10 flex items-center justify-center bg-red-500 text-white text-xl hover:bg-red-600 transition-colors'
                                aria-label='Decrement item'
                            >
                                -
                            </button>

                            <span
                                className='flex-grow text-center text-lg font-bold text-white bg-red-500 flex items-center justify-center'
                            >
                                {quantity}
                            </span>


                            <button
                                onClick={(e) => { e.stopPropagation(); increment(item); }}
                                className='w-10 h-10 flex items-center justify-center bg-red-500 text-white text-xl hover:bg-red-600 transition-colors'
                                aria-label='Increment item'
                            >
                                +
                            </button>
                        </div>
                    ) : (

                        <button
                            onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                            className='flex items-center justify-center gap-2 text-red-700 bg-red-100  rounded-full px-6 py-1.5 font-bold text-md shadow-lg hover:bg-red-200 active:scale-95 border-transparent'>

                            <span className=''>ADD</span>
                            <span className='font-bold '>+</span>
                        </button>
                    )}
                </div>


            </div>
        </div>
    )
}

export default MenuItemCard


