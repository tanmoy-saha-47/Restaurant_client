import React from 'react'
import { CiLogout } from "react-icons/ci";


type HeaderProps = {
    user: {
        name: string;
        tableNumber: number
    } | null
    onLogout: () => void
}

function Header({ user, onLogout }: HeaderProps) {

    return (
        <div className='bg-white shadow p-4 text-xl text-center font-bold items-center'>
            Welcome to The Groot, {user?.name}
            <button
                onClick={onLogout}
                className='absolute top-4 mb-6 right-4 text-2xl px-4 py-2 rounded-md hover:scale-105 hover:bg-gray-400 duration-200 ease-in-out'
            >
                <CiLogout />
            </button>

        </div>
    )
}

export default Header