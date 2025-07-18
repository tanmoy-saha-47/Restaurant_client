import React from 'react'
import { MenuItem } from '@/data/menuData'

type Props = {
    item: MenuItem
}

function MenuItemCard({ item }: Props) {
    return (
        <div className='flex justify-between items-center p-4 border-b bg-white'>
            <div className='flex items-start gap-2 flex-col'>
                <div className='flex items-center gap-2'>
                    <span className={`w-3 h-3 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></span>
                    <span className='text-lg font-semibold'>{item.name}</span>
                </div>
                <p className='text-sm font-medium text-gray-700'>₹{item.price}</p>
            </div>
            <button className='bg-blue-600 text-white px-3 py-1 text-sm rounded'>Add</button>
        </div>
    )
}

export default MenuItemCard