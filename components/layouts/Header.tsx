import React from 'react'
import { CgLogOut } from 'react-icons/cg';


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
            Welcome to The Groot {user?.name}, Your Table Number is {user?.tableNumber}.
            <button
                onClick={onLogout}
                className='absolute top-4 right-4 bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-700 text-md '
            >
                <CgLogOut />
            </button>

        </div>
    )
}

export default Header