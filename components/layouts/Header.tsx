import React from 'react'
import { CiLogout } from "react-icons/ci";


type HeaderProps = {
    user: {
        name: string;
        tableNumber: number
    } | null
    onLogout: () => void

    decodedCategory: string
}

function Header({ user, onLogout, decodedCategory }: HeaderProps) {

    return (
        <div className='sticky top-0 z-50 bg-white shadow-sm p-4'>
            <h1 className="text-xl font-bold"> The Groot Restaurant</h1>

            <div className="flex items-center text-sm text-gray-600 gap-3">
                <span>4.7 ⭐</span>
                <span>1.1 km · 15-20 mins</span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">Free Delivery</span>
            </div>
            <button
                onClick={onLogout}
                className='absolute top-4 mb-6 right-4 text-2xl px-4 py-2 rounded-md hover:scale-105 hover:text-4xl duration-200 ease-in-out'
            >
                <CiLogout />
            </button>
            <div className="bg-white px-4 py-2 flex gap-2 overflow-x-auto">
                <button
                    className="border rounded-full px-3 py-1 text-sm">Veg</button>
                <button className="border rounded-full px-3 py-1 text-sm">Egg</button>
                <button className="border rounded-full px-3 py-1 text-sm">Non-veg</button>
                <button className="border rounded-full px-3 py-1 text-sm">Highly reordered</button>
            </div>

        </div>
    )
}

export default Header