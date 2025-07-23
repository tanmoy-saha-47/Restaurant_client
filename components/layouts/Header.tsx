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
        <div className='bg-yellow-200 shadow p-4 text-xl text-center font-serif items-center'>
            Welcome to <span className='font-light'>The Groot</span> {(user?.name)?.toUpperCase()}
            <button
                onClick={onLogout}
                className='absolute top-4 mb-6 right-4 text-2xl px-4 py-2 rounded-md hover:scale-105 hover:text-4xl duration-200 ease-in-out'
            >
                <CiLogout />
            </button>

        </div>
    )
}

export default Header