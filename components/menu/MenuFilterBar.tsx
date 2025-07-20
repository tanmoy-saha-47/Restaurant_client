import React from 'react'

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
                <label className='flex items-center gap-2 cursor-pointer'>
                    <input
                        type="checkbox"
                        checked={showOnlyVeg}
                        onChange={() => setShowOnlyVeg(!showOnlyVeg)}
                        className='sr-only peer'
                    />
                    <div className='w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 relative transition-all'>
                        <div className='absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5'></div>
                    </div>
                    <span className='text-sm font-medium'> Veg Only</span>
                </label>

                <button
                    onClick={onRefresh}
                    className='p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none'
                    aria-label='Refresh'
                >
                    &#x21BB;
                </button>

            </div>
        </div>
    )
}

export default MenuFilterBar