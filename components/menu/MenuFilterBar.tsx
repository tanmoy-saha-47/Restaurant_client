import React from 'react'
import { FaToggleOff } from "react-icons/fa6";
import { FaToggleOn } from "react-icons/fa";


type MenuFilterBarProps = {
    search: string
    setSearch: (value: string) => void
    showOnlyVeg: boolean
    setShowOnlyVeg: (value: boolean) => void
    onRefresh: () => void
}

function MenuFilterBar({
    search,
    setSearch,
    showOnlyVeg,
    setShowOnlyVeg,
    onRefresh
}: MenuFilterBarProps) {
    return (

        <div className='flex flex-col md:flex-row items-center p-4 gap-3'>
            <div className='flex items-center gap-3 w-full md:w-auto'>
                <input
                    type="text"
                    placeholder='Start typing to search'
                    className='flex-grow px-4 py-2 border border-gray-300 rounded'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <label className='flex items-center gap-3 cursor-pointer'>
                    <input
                        type="checkbox"
                        checked={showOnlyVeg}
                        onChange={() => setShowOnlyVeg(!showOnlyVeg)}
                        className='sr-only peer'
                    />

                    {!showOnlyVeg ? <FaToggleOff className='text-2xl' /> : <FaToggleOn className='text-2xl' />}
                    <span className='text-sm font-medium'> Veg Only</span>
                </label>

                <button
                    onClick={onRefresh}
                    className='p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none active:scale-105 duration-200 ease-in'
                    aria-label='Refresh'
                >
                    &#x21BB;
                </button>

            </div>
        </div>
    )
}

export default MenuFilterBar